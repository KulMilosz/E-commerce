import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { ApiOrder, ApiOrderItem, QuantityData } from "@/app/types";

function convertOrderToNumeric(order: ApiOrder) {
  return {
    ...order,
    totalAmount: Number(order.totalAmount),
    orderItems: order.orderItems.map((item: ApiOrderItem) => ({
      ...item,
      priceAtPurchase: Number(item.priceAtPurchase),
      product: {
        ...item.product,
        price: Number(item.product.price),
      },
    })),
  };
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        orderItems: {
          include: {
            product: { include: { category: true, brand: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders.map(convertOrderToNumeric));
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { selectedCartItemIds, itemsWithQuantities, grandTotal } = await req.json();
    if (!selectedCartItemIds?.length) {
      return NextResponse.json({ error: "No items selected for order" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        cartItems: {
          where: { id: { in: selectedCartItemIds } },
          include: {
            product: { include: { category: true, brand: true } },
          },
        },
      },
    });

    if (!cart?.cartItems.length) {
      return NextResponse.json({ error: "No valid items found in cart" }, { status: 400 });
    }

    const itemsToProcess = cart.cartItems.map((item) => {
      const quantityData = itemsWithQuantities?.find((q: QuantityData) => q.cartItemId === item.id);
      const finalQuantity = quantityData ? quantityData.quantity : item.quantity;
      
      if (finalQuantity > item.product.stock) {
        throw new Error(`Not enough stock for ${item.product.name}. Available: ${item.product.stock}, Requested: ${finalQuantity}`);
      }
      
      return {
        ...item,
        finalQuantity,
      };
    });

    const totalAmount = grandTotal || itemsToProcess.reduce((sum, item) => 
      sum + (Number(item.product.price) * item.finalQuantity), 0
    );

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: { userId: session.user.id, totalAmount, status: "PENDING" },
      });

      await Promise.all(
        itemsToProcess.map(item =>
          tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.finalQuantity,
              priceAtPurchase: Number(item.product.price),
            },
          })
        )
      );

      await tx.cartItem.deleteMany({ where: { id: { in: selectedCartItemIds } } });

      await Promise.all(
        itemsToProcess.map(item =>
          tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.finalQuantity } },
          })
        )
      );

      return order;
    });

    const createdOrder = await prisma.order.findUnique({
      where: { id: result.id },
      include: {
        orderItems: {
          include: {
            product: { include: { category: true, brand: true } },
          },
        },
      },
    });

    if (!createdOrder) {
      return NextResponse.json({ error: "Failed to retrieve created order" }, { status: 500 });
    }

    return NextResponse.json(convertOrderToNumeric(createdOrder), { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
