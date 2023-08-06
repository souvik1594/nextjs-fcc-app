"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    let loadingToast;
    try {
      setLoading(true);
      loadingToast = toast.loading("Waiting for the action to complete...");
      const response = await axios.post("/api/users/login", user);
      console.log(
        "🚀 ~ file: page.tsx:20 ~ onLogin ~ response:",
        response.data
      );
      toast.dismiss(loadingToast);
      toast.success("Login Successfully!");
      router.push("/profile");
    } catch (err: any) {
      toast.dismiss(loadingToast);
      console.log("🚀 ~ file: page.tsx:16 ~ onLogin ~ err:", err.message);
      toast.error("Login failed!");
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <Toaster />
      <h1 className="mb-4">{loading ? "Processing request" : "Login"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        placeholder="email"
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="text"
        value={user.password}
        placeholder="password"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />

      {disableButton ? (
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4  text-red-600 focus:outline-none focus:border-gray-600 text-black"
          onClick={onLogin}
          disabled={disableButton}
        >
          Above fields required*
        </button>
      ) : (
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 hover:bg-orange-400 focus:outline-none focus:border-gray-600 text-black"
          onClick={onLogin}
        >
          Login here
        </button>
      )}
      <Link href="/signup">Visit Sign-up</Link>
    </div>
  );
}
