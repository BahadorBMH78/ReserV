"use client";
// import "moment-timezone";
import TableSvg from "@/public/table.svg";
import Image from "next/image";
import Smile from "@/public/smile.svg";

const Table = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full">
        <p className="text-bulutBrand500 font-[500] text-[14px]">00:09:26</p>
        <p className="text-grayText font-[500] text-[12px]">
          یکم دیگه صبر کنی یه جا خالی میشه
        </p>
      </div>
      <div className="border-[1px] mt-[16px]" />
      <div className="flex flex-col items-center justify-center h-full mt-[32px] main_height relative">
        <Image
          src={TableSvg}
          alt="Table"
          className="object-contain h-full flex-1"
        />
      </div>
      <div className="h-[40px] bg-warning100 w-full mt-[20px] rounded-[8px] gap-[10px] flex justify-center items-center">
        <p className="text-warning600 font-[500] text-[14px]">
          میتونی بری ناهار بخوری بهادر جان!
        </p>
        <Image src={Smile} alt="Smile" />
      </div>
    </div>
  );
};

export default Table;
