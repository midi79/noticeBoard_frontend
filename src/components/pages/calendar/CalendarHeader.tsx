import styles from "./CalendarHeader.module.css";
import calenderImg from "../../../assets/images/calendar.png";
import backIcon from "../../../assets/icons/arrow_back.svg";
import forwardIcon from "../../../assets/icons/arrow_forward.svg";
import doubleLeftIcon from "../../../assets/icons/double_arrow_left.svg";
import doubleRightIcon from "../../../assets/icons/double_arrow_right.svg";
import Button from "../../common/widget/Button";
import dayjs from "dayjs";
import useMonthStore, { IYearMonth } from "../../common/store/useMonth";
import ColorCheckbox from "../../common/widget/ColorCheckbox";
import { colorClasses } from "../../data/commonVariables";
import { useEffect, useState } from "react";
import useColorStore from "../../common/store/useColor";

const CalendarHeader = () => {
    const yearMonth = useMonthStore<IYearMonth>((state: any) => state.currentPageYearMonth);
    const displayYearMonth: string = dayjs(dayjs().year(yearMonth.year).month(yearMonth.month)).format("MMMM YYYY");
    const setYearMonth = useMonthStore((state: any) => state.setCurrentPageMonth);
    const { colorStore }: any = useColorStore();
    const setColorStore = useColorStore((state: any) => state.setColorStore);
    const [colorList, setColorList] = useState<string[]>([]);

    const onTodayClickHandler = () => {
        console.log("Today!!");
    };

    const onMonthBackClickHandler = () => {
        const date = dayjs(dayjs().year(yearMonth.year).month(yearMonth.month).subtract(1, "month"));
        setYearMonth({
            year: date.year(),
            month: date.month(),
        });
    };
    const onYearBackClickHandler = () => {
        const date = dayjs(dayjs().year(yearMonth.year).month(yearMonth.month).subtract(1, "year"));
        setYearMonth({
            year: date.year(),
            month: date.month(),
        });
    };

    const onMonthForwardClickHandler = () => {
        const date = dayjs(dayjs().year(yearMonth.year).month(yearMonth.month).add(1, "month"));
        setYearMonth({
            year: date.year(),
            month: date.month(),
        });
    };

    const onYearForwardClickHandler = () => {
        const date = dayjs(dayjs().year(yearMonth.year).month(yearMonth.month).add(1, "year"));
        setYearMonth({
            year: date.year(),
            month: date.month(),
        });
    };

    const onColorClickHandler = (color: string) => {
        setColorList((prevColorList) => {
            if (prevColorList.includes(color)) {
                return prevColorList.filter((item) => item !== color);
            } else {
                return [...prevColorList, color];
            }
        });
    };

    useEffect(() => {
        setColorStore(colorList);
    }, [colorList]);

    useEffect(() => {
        if (colorStore) {
            setColorList(colorStore);
        }
    }, [colorStore]);

    return (
        <div className={styles.calendar__header__wrapper}>
            <div className={styles.calendar__header__title}>
                <img src={calenderImg} alt="calendar" />
                <div className={styles.calendar__header__title__text}>Calendar</div>
                <div className={styles.calendar__header__title__colors}>
                    {colorClasses.map((color, index) => (
                        <ColorCheckbox
                            fillColor={color}
                            key={index}
                            onClickHandler={(event: any) => onColorClickHandler(color)}
                            isChecked={colorStore && colorStore.includes(color)}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.calendar__header__date}>
                <div onClick={onYearBackClickHandler}>
                    <img src={doubleLeftIcon} alt="Year back" />
                </div>
                <div onClick={onMonthBackClickHandler}>
                    <img src={backIcon} alt="Month back" />
                </div>
                <div className={styles.calendar__header__date_text}>{displayYearMonth}</div>
                <div onClick={onMonthForwardClickHandler}>
                    <img src={forwardIcon} alt="Month forward" />
                </div>
                <div onClick={onYearForwardClickHandler}>
                    <img src={doubleRightIcon} alt="Year forward" />
                </div>
            </div>
            <div className={styles.calendar__header__button}>
                <Button title="Today" onClickHandler={onTodayClickHandler} />
            </div>
        </div>
    );
};

export default CalendarHeader;
