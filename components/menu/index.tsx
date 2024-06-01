"use client";
import { usePathname } from "next/navigation";
import { Qr, Home, Profile } from "./svg";
import Link from "next/link";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import Rodal from "rodal";
import QRScanner from "./qr";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const qrScanner = open ? <QRScanner show={open} /> : null;
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  if (path === "/login") {
    return null;
  }
  return (
    <footer className="flex-shrink-0 flex absolute justify-between text-black bg-baseWhite w-full bottom-0 shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.25)] h-[48px] rounded-[10px_10px_0px_0px] py-[10px] px-[24px]">
      <Link className="contents" href="/">
        <div className="flex flex-col justify-end items-center relative">
          <div
            className={`bg-bulutBrand500 w-[4px] h-[4px] rounded-[100%] absolute top-[0px] left-[50%] ml-[-2px] ${
              path === "/" ? "opacity-100" : "opacity-0"
            }`}
          />
          {Home(path === "/")}
        </div>
      </Link>
      <div
        className="flex flex-col justify-end items-center relative"
        onClick={() => onOpenModal()}
      >
        {Qr(path === "/qr")}
      </div>
      <Link className="contents" href="/profile">
        <div className="flex flex-col justify-end items-center relative">
          <div
            className={`bg-bulutBrand500 w-[4px] h-[4px] rounded-[100%] absolute top-[0px] left-[50%] ml-[-2px] ${
              path === "/profile" ? "opacity-100" : "opacity-0"
            }`}
          />
          {Profile(path === "/profile")}
        </div>
      </Link>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        closeIcon={false}
        showCloseIcon={false}
      >
        <Rodal width={280} visible={open} onClose={onCloseModal} animation="zoom" className="w-full">
          {qrScanner}
        </Rodal>
      </Modal>
    </footer>
  );
};

export default Menu;
