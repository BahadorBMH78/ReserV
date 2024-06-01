"use client";
import Image from "next/image";
import BulutIcon from "@/public/bulut.svg";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();
  if (path === "/login") return null;
  return (
    <div className="px-[24px] pt-[32px] flex-shrink-0">
      <header className="flex justify-center items-center">
        <Image src={BulutIcon} alt="bulutIcon" />
      </header>
    </div>
  );
};

export default Header;
