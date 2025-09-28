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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id, userId: session.user.id },
      include: {
        orderItems: {
          include: {
            product: { include: { category: true, brand: true } },
          },
        },
      },
    });

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    return NextResponse.json(convertOrderToNumeric(order));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
