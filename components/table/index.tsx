"use client";
import TableSvg from "@/public/table.svg";
import TableDarkSvg from "@/public/table-dark.svg";
import Image from "next/image";
import Smile from "@/public/smile.svg";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Table = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="flex flex-col w-full">
      <div className="p-[15px] dark:bg-[#161b26] rounded-[8px]">
        <div className="flex justify-between items-center w-full">
          <p className="text-bulutBrand500 font-[500] text-[14px] dark:text-[#8ec0ff]">
            00:09:26
          </p>
          <p className="text-grayText font-[500] text-[12px] dark:text-grayIron50">
            یکم دیگه صبر کنی یه جا خالی میشه
          </p>
        </div>
        <div className="border-[1px] mt-[16px] dark:border-transparent" />
        <div className="flex flex-col items-center justify-center h-full mt-[32px] main_height relative">
          <Image
            src={resolvedTheme === "light" ? TableSvg : TableDarkSvg}
            alt="Table"
            className="object-contain h-full flex-1"
          />
        </div>
      </div>
      <div className="h-[40px] bg-warning100 w-full mt-[8px] rounded-[8px] gap-[10px] flex justify-center items-center">
        <p className="text-warning600 font-[500] text-[14px]">
          میتونی بری ناهار بخوری بهادر جان!
        </p>
        <Image src={Smile} alt="Smile" />
      </div>
    </div>
  );
};

export default Table;
