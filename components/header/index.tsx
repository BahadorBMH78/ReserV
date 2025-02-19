"use client";
import Image from "next/image";
import BulutIcon from "@/public/bulut.svg";
import BulutDarkIcon from "@/public/bulut-dark.svg";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: client } = useSession();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);

  ////////////////////////////////////////// functions ////////////////////////////////////////

  if (path === "/login") return null;
  if (!mounted) {
    return null;
  }
  return (
    <div className="px-[24px] pt-[32px] flex-shrink-0">
      <header className={`flex justify-center items-center sm:px-8`}>
        {/* <Image
          src={resolvedTheme === "light" ? BulutIcon : BulutDarkIcon}
          alt="bulutIcon"
        /> */}
        <h1 className="logo">ReserV</h1>
      </header>
    </div>
  );
};

export default Header;
