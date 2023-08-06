"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Signup Successfully!");
      console.log(
        "🚀 ~ file: page.tsx:33 ~ onSignup ~ response:",
        response.data
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      toast.error("This is an error while signing up!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1> {loading ? "Processing request" : "Sign Up"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        placeholder="username"
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
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

      {disableButton ? (
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          onClick={onSignup}
          disabled={disableButton}
        >
          Fill the required fields
        </button>
      ) : (
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none hover:bg-orange-400 focus:border-orange-20 text-black"
          onClick={onSignup}
          disabled={disableButton}
        >
          Signup here
        </button>
      )}

      <Link href="/login">Visit Login</Link>
    </div>
  );
}
