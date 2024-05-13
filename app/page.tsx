import Image from "next/image";
import Scheduler from "@/components/scheduler";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8">
      <Scheduler />
    </main>
  );
}
