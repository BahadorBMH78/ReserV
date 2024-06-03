"use client";
import { usePathname } from "next/navigation";
import { Qr, Home, Profile } from "./svg";
import Link from "next/link";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import eruda from 'eruda';

const Menu = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    eruda.init()
  }, [])

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
        className="flex flex-col justify-end items-center relative"
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
        <div className="w-full h-full flex fle-col items-center justify-center" id="qrContainer">
          <Scanner
            constraints={{ facingMode: "environment" }}
            scanDelay={2000}
            onScan={(result) => console.log(result)}
            styles={{video: { border: "5px solid red"}}}
          />
        </div>
      </Modal>
    </footer>
  );
};

export default Menu;
