"use client";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { useTheme } from "next-themes";
import io from "socket.io-client";
import { api } from "@/app/api/api";
import { SeatType, TimerType } from "@/types/seats";
import AnimationLight from "@/public/Animation - light.json";
import Animation from "@/public/loader.json";
import { TableSVG } from "./svg";
import moment from "moment";
import { useSession } from "next-auth/react";
import { SessionType } from "@/types/next-auth";
import { useTerminate } from "@/hooks/useMutations";
import { toast } from "react-toastify";
import Toast from "../toast";
import ArrowDown from "@/public/arrowDown.svg";
import { MyContext } from "@/app/providers";
import Kitchen from "@/public/kitchen.svg";

const SOCKET_SERVER_URL = api;

const Table = () => {
  const { data: client } = useSession();
  const [imageError, setImageError] = useState<any>({});
  const session = client?.user as SessionType | undefined;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const context = useContext(MyContext);
  const { seats, setSeats, self, setSelf, queue, setQueue } = context;
  ////////////////////////////////////////////////////////////////// mutations //////////////////////////////////////////////////////////////////////////

  const {
    mutate,
    data,
    isSuccess,
    isError,
    isLoading,
    error: errorInstance,
  }: any = useTerminate();

  ////////////////////////////////////////////////////////////////// queries //////////////////////////////////////////////////////////////////////////
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
  // const [self, setSelf] = useState<any>(null);
  const [randNums, setRandNums] = useState<number[]>([]);
  // const [seats, setSeats] = useState<SeatType[]>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
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
      setSeats(data.seats);
      setQueue(data.queue);
      let index;
      const user = data.seats.find((item: SeatType, i: number) => {
        index = i;
        if (item.username === session?.username) {
          return item;
        }
      });
      console.log(data, "dataaa");
      if (user && index !== null && index !== undefined) {
        setSelf(data.seats[index]);
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
        const currentServerTime = moment(seats[0].startTime).valueOf();
        const currentServerTimeSelf = self
          ? moment(self.startTime).valueOf()
          : null;
        let current = moment().valueOf();
        const offset = current - currentServerTime;
        let currentTime = moment().valueOf() + offset;
        let offsetSelf = currentServerTimeSelf
          ? current - currentServerTimeSelf
          : null;
        let currentSelf = offsetSelf ? moment().valueOf() + offsetSelf : null;
        if (self && currentSelf) {
          setTimeLeft(calculateTimeLeft(self.endTime, currentSelf));
        } else {
          setTimeLeft(calculateTimeLeft(seats[0].endTime, currentTime));
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

  const handleImageError = (index: any) => {
    setImageError((prev: any) => ({ ...prev, [index]: true }));
  };

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
      <div className="p-[15px] bg-[#f6f6f6] dark:bg-[#161b26] rounded-[8px] main_height_container relative">
        <div className="flex justify-between items-center w-full">
          {/* <p className="text-bulutBrand500 font-[500] text-[14px] dark:text-[#8ec0ff]">
                {`${timeLeft.hours
                  .toString()
                  .padStart(2, "0")}:${timeLeft.minutes
                  .toString()
                  .padStart(2, "0")}:${timeLeft.seconds
                  .toString()
                  .padStart(2, "0")}`}
              </p> */}
          {queue.length > 0 ? (
            <p className="text-error600 font-[700] text-[14px] rtl">
              <span className="font-[800] text-[14px] pl-[5px]">
                {queue && queue.length}
              </span>
              نفر تو صف هستن
            </p>
          ) : (
            <p className="text-bulutBrand500 font-[700] text-[14px] dark:text-grayIron50">
              هیچکس تو صف نیست
            </p>
          )}
          <div
            className="flex items-center gap-[4px] rtl"
            onClick={() => setShow(!show)}
          >
            <p className="text-grayText font-[700] text-[14px] dark:text-grayIron50 text-center">
              آشپزخونه رو ببین
            </p>
            <Image src={ArrowDown} alt="arrow-down" className={`${show ? "rotate-180" : "rotate-0"} transition-all`} />
          </div>
        </div>
        <div className="border-[1px] mt-[16px] dark:border-transparent" />
        <div
          className={`absolute transition-all ${
            show ? "opacity-100 visible" : "opacity-0 invisible"
          } gap-[16px] overflow-auto flex flex-col z-50 top-[58px] dark:bg-black bg-white w-[calc(100%-30px)] h-[316px] left-[50%] translate-x-[-50%] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] pt-[16px] px-[16px]`}
        >
          {seats.length > 0 ? (
            seats.map((person: any, index: number) => {
              return (
                <div
                  key={index}
                  className="bg-[#f0f1f1] dark:bg-[#161b26] gap-[8px] flex items-center py-[8px] px-[16px] rtl w-full min-h-[40px] h-[40px] rounded-[8px]"
                >
                  <div className="w-[26px] h-[26px] bg-white flex items-center justify-center rounded-[100px]">
                    <Image
                      src={`/defAvatar.svg`}
                      alt="profile Pic"
                      width={24}
                      height={24}
                      onError={() => handleImageError(index)}
                      className="rounded-[100px]"
                    />
                  </div>
                  <p className="text-[#61646c] dark:text-white text-[12px] font-[400]">
                    {person.name}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="flex gap-[10px] justify-center relative w-full h-full items-center">
              <p className="text-center text-[#cecfd2] text-[14px] rtl">آشپزخونه خالیه!</p>
              <Image src={Kitchen} alt="Kitchen" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center h-full mt-[25px] main_height relative">
          <TableSVG theme={resolvedTheme} seats={seats} nums={randNums} session={session} />
        </div>
      </div>
      {/* {self && (
        <div className="w-full h-full relative mt-[15px]">
          <PrimaryBtn
            title="تموم شدم"
            onClick={() => terminateSession()}
            loading={isLoading}
          />
        </div>
      )} */}
    </div>
  );
};

export default Table;
