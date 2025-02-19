import Toast from "@/components/toast";
import { useReserve } from "@/hooks/useMutations";
import { SessionType } from "@/types/next-auth";
import { SeatType } from "@/types/seats";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const TableSVG = ({
  nums,
  session,
  seats,
  theme,
}: {
  nums: number[];
  session: SessionType | undefined;
  seats: SeatType[];
  theme: string | undefined;
}) => {
  const { mutate, isSuccess, isError, isLoading, error }: any = useReserve();
  const reservation = (seat: string) => {
    mutate({ data: { username: session?.username || "", seatNumber: seat } });
  };
  useEffect(() => {
    if (isSuccess) {
      toast(<Toast message="صندلی با موفقیت رزرو شد" />, {
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
      if (error && error.response?.status === 400) {
        toast(<Toast message="در حال حاضر صندلی رزر شده دارید." />, {
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
      } else if (error.response?.status === 404) {
        toast(<Toast message="کاربر با این شناسه وجود ندارد" />, {
          bodyStyle: {
            background: "#fee4e2",
            border: "1px solid #f04438",
            borderRadius: "6px",
            height: 50,
            fontFamily: "Kalameh",
          },
          autoClose: 3000,
        });
        signOut({ callbackUrl: "/login", redirect: true });
      } else {
        toast(<Toast message="خطای سرور. با دولوپر اپ تماس بگیرین" />, {
          bodyStyle: {
            background: "#fee4e2",
            border: "1px solid #f04438",
            borderRadius: "6px",
            height: 50,
            fontFamily: "Kalameh",
          },
          autoClose: 3000,
        });
      }
    }
  }, [isError]);

  const lightColor = (number: string) => {
    if (
      seats.some(
        (seat) => seat.seatNumber === number && session?.id === seat.id
      )
    )
      return "#8B5CF6";
    else if (seats.some((seat) => seat.seatNumber === number)) return "#005f56";
    else return "#949494";
  };

  const darkColor = (number: string) => {
    if (
      seats.some(
        (seat) => seat.seatNumber === number && session?.id === seat.id
      )
    )
      return "#8B5CF6";
    else if (seats.some((seat) => seat.seatNumber === number)) return "#005f56";
    else return "#353535";
  };

  if (theme === "light") {
    return (
      <svg
        width="250"
        height="490"
        viewBox="0 0 225 490"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          transform="matrix(-4.37114e-08 1 1 4.37114e-08 90.5 7.3846)"
          onClick={() => reservation("1")}
          className="cursor-pointer"
        >
          <circle
            cx="16"
            cy="21.5"
            r="24"
            fill={lightColor("1")}
            stroke="white"
            strokeWidth="2"
          />

          <text
            x="12"
            y="25.5"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="white"
            transform="scale(-1,1) translate(-24,0) rotate(90 12 21.5)"
          >
            1
          </text>
        </g>
        <g
          transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 126)"
          onClick={() => reservation("2")}
          className="cursor-pointer"
        >
          <circle
            cx="0"
            cy="21.5"
            r="24"
            fill={lightColor("2")}
            stroke="white"
            strokeWidth="2"
          />

          <text
            x="0"
            y="21.5"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="white"
            transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
          >
            2
          </text>
        </g>
        <g
          transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 219.333)"
          onClick={() => reservation("3")}
          className="cursor-pointer"
        >
          <circle
            cx="0"
            cy="21.5"
            r="24"
            fill={lightColor("3")}
            stroke="white"
            strokeWidth="2"
          />

          <text
            x="0"
            y="21.5"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="white"
            transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
          >
            3
          </text>
        </g>
        {/* <g onClick={() => reservation("2")}>
                      <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 126)" fill={seats.some((seat: SeatType) => seat.seatNumber === "2") ? "#005f56" : "#949494"} stroke="white"/>
                      <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 119.4)" fill={seats.some((seat: SeatType) => seat.seatNumber === "2") ? "#005f56" : "#949494"} stroke="white"/>
                  </g> */}
        <g
          transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 312.667)"
          onClick={() => reservation("4")}
          className="cursor-pointer"
        >
          <circle
            cx="0"
            cy="21.5"
            r="24"
            fill={lightColor("4")}
            stroke="white"
            strokeWidth="2"
          />

          <text
            x="0"
            y="21.5"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="white"
            transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
          >
            4
          </text>
        </g>
        <g
          transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 406)"
          onClick={() => reservation("5")}
          className="cursor-pointer"
        >
          <circle
            cx="0"
            cy="21.5"
            r="24"
            fill={lightColor("5")}
            stroke="white"
            strokeWidth="2"
          />

          <text
            x="0"
            y="21.5"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="white"
            transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
          >
            5
          </text>
        </g>
        <rect
          id="food-table"
          x="39"
          y="52"
          width="147"
          height="385"
          rx="16"
          fill="#D9D9D9"
        />
        <g
          transform="matrix(1 0 0 -1 216.846 125)"
          onClick={() => reservation("10")}
          className="cursor-pointer"
        >
          <circle
            cx="0"
            cy="21.5"
            r="24"
            fill={lightColor("10")}
            stroke="white"
            strokeWidth="2"
          />

          <text
            x="0"
            y="21.5"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="white"
            transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
          >
            10
          </text>
        </g>
        <g
          transform="matrix(-1 0 0 -1 216.846 218.0)"
          onClick={() => reservation("9")}
          className="cursor-pointer"
        >
          <circle
            cx="0"
            cy="21.5"
            r="24"
            fill={lightColor("9")}
            stroke="white"
            strokeWidth="2"
          />

          <text
            x="0"
            y="21.5"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="white"
            transform="scale(1,1) translate(-24,0) rotate(180 12 21.5)"
          >
            9
          </text>
        </g>
        <g
          transform="matrix(-1 0 0 -1 216.846 312.0)"
          onClick={() => reservation("8")}
          className="cursor-pointer"
        >
          <circle
            cx="0"
            cy="21.5"
            r="24"
            fill={lightColor("8")}
            stroke="white"
            strokeWidth="2"
          />

          <text
            x="0"
            y="21.5"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="white"
            transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
          >
            8
          </text>
        </g>
        <g
          transform="matrix(-1 0 0 -1 216.846 406.0)"
          onClick={() => reservation("7")}
          className="cursor-pointer"
        >
          <circle
            cx="0"
            cy="21.5"
            r="24"
            fill={lightColor("7")}
            stroke="white"
            strokeWidth="2"
          />

          <text
            x="0"
            y="21.5"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="white"
            transform="scale(1,1) translate(-24,0) rotate(180 12 21.5)"
          >
            7
          </text>
        </g>
        <g
          transform="matrix(-4.37114e-08 1 1 4.37114e-08 90.5 470.3846)"
          onClick={() => reservation("6")}
          className="cursor-pointer"
        >
          <circle
            cx="-5"
            cy="21.5"
            r="24"
            fill={lightColor("6")}
            stroke="white"
            strokeWidth="2"
          />

          <text
            x="0"
            y="17.5"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="white"
            transform="scale(-1,1) translate(-24,0) rotate(90 12 32.5)"
          >
            6
          </text>
        </g>
      </svg>
    );
  }
  return (
    <svg
      width="250"
      height="490"
      viewBox="0 0 225 490"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 90.5 7.3846)"
        onClick={() => reservation("1")}
        className="cursor-pointer"
      >
        <circle
          cx="17"
          cy="21.5"
          r="24"
          fill={darkColor("1")}
          stroke="white"
          strokeWidth="2"
        />

        <text
          x="12"
          y="21.5"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
          transform="scale(-1,1) translate(-28,0) rotate(90 12 21.5)"
        >
          1
        </text>
      </g>
      <g
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 126)"
        onClick={() => reservation("2")}
        className="cursor-pointer"
      >
        <circle
          cx="0"
          cy="21.5"
          r="24"
          fill={darkColor("2")}
          stroke="white"
          strokeWidth="2"
        />

        <text
          x="0"
          y="21.5"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
          transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
        >
          2
        </text>
      </g>
      <g
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 219.333)"
        onClick={() => reservation("3")}
        className="cursor-pointer"
      >
        <circle
          cx="0"
          cy="21.5"
          r="24"
          fill={darkColor("3")}
          stroke="white"
          strokeWidth="2"
        />

        <text
          x="0"
          y="21.5"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
          transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
        >
          3
        </text>
      </g>
      {/* <g onClick={() => reservation("2")}>
                      <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 126)" fill={seats.some((seat: SeatType) => seat.seatNumber === "2") ? "#005f56" : "#949494"} stroke="white"/>
                      <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 119.4)" fill={seats.some((seat: SeatType) => seat.seatNumber === "2") ? "#005f56" : "#949494"} stroke="white"/>
                  </g> */}
      <g
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 312.667)"
        onClick={() => reservation("4")}
        className="cursor-pointer"
      >
        <circle
          cx="0"
          cy="21.5"
          r="24"
          fill={darkColor("4")}
          stroke="white"
          strokeWidth="2"
        />

        <text
          x="0"
          y="21.5"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
          transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
        >
          4
        </text>
      </g>
      <g
        className="cursor-pointer"
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 406)"
        onClick={() => reservation("5")}
      >
        <circle
          cx="0"
          cy="21.5"
          r="24"
          fill={darkColor("5")}
          stroke="white"
          strokeWidth="2"
        />

        <text
          x="0"
          y="21.5"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
          transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
        >
          5
        </text>
      </g>
      <rect
        id="food-table"
        x="39"
        y="52"
        width="147"
        height="385"
        rx="16"
        fill="#D9D9D9"
      />
      <g
        className="cursor-pointer"
        transform="matrix(1 0 0 -1 216.846 125)"
        onClick={() => reservation("10")}
      >
        <circle
          cx="0"
          cy="21.5"
          r="24"
          fill={darkColor("10")}
          stroke="white"
          strokeWidth="2"
        />

        <text
          x="0"
          y="21.5"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
          transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
        >
          10
        </text>
      </g>
      <g
        className="cursor-pointer"
        transform="matrix(-1 0 0 -1 216.846 218.0)"
        onClick={() => reservation("9")}
      >
        <circle
          cx="0"
          cy="21.5"
          r="24"
          fill={darkColor("9")}
          stroke="white"
          strokeWidth="2"
        />

        <text
          x="0"
          y="21.5"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
          transform="scale(1,1) translate(-24,0) rotate(180 12 21.5)"
        >
          9
        </text>
      </g>
      <g
        className="cursor-pointer"
        transform="matrix(-1 0 0 -1 216.846 312.0)"
        onClick={() => reservation("8")}
      >
        <circle
          cx="0"
          cy="21.5"
          r="24"
          fill={darkColor("8")}
          stroke="white"
          strokeWidth="2"
        />

        <text
          x="0"
          y="21.5"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
          transform="scale(-1,1) translate(-24,0) rotate(180 12 21.5)"
        >
          8
        </text>
      </g>
      <g
        className="cursor-pointer"
        transform="matrix(-1 0 0 -1 216.846 406.0)"
        onClick={() => reservation("7")}
      >
        <circle
          cx="0"
          cy="21.5"
          r="24"
          fill={darkColor("7")}
          stroke="white"
          strokeWidth="2"
        />

        <text
          x="0"
          y="21.5"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
          transform="scale(1,1) translate(-24,0) rotate(180 12 21.5)"
        >
          7
        </text>
      </g>
      <g
        transform="matrix(-4.37114e-08 1 1 4.37114e-08 90.5 470.3846)"
        onClick={() => reservation("6")}
        className="cursor-pointer"
      >
        <circle
          cx="-5"
          cy="21.5"
          r="24"
          fill={darkColor("6")}
          stroke="white"
          strokeWidth="2"
        />

        <text
          x="0"
          y="17.5"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
          transform="scale(-1,1) translate(-24,0) rotate(90 12 32.5)"
        >
          6
        </text>
      </g>
    </svg>
  );
};
