"use client";

import axios from "axios";
import { url } from "inspector";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);
    const [verified, setVerified] = useState(false);

    const verifyUserEmail =async () => {
        try {
            await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
        } catch(e : any){
            setError(true);
            console.log(e.response.message);
        }
    }

    useEffect(() => {
        const urlToken =window.location.search.split("=")[1];
        console.log('in verify email VerifyEmailPage'+ urlToken)
        setToken(urlToken || "");
        
    }, [])

    useEffect(() => {
        if(token!=null && token.length >0) {
            verifyUserEmail();
        }  
    },[token])

    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}`: 'no token'}</h2>

            {
                verified ? <h2 className="p-2 bg-green-500 text-black">Email verified</h2> : <h2 className="p-2 bg-red-500 text-black">Email not verified</h2>
            }
            {
                error ? <h2 className="p-2 bg-red-500 text-black">Invalid token</h2> : <></>
            }
        </div>
    )
}