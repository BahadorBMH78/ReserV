export type SeatType = {
    startTime: string;
    endTime: string;
    username: string;
    serverTime: string;
    seatNumber: string;
    id: string;
    name: string;
}

export type TimerType = {
    hours: number;
    minutes: number;
    seconds: number;
    referenceTime?: number;
}