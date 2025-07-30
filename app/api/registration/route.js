import { NextResponse } from "next/server";
import { userSchema } from "@/zod/validation";
import db from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export async function POST(Request) {
  try {
    const body = await Request.json();
    const result = userSchema.safeParse(body);

    if(!result.success){
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    const { email, password, age, role } = result.data;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      email,
      password: hash,
      age,
      role,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: err },
      { status: 500 }
    );
  }
}
  