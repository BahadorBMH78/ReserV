"use client";
import Image from "next/image";
import BulutIcon from "@/public/bulut.svg";
import BulutDarkIcon from "@/public/bulut-dark.svg";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
      <header className="flex justify-center items-center">
        <Image
          src={resolvedTheme === "light" ? BulutIcon : BulutDarkIcon}
          alt="bulutIcon"
        />
      </header>
    </div>
  );
};

export default Header;
