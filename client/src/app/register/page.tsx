"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
export default function register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      toast("User Registration Successful");
      router.push("/login");
    } else {
      console.error("Registration failed");
      toast("Registration failed");
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-[var(--custom-yellow-dark)]/30 flex items-center justify-center ">
        <div className="w-[500px] h-[550px] rounded-lg p-10 bg-white flex flex-col gap-5 items-center justify-start">
          <div className="w-full mb-10">
            <p className="text-4xl font-semibold text-gray-800 text-center">
              Welcome to{" "}
              <span className="text-[var(--custom-yellow-dark)]">
                OLDPhones
              </span>
            </p>
            <p className="text-md text-center text-gray-700 mt-4">
              Let's get you started!
            </p>
          </div>
          <div className="w-full">
            <label
              htmlFor="username"
              className="text-md font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-[40px] border border-gray-200 focus:outline-none focus:border-[var(--custom-yellow-light)] focus:border-2 rounded-sm p-4 text-sm"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="text-md font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[40px] border border-gray-200 focus:outline-none focus:border-[var(--custom-yellow-light)] focus:border-2 rounded-sm p-4 text-sm"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="text-md font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[40px] border border-gray-200 focus:outline-none focus:border-[var(--custom-yellow-light)] focus:border-2 rounded-sm p-4 text-sm"
            />
          </div>
          <div className="w-full">
            {" "}
            <Button
              variant="default"
              onClick={handleSubmit}
              className=" bg-[var(--custom-yellow-dark)] rounded-sm w-full"
            >
              Register
            </Button>{" "}
          </div>
          <p className="text-sm font-bold text-gray-700">
            Already have an account,
            <span className="text-[var(--custom-yellow-dark)]">
              <a href="/login">sign up instead!</a>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
