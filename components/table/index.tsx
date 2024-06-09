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
import Animation from "@/public/loader.json";
import Lottie from "react-lottie";
import { table, tableDark } from "./svg";
import moment from "moment";
import { useSession } from "next-auth/react";
import { SessionType } from "@/types/next-auth";
import PrimaryBtn from "../button";
import { useTerminate } from "@/hooks/useMutations";
import { toast } from "react-toastify";
import Toast from "../toast";

const SOCKET_SERVER_URL = api;

const Table = () => {
  const { data: client } = useSession();
  const session = client?.user as SessionType | undefined;
  const { resolvedTheme } = useTheme();
  ////////////////////////////////////////////////////////////////// mutations //////////////////////////////////////////////////////////////////////////

  const {
    mutate,
    data,
    isSuccess,
    isError,
    isLoading,
    error: errorInstance,
  }: any = useTerminate();

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
  const [self, setSelf] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [randNums, setRandNums] = useState<number[]>([]);
  const [seats, setSeats] = useState<SeatType[]>([]);
  const [loading, setLoading] = useState(false);
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

      const user = data.find(
        (item: SeatType) => item.username === session?.username
      );

      if (user) {
        setSelf(user);
      } else {
        setSelf(null);
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
        const serverTime = moment(seats[0].startTime).valueOf();
        const selfServerTime = self ? moment(self.startTime).valueOf() : null;
        const offsetSelf = selfServerTime ? selfServerTime - currentTime : null;
        const offset = serverTime - currentTime;
        const adjustedTime = moment().add(offset, "milliseconds").valueOf();
        const adjustedSelfTime = moment()
          .add(offsetSelf, "milliseconds")
          .valueOf();
        if (self) {
          setTimeLeft(calculateTimeLeft(self.endTime, adjustedSelfTime));
        } else {
          setTimeLeft(calculateTimeLeft(seats[0].endTime, adjustedTime));
        }
      };

      initializeTimer();

      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft: TimerType) => {
          const updatedTimeLeft = calculateTimeLeft(
            self ? self.endTime : seats[0].endTime,
            prevTimeLeft.referenceTime! + 1000
          );
          return {
            ...updatedTimeLeft,
            referenceTime: prevTimeLeft.referenceTime! + 1000,
          };
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setTimeLeft({
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  }, [seats]);

  useEffect(() => {
    if (seats.length > 0) {
      let uniqueRandomIntArray: any = generateUniqueRandomIntArray(
        0,
        seats.length - 1,
        seats.length
      );
      setRandNums(uniqueRandomIntArray);
      console.log(uniqueRandomIntArray, "rand");
    } else {
      setRandNums([]);
    }
  }, [seats]);

  useEffect(() => {
    if (isSuccess) {
      toast(<Toast message="تایم صرف غذای شما لغو گردید." />, {
        bodyStyle: {
          background: "#E2FEE4",
          border: "1px solid #38F044",
          borderRadius: "6px",
          height: 50,
          fontFamily: "Kalameh",
        },
        autoClose: 3000,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast(<Toast message="مشکلی در لغو تایم به وجود آمده است." />, {
        bodyStyle: {
          background: "#fee4e2",
          border: "1px solid #f04438",
          borderRadius: "6px",
          height: 50,
          fontFamily: "Kalameh",
          width: "100%",
        },
        autoClose: 3000,
      });
    }
  }, [isError]);
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

  const terminateSession = () => {
    mutate({ data: { username: session?.username } });
  };

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
            <div className="flex flex-col items-center justify-center h-full mt-[25px] main_height relative">
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
              <p className="rtl font-[500] text-bulutBrand500 dark:text-bulutBrand500 mt-[16px]">
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
            seats.length <= 5
              ? "bg-bulutBrand100"
              : seats.length > 5 && seats.length < 8
              ? "bg-warning100"
              : "bg-[#FEE4E2]"
          } w-full mt-[15px] rounded-[8px] gap-[10px] flex justify-center items-center`}
        >
          {seats.length <= 5 ? (
            <>
              {" "}
              <p className="text-warning600 font-[500] text-[14px] rtl">
                وقت ناهاره {session?.firstname} جان!
              </p>
              <Image src={Happy} alt="Happy" />
            </>
          ) : seats.length > 5 && seats.length < 8 ? (
            <>
              {" "}
              <p className="text-warning600 font-[500] text-[14px] rtl">
                میتونی بری ناهار بخوری {session?.firstname} جان!
              </p>
              <Image src={Smile} alt="Smile" />
            </>
          ) : (
            <>
              {" "}
              <p className="text-warning600 font-[500] text-[14px] rtl">
                {session?.firstname} وضعیت آشپزخونه داغونه!
              </p>
              <Image src={Angry} alt="Angry" />
            </>
          )}
        </div>
      ) : (
        <div className="w-full h-full relative mt-[15px]">
          <PrimaryBtn
            title="تموم شدم"
            onClick={() => terminateSession()}
            loading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
