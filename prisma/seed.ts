import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  const existingCategories = await prisma.category.findMany();
  if (existingCategories.length > 0) {
    console.log("✅ Categories already exist, skipping creation");
    return;
  }

  const mouse = await prisma.category.create({
    data: {
      name: "Mouse",
      description: "Computer mice and pointing devices",
      image: "https://i.ibb.co/YK4Gr06/mouse-img.png",
      exploreInfo: "Precision pointing devices for gaming and productivity",
    },
  });

  const monitor = await prisma.category.create({
    data: {
      name: "Monitor",
      description: "Computer monitors and displays",
      image:
        "https://i.ibb.co/gLyzkN6S/ad1a62b3939f5147fb9c66c5e3d3c48daac93746.png",
      exploreInfo: "High-quality displays for work and entertainment",
    },
  });

  const headphone = await prisma.category.create({
    data: {
      name: "Headphone",
      description: "Audio headphones and headsets",
      image: "https://via.placeholder.com/300x300",
      exploreInfo: "Premium audio experience for music and gaming",
    },
  });

  const keyboard = await prisma.category.create({
    data: {
      name: "Keyboard",
      description: "Computer keyboards and input devices",
      image: "https://via.placeholder.com/300x300",
      exploreInfo: "Mechanical and membrane keyboards for every need",
    },
  });

  const webcam = await prisma.category.create({
    data: {
      name: "Webcam",
      description: "Web cameras and video conferencing devices",
      image: "https://via.placeholder.com/300x300",
      exploreInfo: "HD webcams for streaming and video calls",
    },
  });

  console.log("✅ Categories created");

  const mouseProducts = [
    {
      name: "Logitech MX Master 3S",
      description:
        "Wireless mouse with precision tracking and ergonomic design",
      price: 99.99,
      stock: 25,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Razer DeathAdder V3",
      description: "Gaming mouse with 30,000 DPI optical sensor",
      price: 69.99,
      stock: 30,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Apple Magic Mouse 2",
      description:
        "Wireless mouse with multi-touch surface and rechargeable battery",
      price: 79.99,
      stock: 20,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "SteelSeries Rival 600",
      description: "Dual sensor gaming mouse with customizable weight system",
      price: 79.99,
      stock: 15,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Microsoft Surface Mouse",
      description: "Bluetooth mouse with premium design and quiet clicking",
      price: 39.99,
      stock: 40,
      imageUrl: "https://via.placeholder.com/300x300",
    },
  ];

  for (const product of mouseProducts) {
    await prisma.product.create({
      data: {
        ...product,
        categoryId: mouse.id,
      },
    });
  }

  const monitorProducts = [
    {
      name: 'Dell UltraSharp 27" 4K',
      description: "27-inch 4K monitor with 99% sRGB color accuracy",
      price: 399.99,
      stock: 15,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: 'ASUS ROG Swift 24" 144Hz',
      description:
        "Gaming monitor with 144Hz refresh rate and 1ms response time",
      price: 249.99,
      stock: 20,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: 'LG UltraWide 34" Curved',
      description:
        "34-inch curved ultrawide monitor for productivity and gaming",
      price: 499.99,
      stock: 12,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: 'Samsung Odyssey G7 32"',
      description: "32-inch QHD gaming monitor with 240Hz refresh rate",
      price: 599.99,
      stock: 8,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: 'Apple Studio Display 27"',
      description: "27-inch 5K Retina display with True Tone technology",
      price: 1599.99,
      stock: 5,
      imageUrl: "https://via.placeholder.com/300x300",
    },
  ];

  for (const product of monitorProducts) {
    await prisma.product.create({
      data: {
        ...product,
        categoryId: monitor.id,
      },
    });
  }

  const headphoneProducts = [
    {
      name: "Sony WH-1000XM5",
      description:
        "Wireless noise-canceling headphones with 30-hour battery life",
      price: 399.99,
      stock: 25,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Bose QuietComfort 45",
      description: "Premium noise-canceling headphones with superior comfort",
      price: 329.99,
      stock: 20,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "SteelSeries Arctis 7P",
      description: "Wireless gaming headset with 2.4GHz lossless audio",
      price: 149.99,
      stock: 30,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Audio-Technica ATH-M50x",
      description:
        "Professional studio monitor headphones with detachable cable",
      price: 149.99,
      stock: 35,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "HyperX Cloud Alpha S",
      description: "Gaming headset with 7.1 surround sound and bass adjustment",
      price: 99.99,
      stock: 40,
      imageUrl: "https://via.placeholder.com/300x300",
    },
  ];

  for (const product of headphoneProducts) {
    await prisma.product.create({
      data: {
        ...product,
        categoryId: headphone.id,
      },
    });
  }

  const keyboardProducts = [
    {
      name: "Keychron K2 V2",
      description: "Wireless mechanical keyboard with hot-swappable switches",
      price: 79.99,
      stock: 30,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Corsair K95 RGB Platinum",
      description: "Mechanical gaming keyboard with Cherry MX switches and RGB",
      price: 199.99,
      stock: 15,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Logitech MX Keys",
      description:
        "Wireless keyboard with backlit keys and multi-device connectivity",
      price: 99.99,
      stock: 25,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Razer BlackWidow V4 Pro",
      description: "Mechanical gaming keyboard with Razer Yellow switches",
      price: 229.99,
      stock: 18,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Apple Magic Keyboard",
      description:
        "Wireless keyboard with rechargeable battery and scissor mechanism",
      price: 99.99,
      stock: 35,
      imageUrl: "https://via.placeholder.com/300x300",
    },
  ];

  for (const product of keyboardProducts) {
    await prisma.product.create({
      data: {
        ...product,
        categoryId: keyboard.id,
      },
    });
  }

  const webcamProducts = [
    {
      name: "Logitech C920 HD Pro",
      description: "1080p HD webcam with autofocus and stereo audio",
      price: 69.99,
      stock: 40,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Razer Kiyo Pro",
      description: "4K webcam with HDR and adaptive light sensor",
      price: 199.99,
      stock: 15,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Elgato FaceCam",
      description: "Professional webcam with Sony STARVIS sensor",
      price: 199.99,
      stock: 12,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Microsoft LifeCam Studio",
      description: "1080p HD webcam with TrueColor technology",
      price: 79.99,
      stock: 25,
      imageUrl: "https://via.placeholder.com/300x300",
    },
    {
      name: "Corsair Elgato FaceCam Pro",
      description: "4K webcam with advanced image processing",
      price: 299.99,
      stock: 8,
      imageUrl: "https://via.placeholder.com/300x300",
    },
  ];

  for (const product of webcamProducts) {
    await prisma.product.create({
      data: {
        ...product,
        categoryId: webcam.id,
      },
    });
  }

  const user1 = await prisma.user.create({
    data: {
      firstName: "John",
      email: "john.doe@example.com",
      passwordHash: "hashed_password_123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: "Jane",
      email: "jane.smith@example.com",
      passwordHash: "hashed_password_456",
    },
  });

  console.log("✅ Products and users created");

  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      status: "DELIVERED",
      totalAmount: 499.98,
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      status: "PENDING",
      totalAmount: 399.99,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: (await prisma.product.findFirst({
        where: { name: "Logitech MX Master 3S" },
      }))!.id,
      quantity: 1,
      priceAtPurchase: 99.99,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: (await prisma.product.findFirst({
        where: { name: "Sony WH-1000XM5" },
      }))!.id,
      quantity: 1,
      priceAtPurchase: 399.99,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: (await prisma.product.findFirst({
        where: { name: 'Dell UltraSharp 27" 4K' },
      }))!.id,
      quantity: 1,
      priceAtPurchase: 399.99,
    },
  });

  console.log("✅ Orders and order items created");
  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
