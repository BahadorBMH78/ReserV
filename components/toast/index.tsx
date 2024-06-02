import Image from "next/image";
import Close from "@/public/close.svg";

const Toast = ({ closeToast, toastProps, message }: any) => {
  return (
    <div className="flex items-center p-[16px] h-full justify-between">
      <p className="text-[#0c111d]">{message}</p>
      <Image src={Close} alt="Close" onClick={closeToast} />
    </div>
  );
};

export default Toast;
