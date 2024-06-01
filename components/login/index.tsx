"use client";
import React, { useState } from "react";
import Card from "../card";
import PrimaryBtn from "../button";
import Image from "next/image";
import UserIcon from "@/public/User.svg"

const LoginForm = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const onSubmit = () => {
    if (form.username === "" || form.password === "") {
      setError(true);
    }
  };
  const usernameOnChange = (e: any) => {
    setForm({ ...form, username: e.target.value });
    if (e.target.value !== "") {
      setError(false);
    }
  };
  const passwordOnChange = (e: any) => {
    setForm({ ...form, password: e.target.value });
    if (e.target.value !== "") {
      setError(false);
    }
  };
  return (
    <div className="flex flex-col mt-[50px] w-full rtl relative h-full">
      <p className="text-[black] font-[500]">اطلاعات زیر را وارد کنید</p>
      <div className="mt-[24px] flex flex-col w-full gap-[20px]">
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center">
            <p className="text-[black] font-[500]">کد پرسنلی</p>
            <span className="text-[red] flex items-center"> *</span>
          </div>
          <div className="relative">
            <input placeholder="نام کاربری خود را وارد کنید" type="number" className="rounded-[8px] border-[2px] bg-transparent w-full h-[40px] outline-none text-[black] p-[10px] pr-[40px]" />
            <Image src={UserIcon} alt="user" className="absolute right-[16px] top-[50%] mt-[-12px]" />
          </div>
        </div>
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center">
            <p className="text-[black] font-[500]">رمز عبور</p>
            <span className="text-[red] flex items-center"> *</span>
          </div>
          <div className="relative">
            <input placeholder="رمز عبور خود را وارد کنید" type="password" className="rounded-[8px] border-[2px] bg-transparent w-full h-[40px] outline-none text-[black] p-[10px] pr-[40px]" />
            <Image src={UserIcon} alt="user" className="absolute right-[16px] top-[50%] mt-[-12px]" />
          </div>
        </div>
      </div>
      <div className="mt-[35px] bottom-[30px] w-full">
        <PrimaryBtn title="ورود" />
      </div>
    </div>
  );
};

export default LoginForm;
