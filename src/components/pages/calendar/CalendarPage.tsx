import React, { useEffect, useState } from "react";
import { calendarRowCount, getMonth } from "../../common/util/calendar";
import styles from "./CalendarPage.module.css";
import DayBox from "./DayBox";
import CalendarHeader from "./CalendarHeader";
import useMonthStore from "../../common/store/useMonth";
import CalendarWeek from "./CalendarWeek";
import CalendarRegDialog from "./CalendarRegDialog";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getScheduleForMonth } from "../../common/util/httpForCalendar";
import useRegDayStore from "../../common/store/useRegDay";
import useColorStore from "../../common/store/useColor";

const CalendarPage = () => {
    const [showDialog, setShowDialog] = useState(false);
    const { currentPageYearMonth }: any = useMonthStore();
    const setColorStore = useColorStore((state: any) => state.setColorStore);
    const month = getMonth(currentPageYearMonth.year, currentPageYearMonth.month);
    const setScheduleId = useRegDayStore((state: any) => state.setScheduleId);
    const rowCount = calendarRowCount;

    const currentDate = dayjs(new Date(currentPageYearMonth.year, currentPageYearMonth.month, 1));
    const nextDate = currentDate.add(1, "month");

    const {
        data: scheduleData,
        isError,
        error,
    } = useQuery({
        queryKey: ["schedule", currentPageYearMonth.year, currentPageYearMonth.month],
        queryFn: () =>
            getScheduleForMonth({
                fromDate: currentDate.format("DD/MM/YYYY"),
                toDate: nextDate.format("DD/MM/YYYY"),
            }),
    });

    useEffect(() => {
        setScheduleId(null);
    }, []);

    useEffect(() => {
        if (scheduleData) {
            const colorsMap = Map.groupBy(scheduleData, ({ color }: any) => color);
            const colors = colorsMap.keys().toArray();
            setColorStore(colors);
        }
    }, [scheduleData]);

    return (
        <section className={styles.calendar__wrapper}>
            <CalendarHeader />
            {isError && <div>{error.message}</div>}
            <CalendarWeek />
            <div className={styles.calendar__content}>
                {month.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, index) => (
                            <DayBox
                                day={day}
                                key={index}
                                rowCount={rowCount}
                                dialogHandler={setShowDialog}
                                schedule={scheduleData}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
            {showDialog && <CalendarRegDialog dialogHandler={setShowDialog} />}
        </section>
    );
};

export default CalendarPage;
