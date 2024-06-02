"use client";
import { Avatar, AvatarProps } from "@files-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Sun from "@/public/sun.svg";
import SunDark from "@/public/sun-dark.svg";
// import Password from "@/public/password-lock.svg";
// import Comments from "@/public/comments.svg";
import Logout from "@/public/logout.svg";
import Arrow from "@/public/arrow.svg";
import ArrowDark from "@/public/arrow-dark.svg";
import Switch from "react-switch";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

const Profile = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [imageSource, setImageSource] = useState<
    AvatarProps["src"] | undefined
  >("/tom.jpg");

  const handleChangeSource = (selectedFile: File) => {
    setImageSource(selectedFile);
  };
  console.log(resolvedTheme, "resolvedTheme");
  const handleChange = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-center items-center w-full">
        <Avatar
          src={imageSource}
          alt="Avatar"
          width={100}
          height={100}
          variant="circle"
          emptyLabel={<p className="rtl">انتخاب تصویر ...</p>}
          changeLabel={<p className="rtl">تعویض تصویر ...</p>}
          loadingLabel={<p className="rtl">بارگیری ...</p>}
          style={{ width: 100, height: 100 }}
          onChange={handleChangeSource}
        />
        <p className="text-dark_gray700 mt-[16px] font-[500] text-[14px] dark:text-grayIron50">
          بهادر محمدحسینی
        </p>
        <div className="w-full flex items-center flex-col mt-[40px] gap-[8px]">
          <div onClick={() => handleChange()} className="flex justify-between items-center h-[48px] w-full rounded-[6px] bg-[#f3f3f3] py-[12px] px-[16px] rtl dark:bg-[#161b26]">
            <div className="flex items-center gap-[8px]">
              <Image
                src={resolvedTheme === "light" ? Sun : SunDark}
                alt="sun"
              />
              <p className="font-[400] text-dark_gray600 dark:text-grayIron50">
                تغییر حالت
              </p>
            </div>
            <Switch
              onChange={handleChange}
              checked={resolvedTheme === "dark" ? true : false}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#236cff"
              height={22}
              width={36}
            />
          </div>
          {/* <div className="flex justify-between  items-center h-[48px] gap-[8px] w-full rounded-[6px] bg-[#f3f3f3] py-[12px] px-[16px] rtl">
            <div className="flex items-center gap-[8px]">
              <Image src={Password} alt="sun" />
              <p className="font-[400] text-dark_gray600">تغییر رمز</p>
            </div>
            <Image src={Arrow} alt="arrow" />
          </div>
          <div className="flex justify-between  items-center h-[48px] gap-[8px] w-full rounded-[6px] bg-[#f3f3f3] py-[12px] px-[16px] rtl">
            <div className="flex items-center gap-[8px]">
              <Image src={Comments} alt="sun" />
              <p className="font-[400] text-dark_gray600">نظرات و ثبت نظر</p>
            </div>
            <Image src={Arrow} alt="arrow" />
          </div> */}

          <div
            className="flex justify-between  items-center h-[48px] gap-[8px] w-full rounded-[6px] bg-[#f3f3f3] py-[12px] px-[16px] rtl dark:bg-[#161b26]"
            onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
          >
            <div className="flex items-center gap-[8px]">
              <Image src={Logout} alt="sun" />
              <p className="font-[400] text-dark_gray600 dark:text-error600">
                خروج از حساب
              </p>
            </div>
            <Image
              src={resolvedTheme === "light" ? Arrow : ArrowDark}
              alt="arrow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
