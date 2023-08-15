import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendmailer } from "@/helper/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(username);
    console.log(email);
    console.log(password);

    //Check if user exist
    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    const saveduser = await newUser.save();
    console.log("🚀 ~ file: route.ts:35 ~ POST ~ saveduser:", saveduser);
    //Send Verification email
    await sendmailer({ email, emailType: "VERIFY", userId: saveduser._id });
    return NextResponse.json({
      message: "User is saved",
      success: true,
      saveduser,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
