"use client";
import { usePathname } from "next/navigation";
import { Home, Profile } from "./svg";
import Link from "next/link";
import { Modal } from "react-responsive-modal";
import { useContext, useEffect, useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import eruda from "eruda";
import { useReserve } from "@/hooks/useMutations";
import { useSession } from "next-auth/react";
import { SessionType } from "@/types/next-auth";
import { toast } from "react-toastify";
import Toast from "../toast";
import { signOut } from "next-auth/react";
import { useTerminate } from "@/hooks/useMutations";
import { MyContext } from "@/app/providers";
import { useEnqueue } from "@/hooks/useMutations";

const Menu = () => {
  const API = process.env.NEXT_PUBLIC_API
  ////////////////////////////////////////// hooks ///////////////////////////////////////////
  const { data: client } = useSession();
  const session = client?.user as SessionType | undefined;
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const context = useContext(MyContext);
  const { self, setSelf } = context;
  ////////////////////////////////////////// mutations ////////////////////////////////////////
  const { mutate, data, isSuccess, isError, isLoading, error }: any =
    useReserve();

  const {
    mutate: enqueueMutate,
    isSuccess: enqueueIsSuccess,
    isError: enqueueIsError,
    isLoading: enqueueIsLoading,
    error: enqueueError,
  }: any = useEnqueue();

  const {
    mutate: terminateMutate,
    isSuccess: terminateIsSuccess,
    isError: terminateIsError,
    isLoading: terminateIsLoading,
    error: errorInstance,
  }: any = useTerminate();

  ////////////////////////////////////////// functions ////////////////////////////////////////

  const onCloseModal = () => setOpen(false);

  const onResult = (result: Array<IDetectedBarcode>) => {
    if (result[0].rawValue === API + "seats/reserve") {
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
        autoClose: 3000,
      });
    }
  };

  const terminateSession = () => {
    terminateMutate({ data: { username: session?.username } });
  };

  const ajam = () => {
    if (self) {
      terminateSession();
    } else {
      enqueueMutate({ data: { username: session?.username || "" } });
    }
  };

  ////////////////////////////////////////// useEffects ////////////////////////////

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      eruda.init();
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast(<Toast message="صندلیت پر شد" />, {
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
          autoClose: 3000,
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
          autoClose: 3000,
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
          autoClose: 3000,
        });
      }
    }
  }, [isError]);

  useEffect(() => {
    if (terminateIsSuccess) {
      toast(<Toast message="صندلیت خالی شد" />, {
        bodyStyle: {
          background: "#E2FEE4",
          border: "1px solid #38F044",
          borderRadius: "6px",
          height: 50,
          fontFamily: "Kalameh",
        },
        autoClose: 3000,
      });
      setSelf(null);
    }
  }, [terminateIsSuccess]);

  useEffect(() => {
    if (terminateIsError) {
      toast(<Toast message="مشکلی در لغو تایم به وجود آمده است." />, {
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
  }, [terminateIsError]);

  useEffect(() => {
    if (enqueueIsSuccess) {
      toast(<Toast message="رفتی تو صف" />, {
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
  }, [enqueueIsSuccess]);

  useEffect(() => {
    if (enqueueIsError) {
      if (enqueueError && enqueueError.response?.status === 400) {
        toast(<Toast message="در حال حاضر تو صف هستی" />, {
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
      } else {
        toast(<Toast message="مشکلی در ارسال درخواست به وجود آمده است." />, {
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
    }
  }, [enqueueIsError]);

  ////////////////////////////////////////// render ////////////////////////////

  if (path === "/login" || path === "/error") {
    return null;
  }

  return (
    <footer className="flex-shrink-0 flex absolute justify-between text-black dark:bg-[#161b26] bg-baseWhite w-full bottom-0 shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.25)] h-[48px] rounded-[10px_10px_0px_0px] py-[10px] px-[50px]">
      <Link className="contents" href="/">
        <div className="flex flex-col justify-end items-center relative">
          <div className="w-[70px]">{Home(path === "/")}</div>
        </div>
      </Link>
      <div className="w-full flex items-center justify-center h-fit mt-[-35px]">
        <div
          className="p-[4px] shadow-[0px_-5px_10px_-6px_rgba(0,0,0,0.25)] z-50 rounded-[30px] dark:bg-[#161b26] bg-white h-full w-[131px] flex justify-center items-center relative cursor-pointer"
          onClick={() => ajam()}
        >
          {!self ? (
            <div className="w-full bg-brandColor h-[48px] rounded-[100px] flex justify-center items-center">
              {terminateIsLoading || enqueueIsLoading ? (
                <div className="loader"></div>
              ) : (
                <p className="text-white text-[14px] font-[700]">برو تو صف</p>
              )}
            </div>
          ) : (
            <div className="w-full bg-[#f04438] rtl h-[48px] rounded-[100px] flex justify-center items-center">
              {terminateIsLoading || enqueueIsLoading ? (
                <div className="loader"></div>
              ) : (
                <p className="text-white text-[14px] font-[700]">اتمام!</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Link className="contents" href="/profile">
        <div className="flex flex-col justify-end items-center relative">
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
