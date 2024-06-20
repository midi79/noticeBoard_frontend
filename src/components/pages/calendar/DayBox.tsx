import dayjs, { Dayjs } from "dayjs";
import styles from "./DayBox.module.css";
import useMonthStore from "../../common/store/useMonth";
import { Dispatch, SetStateAction } from "react";
import useRegDayStore from "../../common/store/useRegDay";
import useColorStore from "../../common/store/useColor";

interface ISchedule {
    id: number;
    date: string;
    title: string;
    color: string;
}

interface IDayBoxProps {
    day: Dayjs;
    rowCount?: number;
    dialogHandler: Dispatch<SetStateAction<boolean>>;
    schedule: ISchedule[];
}

interface ICustomStyle {
    color?: string;
    height?: string;
    backgroundColor?: string;
}

const DayBox = ({ day, rowCount = 6, dialogHandler, schedule }: IDayBoxProps) => {
    const { currentPageYearMonth }: any = useMonthStore();
    const { colorStore }: any = useColorStore();
    const setRegDay = useRegDayStore((state: any) => state.setRegDay);
    const setScheduleId = useRegDayStore((state: any) => state.setScheduleId);
    const height = `${100 / rowCount}%`;
    const isCurrentMonth =
        day.format("YYYYMM") ===
        dayjs(new Date(currentPageYearMonth.year, currentPageYearMonth.month, 1)).format("YYYYMM");

    let customStyle: ICustomStyle = { height: height, backgroundColor: "white" };

    const filteredSchedules = schedule?.filter((item) => day.format("DD/MM/YYYY") === item.date) || [];
    const colorFilteredSchedules = filteredSchedules.filter((item) => colorStore.includes(item.color));
    const sortedSchedule =
        colorFilteredSchedules.length > 0 ? [...colorFilteredSchedules].sort((a, b) => a.id - b.id) : [];

    // Display this month
    if (!isCurrentMonth) {
        customStyle.backgroundColor = "#f0f0f0";
    }

    // Display Saturday, Sunday
    let dayCustomStyle: ICustomStyle = { color: "#c06d08" };
    if (day.day() === 0) {
        dayCustomStyle.color = "#ff5151";
    } else if (day.day() === 6) {
        dayCustomStyle.color = "#5353fb";
    }

    // Display today
    if (day.format("YYYYMMDD") === dayjs().format("YYYYMMDD")) {
        dayCustomStyle.backgroundColor = "#fbd3c1";
    }

    // Register new schedule
    const onDayClickHandler = () => {
        dialogHandler(true);
        setRegDay(day);
    };

    // View and update schedule
    const onScheduleClickHandler = (id: number) => {
        setScheduleId(id);
        setRegDay(day);
        dialogHandler(true);
    };

    return (
        <div className={styles.daybox__wrapper} style={customStyle} onClick={onDayClickHandler}>
            <div className={styles.daybox__wrapper__day} style={dayCustomStyle}>
                {day.format("DD")}
            </div>
            <div className={styles.daybox__wrapper__schedule__wrapper}>
                {sortedSchedule.map((item, index) => (
                    <div
                        className={styles.daybox__wrapper__schedule}
                        key={index}
                        onClick={() => onScheduleClickHandler(item.id)}
                        style={{ backgroundColor: item.color }}
                    >
                        <div>{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DayBox;
