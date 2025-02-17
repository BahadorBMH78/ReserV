import { BtnType } from "@/types/button";
const PrimaryBtn = ({ title, onClick, loading, type }: BtnType) => {
  console.log(type, "type")
  return (
    <button
      onClick={() => onClick && onClick()}
      disabled={loading}
      type={type}
      className="h-[48px] w-full bg-bluePrimary rounded-[8px] flex items-center justify-center"
    >
      {loading ? (
        <div className="loader"></div>
      ) : (
        <p className="text-[#fff] font-[600] text-[14px]">{title}</p>
      )}
    </button>
  );
};

export default PrimaryBtn;
