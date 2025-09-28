import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

function convertOrderToNumeric(order: {
  totalAmount: unknown;
  orderItems: Array<{
    priceAtPurchase: unknown;
    product: { price: unknown };
  }>;
}) {
  return {
    ...order,
    totalAmount: Number(order.totalAmount),
    orderItems: order.orderItems.map((item) => ({
      ...item,
      priceAtPurchase: Number(item.priceAtPurchase),
      product: {
        ...item.product,
        price: Number(item.product.price),
      },
    })),
  };
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id, userId: session.user.id },
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
  } catch {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
