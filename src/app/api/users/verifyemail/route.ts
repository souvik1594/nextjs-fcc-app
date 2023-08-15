import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";

connect();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { token } = requestBody;
    console.log(token);
    const user = await User.find({
      verifiedtoken: token,
      verifiedtokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 500 }
      );
    }
    console.log(user._id);
    User.findByIdAndUpdate(user._id, {
      isVerified: true,
      verifiedtoken: undefined,
      verifiedtokenExpiry: undefined,
    });

    return NextResponse.json(
      { message: "User Email verified", success: true },
      { status: 200 }
    );
  } catch (e: any) {
    console.log("in API Verify email" + e.message);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
