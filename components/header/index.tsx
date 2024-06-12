"use client";
import Image from "next/image";
import BulutIcon from "@/public/bulut.svg";
import BulutDarkIcon from "@/public/bulut-dark.svg";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Qr from "@/public/qr.svg";
import { useReserve } from "@/hooks/useMutations";
import { Modal } from "react-responsive-modal";
import { useSession } from "next-auth/react";
import { SessionType } from "@/types/next-auth";
import { toast } from "react-toastify";
import Toast from "../toast";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { api } from "@/app/api/api";
import { signOut } from "next-auth/react";

const Header = () => {
  const { data: client } = useSession();
  const session = client?.user as SessionType | undefined;
  const { mutate, isSuccess, isError, isLoading, error }: any = useReserve();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);

  ////////////////////////////////////////// functions ////////////////////////////////////////

  const onOpenModal = () => mutate({ data: { username: session?.username || "" } });;
  const onCloseModal = () => setOpen(false);

  const onResult = (result: Array<IDetectedBarcode>) => {
    if (result[0].rawValue === api + "seats/reserve") {
      mutate({ data: { username: session?.username || "" } });
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
        autoClose: 3000,
      });
      setOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error && error.response?.status === 400) {
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
      } else if (error.response?.status === 404) {
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
      setOpen(false);
    }
  }, [isError]);
  if (path === "/login") return null;
  if (!mounted) {
    return null;
  }
  return (
    <div className="px-[24px] pt-[32px] flex-shrink-0">
      <header
        className={`flex ${
          path === "/" ? "justify-between" : "justify-center"
        } items-center sm:px-8`}
      >
        <Image
          src={resolvedTheme === "light" ? BulutIcon : BulutDarkIcon}
          alt="bulutIcon"
        />
        {path === "/" && (
          <div
            className="rounded-[8px] w-[24px] h-[24px] flex items-center justify-center"
            onClick={onOpenModal}
          >
            <Image src={Qr} alt="Qr" width={25} height={25} />
          </div>
        )}
      </header>
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
          {isLoading ? (
            <div className="Qrloader"></div>
          ) : (
            <Scanner
              constraints={{ facingMode: "environment" }}
              scanDelay={2000}
              paused={isLoading}
              onScan={(result) => onResult(result)}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Header;
