import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  const existingCategories = await prisma.category.findMany();
  const existingBrands = await prisma.brand.findMany();
  const existingProducts = await prisma.product.findMany();

  if (
    existingCategories.length > 0 &&
    existingBrands.length > 0 &&
    existingProducts.length > 0
  ) {
    console.log("✅ Data already exists, skipping creation");
    return;
  }

  console.log("🏢 Creating brands...");
  const brands = await Promise.all([
    prisma.brand.create({
      data: {
        name: "ROG",
        logoUrl: "https://i.ibb.co/fV3thkc5/ROG-Logo.png",
      },
    }),
    prisma.brand.create({
      data: {
        name: "Logitech",
        logoUrl: "https://i.ibb.co/TMTxqjNw/Logitech-Logo.png",
      },
    }),
    prisma.brand.create({
      data: {
        name: "JBL",
        logoUrl: "https://i.ibb.co/V00Hb6hb/JBL-Logo.png",
      },
    }),
    prisma.brand.create({
      data: {
        name: "AOC",
        logoUrl: "https://i.ibb.co/d0VQKhDV/AOC-Logo.png",
      },
    }),
    prisma.brand.create({
      data: {
        name: "Razer",
        logoUrl: "https://i.ibb.co/8Dw1SD8Y/Razer-Logo.png",
      },
    }),
    prisma.brand.create({
      data: {
        name: "Rexus",
        logoUrl: "https://i.ibb.co/396nn7ht/Rexus-Logo.png",
      },
    }),
  ]);

  console.log("✅ Brands created:", brands.length);

  console.log("📦 Creating categories...");

  const mouse = await prisma.category.create({
    data: {
      name: "Mouse",
      description: "Computer mice and pointing devices",
      image: "https://i.ibb.co/4RFR2QBQ/Image.png",
      exploreInfo: "Precision pointing devices for gaming and productivity",
    },
  });

  const monitor = await prisma.category.create({
    data: {
      name: "Monitor",
      description: "Computer monitors and displays",
      image: "https://i.ibb.co/4RFR2QBQ/Image.png",
      exploreInfo: "High-quality displays for work and entertainment",
    },
  });

  const headphone = await prisma.category.create({
    data: {
      name: "Headphone",
      description: "Audio headphones and headsets",
      image: "https://i.ibb.co/4RFR2QBQ/Image.png",
      exploreInfo: "Premium audio experience for music and gaming",
    },
  });

  const keyboard = await prisma.category.create({
    data: {
      name: "Keyboard",
      description: "Computer keyboards and input devices",
      image: "https://i.ibb.co/4RFR2QBQ/Image.png",
      exploreInfo: "Mechanical and membrane keyboards for every need",
    },
  });

  const webcam = await prisma.category.create({
    data: {
      name: "Webcam",
      description: "Web cameras and video conferencing devices",
      image: "https://i.ibb.co/4RFR2QBQ/Image.png",
      exploreInfo: "HD webcams for streaming and video calls",
    },
  });

  console.log("✅ Categories created");

  const mouseProducts = [
    {
      name: "Logitech MX Master 3S",
      description:
        "Ergonomic wireless mouse designed for all-day comfort and precision. Features a high-accuracy sensor that tracks on most surfaces, whisper-quiet buttons, and an ultra-fast electromagnetic scroll wheel for pixel-by-pixel control or rapid scrolling. Seamlessly pair with multiple devices, customize buttons for your favorite apps, and keep going with USB-C quick charging and long battery life.",
      price: 99.99,
      stock: 25,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[1].id,
    },
    {
      name: "Razer DeathAdder V3",
      description:
        "Esports-ready gaming mouse with a 30,000 DPI optical sensor for surgical accuracy and consistent tracking at high speeds. Its refined ergonomic shell reduces fatigue during long sessions, while durable optical switches deliver crisp, double-click-free actuation. PTFE feet and a flexible, drag-reducing cable ensure effortless glide, and onboard memory keeps your custom DPI stages and bindings ready wherever you play.",
      price: 69.99,
      stock: 30,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[4].id,
    },
    {
      name: "Rexus Daxa Air II",
      description:
        "Ultra-light wireless gaming mouse engineered for speed, control, and comfort. A responsive sensor paired with low-latency wireless keeps your aim sharp, while the balanced shape and textured sides provide a confident grip. Customize lighting, DPI, and macros with intuitive software, and go the distance with efficient power management and USB-C fast charging.",
      price: 79.99,
      stock: 20,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[5].id,
    },
    {
      name: "ROG Gladius III",
      description:
        "Premium gaming mouse featuring a 36,000 DPI sensor, crisp switches, and finely tuned click consistency for competitive play. The sculpted right-handed shape offers excellent support, while PTFE feet and a flexible paracord-style cable deliver smooth, snag-free movement. Customize RGB, DPI, and button mapping, and store profiles onboard for tournaments and travel.",
      price: 79.99,
      stock: 15,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[0].id,
    },
    {
      name: "Logitech G Pro X Superlight",
      description:
        "Ultra-lightweight wireless mouse built for elite competitive performance. Its high-efficiency sensor delivers precise tracking and reliable flick control, while large PTFE feet provide exceptionally smooth glide. The symmetrical shape suits a wide range of grips, and the low-latency wireless connection plus long battery life keep you focused during marathon sessions.",
      price: 39.99,
      stock: 40,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
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
      description:
        "27-inch 4K UHD display that renders razor-sharp text and lifelike visuals with 99% sRGB coverage. Ideal for creative work and entertainment, it offers wide viewing angles, slim bezels for multi-monitor setups, and eye-care features to reduce strain. Multiple input options and ergonomic adjustments help you build a tidy, comfortable workspace.",
      price: 399.99,
      stock: 15,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[3].id,
    },
    {
      name: 'ROG Swift 24" 144Hz',
      description:
        "24-inch gaming monitor tuned for speed with a 144 Hz refresh rate and 1 ms response time for fluid motion and crisp clarity. Adaptive-sync support helps eliminate tearing and stutter, while a vibrant panel and game-ready presets make it easy to dial in your preferred look. The compact size keeps all action within your field of view for focused competitive play.",
      price: 249.99,
      stock: 20,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[0].id,
    },
    {
      name: 'AOC UltraWide 34" Curved',
      description:
        "Immersive 34-inch curved ultrawide that expands your field of view for gaming, content creation, and multitasking. The extra horizontal space makes room for side-by-side windows, timelines, and tool palettes, while adaptive-sync support and fast response keep motion smooth. A clean design, versatile connectivity, and a comfortable stand round out the setup.",
      price: 499.99,
      stock: 12,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[3].id,
    },
    {
      name: 'ROG Strix 32" QHD',
      description:
        "Large 32-inch QHD gaming display with a blistering 240 Hz refresh rate for ultra-smooth, responsive gameplay. Enhanced contrast and vivid color bring scenes to life, and adaptive-sync helps maintain tear-free performance. With a sturdy, adjustable stand and rich connectivity, it is a strong centerpiece for high-end rigs.",
      price: 599.99,
      stock: 8,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[0].id,
    },
    {
      name: 'AOC Pro 27" 5K',
      description:
        "Professional-grade 27-inch 5K monitor delivering exceptional detail and color accuracy for photo, video, and design workflows. Factory-tuned color, wide gamut coverage, and uniform brightness help ensure reliable results, while the high pixel density keeps UI elements and text incredibly crisp. Built-in ergonomics and modern I/O simplify daily use in demanding studios.",
      price: 1599.99,
      stock: 5,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
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
        "Wireless over-ear headphones that combine powerful, balanced sound with effective noise cancelling to keep you in the zone. Enjoy long listening sessions thanks to cushioned earcups and an extended battery life, and stay aware when needed with ambient modes. Multipoint Bluetooth, quick charging, and intuitive onboard controls make them effortless for everyday use.",
      price: 399.99,
      stock: 25,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[2].id,
    },
    {
      name: "JBL Quantum 800",
      description:
        "Gaming headset engineered for immersion with active noise cancellation and richly detailed audio that highlights footsteps, voices, and effects. A clear boom mic keeps team comms sharp, while 2.4 GHz wireless and Bluetooth offer flexible connectivity across devices. Plush memory-foam padding and customizable lighting complete the premium setup.",
      price: 329.99,
      stock: 20,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[2].id,
    },
    {
      name: "Razer BlackShark V2 Pro",
      description:
        "Wireless esports headset delivering clear, powerful sound and excellent mic intelligibility over a low-latency 2.4 GHz link. Lightweight construction, breathable memory-foam cushions, and a balanced clamp force provide long-wear comfort. Tunable EQ, game-ready spatial audio, and a detachable noise-cancelling mic keep you locked in on every callout.",
      price: 149.99,
      stock: 30,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[4].id,
    },
    {
      name: "JBL Tune 750BTNC",
      description:
        "Compact, foldable wireless headphones with active noise cancellation to reduce distractions at home, in the office, or on the go. The lively sound signature brings music and movies to life, while a long-lasting battery and quick charging keep you powered through busy days. Built-in controls and a comfortable fit make daily listening simple.",
      price: 149.99,
      stock: 35,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[2].id,
    },
    {
      name: "ROG Delta S",
      description:
        "High-fidelity gaming headset designed for clear positional cues and punchy, detailed audio. Lightweight construction and soft ear cushions reduce fatigue, while a noise-filtering microphone ensures your voice cuts through the action. Customizable RGB and USB-C connectivity make it a versatile choice for PC, console, and portable use.",
      price: 99.99,
      stock: 40,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
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
      description:
        "Compact 84-key wireless mechanical keyboard that balances desk space, portability, and full-size functionality. Hot-swappable sockets let you experiment with different switches, while durable keycaps and per-key lighting elevate both feel and look. Connect via low-latency wireless, Bluetooth, or USB-C, and tailor layers, macros, and effects with intuitive software.",
      price: 79.99,
      stock: 30,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[5].id,
    },
    {
      name: "ROG Strix Scope II",
      description:
        "Performance-focused mechanical keyboard with responsive switches, sound-dampening design, and per-key RGB lighting. The sturdy chassis resists flex, dedicated media controls keep playback at your fingertips, and on-the-fly macros simplify complex inputs. Customize profiles and lighting, then store them onboard for seamless use across setups.",
      price: 199.99,
      stock: 15,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[0].id,
    },
    {
      name: "Logitech MX Keys Mini",
      description:
        "Sleek, compact wireless keyboard crafted for comfortable, precise typing in a minimal footprint. Low-profile, softly dished keys promote natural finger alignment, while adaptive backlighting illuminates as your hands approach. Pair with up to three devices, switch instantly between them, and recharge via USB-C to keep your workflow flowing.",
      price: 99.99,
      stock: 25,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[1].id,
    },
    {
      name: "Razer BlackWidow V4 Pro",
      description:
        "Flagship mechanical keyboard built for control and immersion, featuring responsive switches, dedicated macro keys, and a multifunction media dial. A cushioned wrist rest and sound-dampening materials enhance comfort and acoustics, while bright per-key RGB and underglow add dramatic flair. Advanced software unlocks powerful macros, layers, and profiles for every game or app.",
      price: 229.99,
      stock: 18,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[4].id,
    },
    {
      name: "Logitech G915 TKL",
      description:
        "Low-profile wireless mechanical keyboard that delivers a fast, crisp keystroke in a compact, tournament-ready form factor. The premium metal top plate feels solid, while long-lasting wireless and per-key lighting keep your setup clean without sacrificing style. Easily toggle devices and profiles to take your preferred layout anywhere.",
      price: 99.99,
      stock: 35,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
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
      description:
        "Reliable 1080p webcam that delivers sharp video, fast autofocus, and clear stereo audio for calls, streams, and classes. Automatic light correction helps you look your best in challenging environments, and wide compatibility ensures easy setup with popular apps. A sturdy mount lets you clip to a screen or position on a tripod.",
      price: 69.99,
      stock: 40,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[1].id,
    },
    {
      name: "Razer Kiyo Pro",
      description:
        "High-performance 4K webcam with HDR and an adaptive light sensor that maintains natural-looking exposure in bright or dim scenes. Fast, accurate autofocus keeps you crisp, while a wide field of view captures more of your space when needed. Flexible mounting and software controls make fine-tuning simple for streaming or conferencing.",
      price: 199.99,
      stock: 15,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[4].id,
    },
    {
      name: "ROG Eye S",
      description:
        "Premium creator webcam capable of detailed 4K capture with smart noise reduction and excellent low-light performance. The fast lens and clear microphone help you look and sound professional, while software controls let you dial in exposure, color, and framing. Ideal for content creation, streaming, and high-quality video calls.",
      price: 199.99,
      stock: 12,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[0].id,
    },
    {
      name: "Logitech StreamCam",
      description:
        "Creator-friendly 1080p webcam with smooth, sharp video and intelligent autofocus and exposure for consistent results. Connect over USB-C, switch to portrait orientation for short-form content, and rely on dual mics for clear voice pickup. Perfect for streaming, webinars, and everyday meetings.",
      price: 79.99,
      stock: 25,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
      brandId: brands[1].id,
    },
    {
      name: "Rexus StreamCam Pro",
      description:
        "Versatile 4K webcam that combines advanced image processing with fast autofocus and detailed, vibrant video. Dual microphones reduce background noise for clearer speech, and an adjustable field of view helps you frame the shot just right. Compatible with major platforms and simple to mount on monitors or tripods.",
      price: 299.99,
      stock: 8,
      imageUrl: "https://i.ibb.co/4RFR2QBQ/Image.png",
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
      mobile: "123456789",
      passwordHash: "hashed_password_123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: "Jane",
      email: "jane.smith@example.com",
      mobile: "987654321",
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
