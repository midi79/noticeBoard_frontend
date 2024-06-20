import styles from "./CalendarWeek.module.css";

const week = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

const CalendarWeek = () => {
    return (
        <div className={styles.calendar__week__wrapper}>
            {week.map((day: string, index) => (
                <div className={styles.calendar__week__day} key={index}>
                    {day}
                </div>
            ))}
        </div>
    );
};

export default CalendarWeek;
