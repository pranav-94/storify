"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem("username", username);
        router.push("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-[#ffffff] max-w-[350px] w-full p-8 rounded-2xl ">
        <div className="flex justify-center mb-4">
          <img
            src="https://img.freepik.com/premium-vector/cool-headphone-vector-illustration-with-music-bar_444100-29.jpg"
            width={80}
            height={80}
            alt="Twitter logo"
            className="rounded-full shadow-[0px_0px_3px_#5f5f5f,0px_0px_0px_5px_#ecf0f3,8px_8px_15px_#a7aaa7,-8px_-8px_15px_#fff]"
          />
        </div>
        <div className="text-center text-xl font-semibold text-gray-600 mb-6">
          Storify
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center  rounded-full pl-4 shadow-inner shadow-[inset_8px_8px_8px_#cbced1,inset_-8px_-8px_8px_#fff]">
            <input
              type="text"
              placeholder="Username"
              className="w-full py-3 px-4 bg-transparent outline-none text-gray-700 rounded-full "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center shadow-inner shadow-[inset_8px_8px_8px_#cbced1,inset_-8px_-8px_8px_#fff] rounded-full pl-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 px-4 bg-transparent outline-none text-gray-700 rounded-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full shadow-[3px_3px_3px_#b1b1b1,-3px_-3px_3px_#fff] text-lg"
          >
            Login
          </button>
        </form>
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Don't have an account?</p>
          <a href="/signup" className="text-blue-500 hover:text-blue-600">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}