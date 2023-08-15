import { getTokenData } from "@/helper/getTokenData";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";

connect();
export async function GET(request : NextRequest, response : NextResponse) {
    try {
        const userId = await getTokenData(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({message : "User Found", data : user});
    } catch(e : any) {
        return NextResponse.json({message : e.message}, {status : 500});
    }
}

