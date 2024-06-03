import Table from "@/components/table";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SessionType } from "@/types/user";

export default async function Home() {
  // const session: SessionType | null = await getServerSession(authOptions);
  // if (!session || !session.user.token) redirect("/login");
  return (
    <main className="flex flex-col items-center justify-between sm:px-8">
      <Table />
    </main>
  );
}
