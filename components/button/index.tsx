import { BtnType } from "@/types/button";
const PrimaryBtn = ({ title, onClick }: BtnType) => {
  return (
    <button
      onClick={() => onClick()}
      className="h-[48px] w-full bg-bluePrimary rounded-[8px] flex items-center justify-center"
    >
      <p className="text-[#fff] font-[600] text-[14px]">{title}</p>
    </button>
  );
};

export default PrimaryBtn;
