import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { Cart, CartItem, Product } from "@/app/generated/prisma";
import { CartWithProducts } from "@/app/types";

function mapCartItemPrice(cart: CartWithProducts) {
  return {
    ...cart,
    cartItems: cart.cartItems.map((item) => ({
      ...item,
      product: {
        ...item.product,
        price: Number(item.product.price),
      },
    })),
  };
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, quantity } = await req.json();

  if (!productId || !quantity || quantity < 1) {
    return NextResponse.json(
      { error: "Invalid product or quantity" },
      { status: 400 }
    );
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  let cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: { cartItems: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: session.user.id },
      include: { cartItems: true },
    });
  }

  const existingItem = cart.cartItems.find(
    (item) => item.productId === productId
  );
  const newQuantity = existingItem
    ? existingItem.quantity + quantity
    : quantity;

  if (newQuantity > product.stock) {
    return NextResponse.json(
      { error: `Only ${product.stock} items available in stock` },
      { status: 400 }
    );
  }

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: newQuantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  const updatedCart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      cartItems: {
        include: {
          product: { include: { category: true } },
        },
      },
    },
  });

  if (!updatedCart) {
    return NextResponse.json({ id: session.user.id, cartItems: [] });
  }

  return NextResponse.json(mapCartItemPrice(updatedCart as CartWithProducts));
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      cartItems: {
        include: {
          product: { include: { category: true } },
        },
      },
    },
  });

  if (!cart) {
    return NextResponse.json({ id: session.user.id, cartItems: [] });
  }

  return NextResponse.json(mapCartItemPrice(cart as CartWithProducts));
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cartItemId, quantity } = await req.json();

  if (!cartItemId || !quantity || quantity < 1) {
    return NextResponse.json(
      { error: "Cart item ID and quantity are required" },
      { status: 400 }
    );
  }

  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true, product: true },
    });

    if (!cartItem || cartItem.cart.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    if (quantity > cartItem.product.stock) {
      return NextResponse.json(
        { error: `Only ${cartItem.product.stock} items available in stock` },
        { status: 400 }
      );
    }

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    const updatedCart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        cartItems: {
          include: {
            product: { include: { category: true } },
          },
        },
      },
    });

    if (!updatedCart) {
      return NextResponse.json({ id: session.user.id, cartItems: [] });
    }

    return NextResponse.json(mapCartItemPrice(updatedCart as CartWithProducts));
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cartItemId } = await req.json();

  if (!cartItemId) {
    return NextResponse.json(
      { error: "Cart item ID is required" },
      { status: 400 }
    );
  }

  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    const updatedCart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        cartItems: {
          include: {
            product: { include: { category: true } },
          },
        },
      },
    });

    if (!updatedCart) {
      return NextResponse.json({ id: session.user.id, cartItems: [] });
    }

    return NextResponse.json(mapCartItemPrice(updatedCart as CartWithProducts));
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
