import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  const existingCategories = await prisma.category.findMany();
  const existingBrands = await prisma.brand.findMany();
  const existingProducts = await prisma.product.findMany();
  
  if (existingCategories.length > 0 && existingBrands.length > 0 && existingProducts.length > 0) {
    console.log("✅ Data already exists, skipping creation");
    return;
  }

  console.log("🏢 Creating brands...");
  const brands = await Promise.all([
    prisma.brand.create({
      data: {
        name: "ROG",
        logoUrl: "https://i.ibb.co/fV3thkc5/ROG-Logo.png"
      }
    }),
    prisma.brand.create({
      data: {
        name: "Logitech", 
        logoUrl: "https://i.ibb.co/TMTxqjNw/Logitech-Logo.png"
      }
    }),
    prisma.brand.create({
      data: {
        name: "JBL",
        logoUrl: "https://i.ibb.co/V00Hb6hb/JBL-Logo.png"
      }
    }),
    prisma.brand.create({
      data: {
        name: "AOC",
        logoUrl: "https://i.ibb.co/d0VQKhDV/AOC-Logo.png"
      }
    }),
    prisma.brand.create({
      data: {
        name: "Razer",
        logoUrl: "https://i.ibb.co/8Dw1SD8Y/Razer-Logo.png"
      }
    }),
    prisma.brand.create({
      data: {
        name: "Rexus",
        logoUrl: "https://i.ibb.co/396nn7ht/Rexus-Logo.png"
      }
    })
  ]);

  console.log("✅ Brands created:", brands.length);

  console.log("📦 Creating categories...");

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
      brandId: brands[1].id,
    },
    {
      name: "Razer DeathAdder V3",
      description: "Gaming mouse with 30,000 DPI optical sensor",
      price: 69.99,
      stock: 30,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[4].id,
    },
    {
      name: "Rexus Daxa Air II",
      description:
        "Wireless gaming mouse with RGB lighting and ergonomic design",
      price: 79.99,
      stock: 20,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[5].id,
    },
    {
      name: "ROG Gladius III",
      description: "Gaming mouse with 36,000 DPI sensor and customizable buttons",
      price: 79.99,
      stock: 15,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[0].id,
    },
    {
      name: "Logitech G Pro X Superlight",
      description: "Ultra-lightweight gaming mouse with HERO sensor",
      price: 39.99,
      stock: 40,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[1].id,
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
      name: 'AOC 27" 4K UHD',
      description: "27-inch 4K monitor with 99% sRGB color accuracy",
      price: 399.99,
      stock: 15,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[3].id,
    },
    {
      name: 'ROG Swift 24" 144Hz',
      description:
        "Gaming monitor with 144Hz refresh rate and 1ms response time",
      price: 249.99,
      stock: 20,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[0].id,
    },
    {
      name: 'AOC UltraWide 34" Curved',
      description:
        "34-inch curved ultrawide monitor for productivity and gaming",
      price: 499.99,
      stock: 12,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[3].id,
    },
    {
      name: 'ROG Strix 32" QHD',
      description: "32-inch QHD gaming monitor with 240Hz refresh rate",
      price: 599.99,
      stock: 8,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[0].id,
    },
    {
      name: 'AOC Pro 27" 5K',
      description: "27-inch 5K display with professional color accuracy",
      price: 1599.99,
      stock: 5,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[3].id,
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
      name: "JBL Live 660NC",
      description:
        "Wireless noise-canceling headphones with 30-hour battery life",
      price: 399.99,
      stock: 25,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[2].id,
    },
    {
      name: "JBL Quantum 800",
      description: "Gaming headset with active noise cancellation and RGB",
      price: 329.99,
      stock: 20,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[2].id,
    },
    {
      name: "Razer BlackShark V2 Pro",
      description: "Wireless gaming headset with 2.4GHz lossless audio",
      price: 149.99,
      stock: 30,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[4].id,
    },
    {
      name: "JBL Tune 750BTNC",
      description:
        "Wireless headphones with active noise cancellation",
      price: 149.99,
      stock: 35,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[2].id,
    },
    {
      name: "ROG Delta S",
      description: "Gaming headset with 7.1 surround sound and RGB",
      price: 99.99,
      stock: 40,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[0].id,
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
      name: "Rexus Daxa M84 Pro",
      description: "Wireless mechanical keyboard with hot-swappable switches",
      price: 79.99,
      stock: 30,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[5].id,
    },
    {
      name: "ROG Strix Scope II",
      description: "Mechanical gaming keyboard with ROG NX switches and RGB",
      price: 199.99,
      stock: 15,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[0].id,
    },
    {
      name: "Logitech MX Keys Mini",
      description:
        "Wireless keyboard with backlit keys and multi-device connectivity",
      price: 99.99,
      stock: 25,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[1].id,
    },
    {
      name: "Razer BlackWidow V4 Pro",
      description: "Mechanical gaming keyboard with Razer Yellow switches",
      price: 229.99,
      stock: 18,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[4].id,
    },
    {
      name: "Logitech G915 TKL",
      description:
        "Wireless gaming keyboard with low-profile mechanical switches",
      price: 99.99,
      stock: 35,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[1].id,
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
      brandId: brands[1].id,
    },
    {
      name: "Razer Kiyo Pro",
      description: "4K webcam with HDR and adaptive light sensor",
      price: 199.99,
      stock: 15,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[4].id,
    },
    {
      name: "ROG Eye S",
      description: "Professional webcam with 4K recording and RGB",
      price: 199.99,
      stock: 12,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[0].id,
    },
    {
      name: "Logitech StreamCam",
      description: "1080p HD webcam with TrueColor technology",
      price: 79.99,
      stock: 25,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[1].id,
    },
    {
      name: "Rexus StreamCam Pro",
      description: "4K webcam with advanced image processing",
      price: 299.99,
      stock: 8,
      imageUrl: "https://via.placeholder.com/300x300",
      brandId: brands[5].id,
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
        where: { name: "JBL Live 660NC" },
      }))!.id,
      quantity: 1,
      priceAtPurchase: 399.99,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: (await prisma.product.findFirst({
        where: { name: 'AOC 27" 4K UHD' },
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
