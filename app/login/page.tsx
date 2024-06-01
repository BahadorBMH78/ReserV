import Card from "@/components/card";
import Image from "next/image";
import Vector from "@/public/vector.svg";
import LoginForm from "@/components/login";

const Login = () => {
  return (
    <main className="flex justify-center w-full relative h-[calc(100svh-64px)]">
      <div className="max-w-[450px] w-full flex flex-col items-center h-full">
        <Image src={Vector} className="mt-0" alt="bulut" />
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
