"use client";
import Image from "next/image";
import BulutIcon from "@/public/bulut.svg";
import BulutDarkIcon from "@/public/bulut-dark.svg";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Qr from "@/public/qr.svg"

const Header = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (path === "/login") return null;
  if (!mounted) {
    return null;
  }
  return (
    <div className="px-[24px] pt-[32px] flex-shrink-0">
      <header className="flex justify-between items-center">
        <Image
          src={resolvedTheme === "light" ? BulutIcon : BulutDarkIcon}
          alt="bulutIcon"
        />
        <div className="bg-bulutBrand500 rounded-[8px] w-[24px] h-[24px] flex items-center justify-center">
          <Image src={Qr} alt="Qr" />
        </div>
      </header>
    </div>
  );
};

export default Header;
