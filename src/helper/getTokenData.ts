import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export  const getTokenData = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || "";
       const decoded =  jwt.verify(token, process.env.TOKEN_SECRET!);
       return decoded.id;
    } catch(e : any) {
        throw new Error(e.message);
    }
   
} 