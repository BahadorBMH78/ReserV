"use client";
import { Avatar, AvatarProps } from "@files-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Sun from "@/public/sun.svg";
import SunDark from "@/public/sun-dark.svg";
// import Password from "@/public/password-lock.svg";
// import Comments from "@/public/comments.svg";
import Logout from "@/public/logout.svg";
import { useSession } from "next-auth/react";
import { SessionType } from "@/types/next-auth";
import Switch from "react-switch";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { api } from "@/app/api/api";
import { useProfilePic } from "@/hooks/useMutations";
import { toast } from "react-toastify";
import Toast from "../toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  ////////////////////////////////////////// hooks ////////////////////////////
  const router = useRouter();
  const { data: client } = useSession();
  const session = client?.user as SessionType | undefined;
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [imageSource, setImageSource] = useState<
    AvatarProps["src"] | undefined
  >();

  // Use local state to force re-render
  const [imageKey, setImageKey] = useState(0);

  ////////////////////////////////////////// queries and mutations ////////////////////////////
  const { mutate, isSuccess, isError, isLoading, error }: any = useProfilePic();
  ////////////////////////////////////////// functions ////////////////////////////

  const handleChangeSource = (selectedFile: File) => {
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);
    mutate(formData);
  };
  const handleChange = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  ////////////////////////////////////////// useEffects ////////////////////////////

  useEffect(() => {
    setMounted(true);
    setImageSource(`${api}uploads/profilePicture/${session?.id}`);
  }, []);
  useEffect(() => {
    if (isSuccess) {
      const uniqueParam = `?t=${new Date().getTime()}`;
      setImageSource(
        `${api}uploads/profilePicture/${session?.id}${uniqueParam}`
      );
      console.log("sadasd");
      window.location.reload();
      toast(<Toast message="تصویر پروفایل شما با موفقیت تغییر یافت." />, {
        bodyStyle: {
          background: "#E2FEE4",
          border: "1px solid #38F044",
          borderRadius: "6px",
          height: 50,
          fontFamily: "Kalameh",
        },
        autoClose: 3000,
      });
    }
  }, [isSuccess, session?.id]);
  useEffect(() => {
    if (isError) {
      toast(<Toast message="مشکلی در آپلود تصویر بوجود آمده است." />, {
        bodyStyle: {
          background: "#fee4e2",
          border: "1px solid #f04438",
          borderRadius: "6px",
          height: 50,
          fontFamily: "Kalameh",
          width: "100%",
        },
        autoClose: 3000,
      });
    }
  }, [isError]);

  console.log(session);

  ////////////////////////////////////////// render ////////////////////////////

  if (!mounted) {
    return null;
  }
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-center items-center w-full">
        <Avatar
          key={imageKey}
          isLoading={isLoading}
          src={imageSource}
          onError={() =>
            setImageSource(
              resolvedTheme === "light"
                ? "/defAvatarLight.svg"
                : "/defAvatar.svg"
            )
          }
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
          {session?.firstname} {session?.lastname}
        </p>
        <div className="w-full flex items-center flex-col mt-[40px] gap-[8px]">
          <div
            onClick={() => handleChange()}
            className="flex justify-between items-center h-[48px] w-full rounded-[6px] bg-[#f3f3f3] py-[12px] px-[16px] rtl dark:bg-[#161b26] cursor-pointer"
          >
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
            className="flex justify-between  items-center h-[48px] gap-[8px] w-full rounded-[6px] bg-[#f3f3f3] py-[12px] px-[16px] rtl dark:bg-[#161b26] cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
          >
            <div className="flex items-center gap-[8px]">
              <Image src={Logout} alt="sun" />
              <p className="font-[400] text-dark_gray600 dark:text-error600">
                خروج از حساب
              </p>
            </div>
            {/* <Image
              src={resolvedTheme === "light" ? Arrow : ArrowDark}
              alt="arrow"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
