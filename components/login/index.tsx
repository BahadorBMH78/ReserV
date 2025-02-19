"use client";
import { useEffect, useState } from "react";
import PrimaryBtn from "../button";
import Image from "next/image";
import UserIcon from "@/public/User.svg";
import UserDarkIcon from "@/public/User-dark.svg";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import Toast from "../toast";
import { useRouter } from "next/navigation";
import Vector from "@/public/vector.svg";
import VectorDark from "@/public/vector-dark.svg";
import people from "@/assets/people.svg"
import { useTheme } from "next-themes";
import { FieldValues, useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { resolvedTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const onsubmit = async (data: FieldValues) => {
    setLoading(true);
    const res = await signIn("custom", {
      ...data,
      redirect: false,
      callbackUrl: "/profile",
    });
    setLoading(false);
    if (res?.error) {
      const statusCode = res.error.split(":")[0];
      toast(
        <Toast
          message={statusCode === "401" ? "ورود غیرمجاز" : "خطای سرور!"}
        />,
        {
          bodyStyle: {
            background: "#fee4e2",
            border: "1px solid #f04438",
            borderRadius: "6px",
            height: 50,
            fontFamily: "Kalameh",
          },
        }
      );
    } else {
      router.push("/");
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <>
      <Image
        src={resolvedTheme === "light" ? people : people}
        className="mt-0"
        alt="bulut"
      />
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col mt-[30px] w-full rtl relative h-full"
      >
        <p className="text-[black] font-[500] dark:text-[#cecfd2]">
          اطلاعات زیر را وارد کنید
        </p>
        <div className="mt-[24px] flex flex-col w-full gap-[20px]">
          <div className="flex flex-col gap-[5px]">
            <div className="flex items-center">
              <p className="text-[black] font-[500] dark:text-[#cecfd2]">
                کد پرسنلی
              </p>
              <span className="text-[red] flex items-center"> *</span>
            </div>
            <div className="flex flex-col gap-[5px]">
              <div className="flex flex-col relative">
                <input
                  id="username"
                  {...register("username", {
                    required: "نام کاربری الزامی است.",
                  })}
                  type="number"
                  placeholder="نام کاربری خود را وارد کنید"
                  className={`rounded-[8px] border-[2px] bg-transparent w-full h-[40px] outline-none dark:border-[#cecfd280] dark:text-[#94969c] text-[black] p-[10px] pr-[40px] ${
                    errors.username ? "!border-[red]" : ""
                  }`}
                />
                <Image
                  src={resolvedTheme === "light" ? UserIcon : UserDarkIcon}
                  alt="user"
                  className="absolute right-[16px] top-[50%] mt-[-12px]"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="flex items-center">
              <p className="text-[black] font-[500] dark:text-[#cecfd2]">
                رمز عبور
              </p>
              <span className="text-[red] flex items-center"> *</span>
            </div>
            <div className="flex flex-col gap-[5px]">
              <div className="flex flex-col relative">
                <input
                  id="password"
                  {...register("password", {
                    required: "رمز عبور الزامی است.",
                  })}
                  placeholder="رمز عبور خود را وارد کنید"
                  type="password"
                  className={`rounded-[8px] border-[2px] bg-transparent w-full h-[40px] outline-none dark:border-[#cecfd280] dark:text-[#94969c] text-[black] p-[10px] pr-[40px] ${
                    errors.password ? "!border-[red]" : ""
                  }`}
                />
                <Image
                  src={resolvedTheme === "light" ? UserIcon : UserDarkIcon}
                  alt="user"
                  className="absolute right-[16px] top-[50%] mt-[-12px]"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message as string}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-[35px] bottom-[30px] w-full">
          <PrimaryBtn type="submit" title="ورود" loading={loading} />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
