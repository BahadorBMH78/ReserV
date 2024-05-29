"use client";
import Image from "next/image";
import BulutIcon from "@/public/bulut.svg";

const Header = () => {
  return (
    <header className="flex justify-center mb-[32px] items-center">
      <Image src={BulutIcon} alt="bulutIcon" />
    </header>
  );
};

export default Header;
