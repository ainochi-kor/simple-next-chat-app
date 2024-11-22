"use client";

import { auth } from "@/firebase";
import React, { useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const Login: React.FC = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-[392px]">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">
          로그인
        </h2>
        <form
          onSubmit={handleSubmit}
          className="pointer-events-none opacity-30"
        >
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-[#999999]"
            >
              이메일
            </label>
            <input
              id="email"
              className="border border-[#CFCFCF] text-sm rounded-md block w-full p-2.5"
              placeholder="이메일을 입력하세요."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-[#999999]"
            >
              비밀번호
            </label>
            <input
              id="password"
              className="border border-[#CFCFCF] text-sm rounded-md block w-full p-2.5"
              placeholder="비밀번호를 입력하세요."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-10 ">
            <button
              className="w-full px-6 py-2 duration-200 border rounded-3xl bg-[#00B98D] text-white hover:bg-white hover:text-[#00B98D] hover:border-[#00B98D]"
              type="submit"
            >
              로그인
            </button>
          </div>
        </form>
        <button
          className="mt-4 w-full px-6 py-2 duration-200 border rounded-3xl hover:bg-[#00B98D] hover:text-white"
          type="button"
          onClick={() => signInWithGoogle()}
        >
          Google 계정으로 로그인
        </button>
      </div>
    </section>
  );
};

export default Login;
