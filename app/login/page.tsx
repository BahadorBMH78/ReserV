import Card from "@/components/card";
import Image from "next/image";
import Vector from "@/public/vector.svg";
import LoginForm from "@/components/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SessionType } from "@/types/user";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Login = async () => {
  const session: SessionType | null = await getServerSession(authOptions);
  if (session && session.user.token) redirect("/");
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
