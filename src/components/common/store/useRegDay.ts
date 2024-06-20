import { Dayjs } from "dayjs";
import { create } from "zustand";

const useRegDayStore = create((set) => ({
    scheduleId: Number,
    date: Dayjs,
    setScheduleId: (newScheduleId: Number) => set({ scheduleId: newScheduleId }),
    setRegDay: (newRegDay: Dayjs) => set({ date: newRegDay }),
}));

export default useRegDayStore;
