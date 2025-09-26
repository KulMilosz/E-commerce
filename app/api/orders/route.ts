import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

function convertOrderToNumeric(order: any) {
  return {
    ...order,
    totalAmount: Number(order.totalAmount),
    orderItems: order.orderItems.map((item: any) => ({
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
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { selectedCartItemIds } = await req.json();
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

    for (const item of cart.cartItems) {
      if (item.quantity > item.product.stock) {
        return NextResponse.json({
          error: `Not enough stock for ${item.product.name}. Available: ${item.product.stock}, Requested: ${item.quantity}`
        }, { status: 400 });
      }
    }

    const totalAmount = cart.cartItems.reduce((sum, item) => 
      sum + (Number(item.product.price) * item.quantity), 0
    );

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: { userId: session.user.id, totalAmount, status: "PENDING" },
      });

      await Promise.all(
        cart.cartItems.map(item =>
          tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              priceAtPurchase: Number(item.product.price),
            },
          })
        )
      );

      await tx.cartItem.deleteMany({ where: { id: { in: selectedCartItemIds } } });

      await Promise.all(
        cart.cartItems.map(item =>
          tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
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
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
