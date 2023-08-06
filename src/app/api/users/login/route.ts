import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;
    console.log("🚀 ~ file: route.ts:12 ~ POST ~ requestBody:", requestBody);

    //if User Exist
    const user = await User.findOne({ email: email });
    console.log("🚀 ~ file: route.ts:16 ~ POST ~ user:", user);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 500 }
      );
    }

    //compare password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    //create token data
    const tokenData = {
      id: user._id,
      usernames: user.username,
      email: user.email,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
