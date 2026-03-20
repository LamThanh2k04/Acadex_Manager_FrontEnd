export const minutestoHour = (minute: number): string => {
    const h = Math.floor(minute / 60);
    const m = minute % 60;
    return `${h}:${String(m).padStart(2, "0")}`;
};
export const dayOfWeekToString = (day: number): string => {
    const days: Record<number, string> = {
        2: "Thứ 2",
        3: "Thứ 3",
        4: "Thứ 4",
        5: "Thứ 5",
        6: "Thứ 6",
        7: "Thứ 7",
        8: "Chủ nhật"
    };
    return days[day] ?? "Không tồn tại ngày này";
};