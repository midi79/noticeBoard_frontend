import dayjs from "dayjs";
import { create } from "zustand";

export interface IYearMonth {
    year: number;
    month: number;
}

const useMonthStore = create((set) => ({
    yearMonth: {
        year: dayjs().year(),
        month: dayjs().month(),
    },
    currentPageYearMonth: {
        year: dayjs().year(),
        month: dayjs().month(),
    },
    setMonth: (newYearMonth: IYearMonth) => set({ yearMonth: newYearMonth }),
    setCurrentPageMonth: (newYearMonth: IYearMonth) => set({ currentPageYearMonth: newYearMonth }),
}));

export default useMonthStore;
