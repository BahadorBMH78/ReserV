"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ReactNode, createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SeatType } from "@/types/seats";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // retry after 3times error
      suspense: false,
      cacheTime: 0, // 1 day cache time
      staleTime: Infinity,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});

type Props = {
  children: ReactNode;
  session?: any;
};

export const MyContext = createContext<any>(undefined);

export function Providers({ children, session }: Props) {
  const [seats, setSeats] = useState<SeatType[]>([]);
  const [self, setSelf] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MyContext.Provider value={{ seats, setSeats, setSelf, self, queue, setQueue }}>
            {children}
          </MyContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
