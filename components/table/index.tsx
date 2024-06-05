"use client";
import Image from "next/image";
import Smile from "@/public/smile.svg";
import Angry from "@/public/angry.svg";
import Happy from "@/public/happy.svg";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import io from "socket.io-client";
import { api } from "@/app/api/api";
import { SeatType, TimerType } from "@/types/seats";
import AnimationLight from "@/public/Animation - light.json";
import AnimationDark from "@/public/Animation - light.json";
import Animation from "@/public/loader.json";
import Lottie from "react-lottie";
import { table, tableDark } from "./svg";
import moment from "moment";
import { useSession } from "next-auth/react";
import { SessionType } from "@/types/next-auth";
import PrimaryBtn from "../button";

const SOCKET_SERVER_URL = api;

const Table = () => {
  const { data: client } = useSession();
  const session = client?.user as SessionType | undefined;
  const { resolvedTheme } = useTheme();
  ////////////////////////////////////////////////////////////////// hooks and var //////////////////////////////////////////////////////////////////////////
  let defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: resolvedTheme === "light" ? AnimationLight : Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [error, setError] = useState("");
  const [self, setSelf] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [randNums, setRandNums] = useState<number[]>([]);
  const [seats, setSeats] = useState<SeatType[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimerType>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  ////////////////////////////////////////////////////////////////// useEFffects //////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setMounted(true);
    defaultOptions.animationData =
      resolvedTheme === "light" ? AnimationLight : Animation;
  }, [resolvedTheme]);

  useEffect(() => {

      const socket = io(SOCKET_SERVER_URL);

      if (socket.connected) {
        setLoading(false);
      }

      socket.on("connect", () => {
        setLoading(false); // Set loading to false when connection is successful
      });

      socket.emit("requestSeatData");

      socket.on("seatData", (data) => {
        setLoading(false);
        console.log("Real-time seat data:", data);
        setSeats(data);
        let check = data.some(
          (item: SeatType) => item.username === session?.username
        );
        console.log(data, check)
        if (check) {
          setSelf(true);
        } else {
          setSelf(false);
        }
      });

      socket.on("seatDataError", (errorMessage) => {
        console.error(errorMessage);
        setError(errorMessage);
        setLoading(false); // Set loading to false when an error occurs
      });

      return () => {
        socket.disconnect();
      };
    
  }, []);

  useEffect(() => {
    if (seats.length > 0 && seats[0].endTime) {
      const initializeTimer = () => {
        const currentTime = moment().valueOf();
        setTimeLeft(calculateTimeLeft(seats[0].endTime, currentTime));
      };

      initializeTimer();

      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft: TimerType) => {
          const updatedTimeLeft = calculateTimeLeft(
            seats[0].endTime,
            prevTimeLeft.referenceTime! + 1000
          );
          return {
            ...updatedTimeLeft,
            referenceTime: prevTimeLeft.referenceTime! + 1000,
          };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [seats]);

  useEffect(() => {
    if (seats.length > 0) {
      let uniqueRandomIntArray: any = generateUniqueRandomIntArray(
        0,
        seats.length,
        seats.length
      );
      setRandNums(uniqueRandomIntArray);
    } else {
      setRandNums([]);
    }
  }, [seats]);

  ////////////////////////////////////////////////////////////////// functions //////////////////////////////////////////////////////////////////////////

  function calculateTimeLeft(
    endTime: string,
    referenceTime: number
  ): TimerType {
    if (!endTime) return { hours: 0, minutes: 0, seconds: 0, referenceTime };

    const end = moment(endTime).valueOf();
    const difference = end - referenceTime;

    let timeLeft: TimerType;

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        referenceTime: referenceTime,
      };
    } else {
      timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        referenceTime: referenceTime,
      };
    }

    return timeLeft;
  }

  function getRandomIntInclusive(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Function to generate an array of unique random integers
  function generateUniqueRandomIntArray(
    min: number,
    max: number,
    length: number
  ) {
    if (max - min + 1 < length) {
      throw new Error(
        "Range is too small to generate the required number of unique random numbers."
      );
    }

    const randomSet = new Set();
    while (randomSet.size < length) {
      randomSet.add(getRandomIntInclusive(min, max));
    }
    return Array.from(randomSet);
  }
  // console.log(uniqueRandomIntArray, "randomIntArray");

  ////////////////////////////////////////////////////////////////// render //////////////////////////////////////////////////////////////////////////

  if (!mounted) {
    return null;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="p-[15px] bg-[#f6f6f6] dark:bg-[#161b26] rounded-[8px] main_height_container">
        {!self ? (
          <>
            <div className="flex justify-between items-center w-full">
              <p className="text-bulutBrand500 font-[500] text-[14px] dark:text-[#8ec0ff]">
                {`${timeLeft.hours
                  .toString()
                  .padStart(2, "0")}:${timeLeft.minutes
                  .toString()
                  .padStart(2, "0")}:${timeLeft.seconds
                  .toString()
                  .padStart(2, "0")}`}
              </p>
              <p className="text-grayText font-[500] text-[12px] dark:text-grayIron50">
                یکم دیگه صبر کنی یه جا خالی میشه
              </p>
            </div>
            <div className="border-[1px] mt-[16px] dark:border-transparent" />
            <div className="flex flex-col items-center justify-center h-full mt-[32px] main_height relative">
              {/* <Image
            src={resolvedTheme === "light" ? TableSvg : TableDarkSvg}
            alt="Table"
            className="object-contain h-full flex-1"
          /> */}
              {resolvedTheme === "light"
                ? table(randNums)
                : tableDark(randNums)}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full mt-[32px] main_height relative">
            <div className="h-[220px] flex flex-col items-center">
              <p className="rtl font-[500] dark:text-[#dfdfdf]">
                زمان تموم شدن ناهارت!
              </p>
              <p className="rtl font-[500] dark:text-bulutBrand500 mt-[16px]">
                {`${timeLeft.hours
                  .toString()
                  .padStart(2, "0")}:${timeLeft.minutes
                  .toString()
                  .padStart(2, "0")}:${timeLeft.seconds
                  .toString()
                  .padStart(2, "0")}`}
              </p>
              <div id="animation" className="w-[250px] h-[250px]">
                <Lottie
                  options={defaultOptions}
                  height={"100%"}
                  width={"100%"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {!self ? (
        <div
          className={`h-[40px] ${
            seats.length >= 10
              ? "#fee4e2"
              : seats.length > 5
              ? "bg-warning100"
              : "bg-bulutBrand100"
          } w-full mt-[8px] rounded-[8px] gap-[10px] flex justify-center items-center`}
        >
          {seats.length >= 10 ? (
            <>
              {" "}
              <p className="text-warning600 font-[500] text-[14px] rtl">
                بهادر وضعیت آشپزخونه داغونه!
              </p>
              <Image src={Angry} alt="Angry" />
            </>
          ) : seats.length > 5 ? (
            <>
              {" "}
              <p className="text-warning600 font-[500] text-[14px] rtl">
                میتونی بری ناهار بخوری بهادر جان!
              </p>
              <Image src={Smile} alt="Smile" />
            </>
          ) : (
            <>
              {" "}
              <p className="text-warning600 font-[500] text-[14px] rtl">
                وقت ناهاره بهادر جان!
              </p>
              <Image src={Happy} alt="Happy" />
            </>
          )}
        </div>
      ) : (
        <div className="w-full h-full relative mt-[10px]">
          <PrimaryBtn title="تموم شدم" onClick={() => console.log("hi")} loading={false} />
        </div>
      )}
      {/* <Lottie  options={defaultOptions} height={50} width={50} /> */}
    </div>
  );
};

export default Table;
