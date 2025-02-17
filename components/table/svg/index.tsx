import Toast from "@/components/toast";
import { useReserve } from "@/hooks/useMutations";
import { SessionType } from "@/types/next-auth";
import { SeatType } from "@/types/seats";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const TableSVG = ({nums, session, seats, theme}: {nums: number[], session:  SessionType | undefined, seats: SeatType[], theme: string | undefined}) => {
    const { mutate, isSuccess, isError, isLoading, error }: any = useReserve();
    console.log(seats, "seatsseatsseatsseats")
    const reservation = (seat: string) => {
        mutate({ data: { username: session?.username || "", seatNumber: seat } });
    }
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
      if(theme === "light") {
          return (
              <svg width="225" height="490" viewBox="0 0 225 490" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g onClick={() => reservation("1")}>
                      <rect x="0.5" y="0.5" width="23.6154" height="43" rx="5.5" transform="matrix(-4.37114e-08 1 1 4.37114e-08 90.5 7.3846)" fill={seats.some((seat: SeatType) => seat.seatNumber === "1") ? "#0038AA" : "#949494"} stroke="white"/>
                      <rect x="0.5" y="0.5" width="13.7692" height="29.8" rx="6.88461" transform="matrix(-4.37114e-08 1 1 4.37114e-08 97.1001 2.18557e-08)" fill={seats.some((seat: SeatType) => seat.seatNumber === "1") ? "#0038AA" : "#949494"} stroke="white"/>
                  </g>
                  <g onClick={() => reservation("2")}>
                      <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 126)" fill={seats.some((seat: SeatType) => seat.seatNumber === "2") ? "#0038AA" : "#949494"} stroke="white"/>
                      <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 119.4)" fill={seats.some((seat: SeatType) => seat.seatNumber === "2") ? "#0038AA" : "#949494"} stroke="white"/>
                  </g>
                  <g onClick={() => reservation("3")}>
                      <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 219.333)" fill={seats.some((seat: SeatType) => seat.seatNumber === "3") ? "#0038AA" : "#949494"} stroke="white"/>
                      <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 212.733)" fill={seats.some((seat: SeatType) => seat.seatNumber === "3") ? "#0038AA" : "#949494"} stroke="white"/>
                  </g>
                  <g onClick={() => reservation("4")}>
                      <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 312.667)" fill={seats.some((seat: SeatType) => seat.seatNumber === "4") ? "#0038AA" : "#949494"} stroke="white"/>
                      <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 306.067)" fill={seats.some((seat: SeatType) => seat.seatNumber === "4") ? "#0038AA" : "#949494"} stroke="white"/>
                  </g>
                  <g onClick={() => reservation("5")}>
                      <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 406)" fill={seats.some((seat: SeatType) => seat.seatNumber === "5") ? "#0038AA" : "#949494"} stroke="white"/>
                      <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 399.4)" fill={seats.some((seat: SeatType) => seat.seatNumber === "5") ? "#0038AA" : "#949494"} stroke="white"/>
                  </g>
                  <rect id="food-table" x="39" y="40" width="147" height="410" rx="16" fill="#D9D9D9"/>
                  <g onClick={() => reservation("6")}>
                      <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 83)" fill={seats.some((seat: SeatType) => seat.seatNumber === "6") ? "#0038AA" : "#949494"} stroke="white"/>
                      <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 89.6)" fill={seats.some((seat: SeatType) => seat.seatNumber === "6") ? "#0038AA" : "#949494"} stroke="white"/>
                  </g>
                  <g onClick={() => reservation("7")}>
                      <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 176.333)" fill={seats.some((seat: SeatType) => seat.seatNumber === "7") ? "#0038AA" : "#949494"} stroke="white"/>
                      <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 182.933)" fill={seats.some((seat: SeatType) => seat.seatNumber === "7") ? "#0038AA" : "#949494"}stroke="white"/>
                  </g>
                  <g onClick={() => reservation("8")}>
                      <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 269.667)" fill={seats.some((seat: SeatType) => seat.seatNumber === "8") ? "#0038AA" : "#949494"} stroke="white"/>
                      <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 276.267)" fill={seats.some((seat: SeatType) => seat.seatNumber === "8") ? "#0038AA" : "#949494"} stroke="white"/>
                  </g>
                  <g onClick={() => reservation("9")}>
                      <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 363)" fill={seats.some((seat: SeatType) => seat.seatNumber === "9") ? "#0038AA" : "#949494"} stroke="white"/>
                      <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 369.6)" fill={seats.some((seat: SeatType) => seat.seatNumber === "9") ? "#0038AA" : "#949494"} stroke="white"/>
                  </g>
                  <g onClick={() => reservation("10")}>
                      <rect x="-0.5" y="-0.5" width="23.6154" height="43" rx="5.5" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 133.5 481.615)" fill={seats.some((seat: SeatType) => seat.seatNumber === "10") ? "#0038AA" : "#949494"} stroke="white"/>
                      <rect x="-0.5" y="-0.5" width="13.7692" height="29.8" rx="6.88461" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 126.9 489)" fill={seats.some((seat: SeatType) => seat.seatNumber === "10") ? "#0038AA" : "#949494"} stroke="white"/>
                  </g>
              </svg>
          )
      }
      return (
        <svg width="225" height="490" viewBox="0 0 225 490" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g onClick={() => reservation("1")}>
                <rect x="0.5" y="0.5" width="23.6154" height="43" rx="5.5" transform="matrix(-4.37114e-08 1 1 4.37114e-08 90.5 7.3846)" fill={seats.some((seat: SeatType) => seat.seatNumber === "1") ? "#0038AA" : "#353535"} stroke="white"/>
                <rect x="0.5" y="0.5" width="13.7692" height="29.8" rx="6.88461" transform="matrix(-4.37114e-08 1 1 4.37114e-08 97.1001 2.18557e-08)" fill={seats.some((seat: SeatType) => seat.seatNumber === "1") ? "#0038AA" : "#353535"} stroke="white"/>
            </g>
            <g onClick={() => reservation("2")}>
                <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 126)" fill={seats.some((seat: SeatType) => seat.seatNumber === "2") ? "#0038AA" : "#353535"}stroke="white"/>
                <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 119.4)" fill={seats.some((seat: SeatType) => seat.seatNumber === "2") ? "#0038AA" : "#353535"} stroke="white"/>
            </g>
            <g onClick={() => reservation("3")}>
                <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 219.333)" fill={seats.some((seat: SeatType) => seat.seatNumber === "3") ? "#0038AA" : "#353535"} stroke="white"/>
                <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 212.733)" fill={seats.some((seat: SeatType) => seat.seatNumber === "3") ? "#0038AA" : "#353535"} stroke="white"/>
            </g>
            <g onClick={() => reservation("4")}>
                <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 312.667)" fill={seats.some((seat: SeatType) => seat.seatNumber === "4") ? "#0038AA" : "#353535"} stroke="white"/>
                <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 306.067)" fill={seats.some((seat: SeatType) => seat.seatNumber === "4") ? "#0038AA" : "#353535"} stroke="white"/>
            </g>
            <g onClick={() => reservation("5")}>
                <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 406)" fill={seats.some((seat: SeatType) => seat.seatNumber === "5") ? "#0038AA" : "#353535"} stroke="white"/>
                <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 399.4)" fill={seats.some((seat: SeatType) => seat.seatNumber === "5") ? "#0038AA" : "#353535"} stroke="white"/>
            </g>
            <rect x="39" y="40" width="147" height="410" rx="16" fill="#1F242F"/>
            <g onClick={() => reservation("6")}>
                <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 83)" fill={seats.some((seat: SeatType) => seat.seatNumber === "6") ? "#0038AA" : "#353535"} stroke="white"/>
                <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 89.6)" fill={seats.some((seat: SeatType) => seat.seatNumber === "6") ? "#0038AA" : "#353535"} stroke="white"/>
            </g>
            <g onClick={() => reservation("7")}>
                <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 176.333)" fill={seats.some((seat: SeatType) => seat.seatNumber === "7") ? "#0038AA" : "#353535"} stroke="white"/>
                <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 182.933)" fill={seats.some((seat: SeatType) => seat.seatNumber === "7") ? "#0038AA" : "#353535"} stroke="white"/>
            </g>
            <g onClick={() => reservation("8")}>
                <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 269.667)" fill={seats.some((seat: SeatType) => seat.seatNumber === "8") ? "#0038AA" : "#353535"} stroke="white"/>
                <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 276.267)" fill={seats.some((seat: SeatType) => seat.seatNumber === "8") ? "#0038AA" : "#353535"} stroke="white"/>
            </g>
            <g onClick={() => reservation("9")}>
                <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 363)" fill={seats.some((seat: SeatType) => seat.seatNumber === "9") ? "#0038AA" : "#353535"} stroke="white"/>
                <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 369.6)" fill={seats.some((seat: SeatType) => seat.seatNumber === "9") ? "#0038AA" : "#353535"} stroke="white"/>
            </g>
            <g onClick={() => reservation("10")}>
                <rect x="-0.5" y="-0.5" width="23.6154" height="43" rx="5.5" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 133.5 481.615)" fill={seats.some((seat: SeatType) => seat.seatNumber === "10") ? "#0038AA" : "#353535"} stroke="white"/>
                <rect x="-0.5" y="-0.5" width="13.7692" height="29.8" rx="6.88461" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 126.9 489)" fill={seats.some((seat: SeatType) => seat.seatNumber === "10") ? "#0038AA" : "#353535"} stroke="white"/>
            </g>
        </svg>
    )
}