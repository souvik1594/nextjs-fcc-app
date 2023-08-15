"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully!");
      router.push("/login");
    } catch(e : any) {
      console.log(e.message);
      toast.error(e.message);
    }
  }
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    setData(response.data.data._id);
    console.log('response.data.data._id  --> ' + response.data.data._id)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <Toaster />
      <h1>Profile</h1>
      <hr />
      <p>ProfilePage</p>
      <h2>{!data ? 'No Data' : <Link href = {`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
      <button onClick={getUserDetails} className="p-4 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get User</button>
    </div>
    
  );
}
