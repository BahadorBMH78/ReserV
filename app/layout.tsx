import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Menu from "@/components/menu";
import "react-modern-drawer/dist/index.css";
import { Providers } from "./providers";
import "react-responsive-modal/styles.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export const metadata: Metadata = {
  title: "ReserV",
  description: "ReserV App",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: any = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className="bg-white dark:bg-black">
        <Providers session={session}>
          <Header />
          <main className="px-[24px] pb-[32px] pt-[20px] flex-1 overflow-auto select-none">
            {children}
            <ToastContainer
              closeButton={false}
              hideProgressBar
              position="top-center"
              rtl
              className="w-full sm:w-full sm:max-w-[450px]"
              style={{ width: "100%" }}
            />
          </main>
          <Menu />
        </Providers>
      </body>
    </html>
  );
}
