import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
import bcrypt from "bcryptjs";
import { registerSchema } from "../../../components/login/loginValidation";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { email, mobile, password } = validationResult.data;
    
    const normalizedEmail = email.toLowerCase();

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const existingUserByMobile = await prisma.user.findUnique({
      where: { mobile },
    });

    if (existingUserByMobile) {
      return NextResponse.json(
        { message: "User with this phone number already exists" },
        { status: 409 }
      );
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        email: normalizedEmail,
        mobile,
        firstName: normalizedEmail.split("@")[0],
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        mobile: true,
        firstName: true,
      },
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
