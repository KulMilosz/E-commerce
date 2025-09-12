# 🛒 E-commerce Store – Next.js

Final project developed as part of the course.  
The goal is to create a **functional online store** using **Next.js** and the provided [Figma design]

## 🎯 Project Objectives

- Build an online store matching the Figma design.
- Implement key e-commerce features.
- Gain hands-on experience with Next.js, React, Tailwind CSS, and API/Payment integrations.

---

## ⚙️ Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- ESLint & Prettier
- Payment integration

---

## 📂 Project Structure

```
app/
├── api/                    # API Routes (Backend)
│   ├── categories/         # Categories endpoints
│   ├── products/           # Products endpoints
│   └── user/              # User endpoints
├── components/            # Reusable UI components
├── generated/             # Prisma generated files (ignored)
└── globals.css           # Global styles

prisma/
├── migrations/           # Database migrations
├── schema.prisma        # Database schema
└── seed.ts             # Database seeding script

docker-compose.yml       # PostgreSQL container setup
```

---

## 🛠️ Development Setup

### Prerequisites:

- Node.js 18+
- Docker Desktop
- Git

### Installation:

```bash
# Clone repository
git clone <repository-url>
cd e-commerce-cursor

# Install dependencies
npm install

# Start database
npm run db:up

# Run migrations and seed
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

### Available Scripts:

- `npm run dev` - Start Next.js development server
- `npm run db:up` - Start PostgreSQL container
- `npm run db:down` - Stop PostgreSQL container
- `npm run db:reset` - Reset database (removes all data)
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run dev:full` - Start database + Next.js

---

## ✅ Functional Requirements

- ✅ **Backend API** - Complete with database integration
- ⏳ Product listing page
- ⏳ Product detail page
- ⏳ Shopping cart with add/edit/remove functionality
- ⏳ Checkout form
- ⏳ Responsive design according to Figma
- ⏳ Payment integration (optional)
- ⏳ User authentication/registration (optional)

---

## 👤 Author

Name / KulMilosz

---

## 📜 License

This project was created for educational purposes (course final project).
