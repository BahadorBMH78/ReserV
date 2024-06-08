"use client";
import { usePathname } from "next/navigation";
import { Qr, Home, Profile } from "./svg";
import Link from "next/link";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import eruda from "eruda";
import { useReserve } from "@/hooks/useMutations";
import { useSession } from "next-auth/react";
import { SessionType } from "@/types/next-auth";
import { api } from "@/app/api/api";
import { toast } from "react-toastify";
import Toast from "../toast";
import { signOut } from "next-auth/react";

const Menu = () => {
  ////////////////////////////////////////// hooks ////////////////////////////
  const { data: client } = useSession();
  const session = client?.user as SessionType | undefined;
  const [open, setOpen] = useState(false);
  const path = usePathname();
  ////////////////////////////////////////// mutations ////////////////////////////
  const { mutate, data, isSuccess, isError, isLoading, error }: any =
    useReserve();

  ////////////////////////////////////////// functions ////////////////////////////

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onResult = (result: Array<IDetectedBarcode>) => {
    if (result[0].rawValue === api + "seats/reserve") {
      console.log(api + "seats/reserve")
      mutate({ data: { username: session?.username || "" } });
      setOpen(false);
    } else {
      setOpen(false);
      toast(<Toast message="کد اسکن شده با کد آشپزخانه تطابق ندارد" />, {
        bodyStyle: {
          background: "#fee4e2",
          border: "1px solid #f04438",
          borderRadius: "6px",
          height: 50,
          fontFamily: "Kalameh",
          width: "100%",
        },
        autoClose: 1500,
      });
    }
  };

  ////////////////////////////////////////// useEffects ////////////////////////////

  useEffect(() => {

      eruda.init();
    
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast(<Toast message="صندلی با موفقیت رزرو شد" />, {
        bodyStyle: {
          background: "#E2FEE4",
          border: "1px solid #38F044",
          borderRadius: "6px",
          height: 50,
          fontFamily: "Kalameh",
        },
        autoClose: 1500,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error.response.status === 400) {
        toast(<Toast message="در حال حاضر صندلی رزر شده دارید." />, {
          bodyStyle: {
            background: "#fee4e2",
            border: "1px solid #f04438",
            borderRadius: "6px",
            height: 50,
            fontFamily: "Kalameh",
            width: "100%",
          },
          autoClose: 1500,
        });
      } else if (error.response.status === 404) {
        toast(<Toast message="کاربر با این شناسه وجود ندارد" />, {
          bodyStyle: {
            background: "#fee4e2",
            border: "1px solid #f04438",
            borderRadius: "6px",
            height: 50,
            fontFamily: "Kalameh",
          },
          autoClose: 1500,
        });
        signOut({ callbackUrl: "/login", redirect: true });
      } else {
        toast(<Toast message="خطای سرور. با دولوپر اپ تماس بگیرین" />, {
          bodyStyle: {
            background: "#fee4e2",
            border: "1px solid #f04438",
            borderRadius: "6px",
            height: 50,
            fontFamily: "Kalameh",
          },
          autoClose: 1500,
        });
      }
    }
  }, [isError]);

  ////////////////////////////////////////// render ////////////////////////////

  if (path === "/login" || path === "/error") {
    return null;
  }

  return (
    <footer className="flex-shrink-0 flex absolute justify-between text-black dark:bg-[#161b26] bg-baseWhite w-full bottom-0 shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.25)] h-[48px] rounded-[10px_10px_0px_0px] py-[10px] px-[24px]">
      <Link className="contents" href="/">
        <div className="flex flex-col justify-end items-center relative">
          <div
            className={`bg-bulutBrand500 w-[4px] h-[4px] rounded-[100%] absolute top-[0px] left-[12px] ml-[-2px] ${
              path === "/" ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="w-[70px]">{Home(path === "/")}</div>
        </div>
      </Link>
      <div
        className="flex flex-col justify-end items-center relative sm:opacity-50 sm:pointer-events-none"
        onClick={onOpenModal}
      >
        <div className="w-[70px] flex justify-center">{Qr(path === "/qr")}</div>
      </div>
      <Link className="contents" href="/profile">
        <div className="flex flex-col justify-end items-center relative">
          <div
            className={`bg-bulutBrand500 w-[4px] h-[4px] rounded-[100%] absolute top-[0px] right-[9px] ml-[-2px] ${
              path === "/profile" ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="w-[70px] flex justify-end">
            {Profile(path === "/profile")}
          </div>
        </div>
      </Link>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        closeIcon={false}
        showCloseIcon={false}
      >
        <div
          className="w-full h-full flex fle-col items-center justify-center"
          id="qrContainer"
        >
          <Scanner
            constraints={{ facingMode: "environment" }}
            scanDelay={2000}
            onScan={(result) => onResult(result)}
          />
        </div>
      </Modal>
    </footer>
  );
};

export default Menu;
