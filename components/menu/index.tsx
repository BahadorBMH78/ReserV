"use client";
import { usePathname } from "next/navigation";
import { Qr, Home, Profile } from "./svg";
import Link from "next/link";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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
        <Scanner onScan={(result) => console.log(result)} />
      </Modal>
    </footer>
  );
};

export default Menu;
