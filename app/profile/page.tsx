import React from "react";
import ProfilePage from "@/components/profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { SessionType } from "@/types/user";

const Profile = async () => {
  const session: SessionType | null = await getServerSession(authOptions);
  if (!session || !session.user.token) redirect("/login");
  return (
    <main className="flex flex-col items-center justify-between sm:px-8">
      <ProfilePage />
    </main>
  );
};

export async function generateHeaders() {
  return [
    {
      key: "Cache-Control",
      value: "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
    {
      key: "Pragma",
      value: "no-cache",
    },
    {
      key: "Expires",
      value: "0",
    },
  ];
}

export default Profile;
