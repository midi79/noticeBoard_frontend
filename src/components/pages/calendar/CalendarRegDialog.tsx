import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../../common/widget/Button";
import styles from "./CalendarRegDialog.module.css";
import useRegDayStore from "../../common/store/useRegDay";
import closeIcon from "../../../assets/icons/close.svg";
import checkIcon from "../../../assets/icons/check.svg";
import LongInput from "../../common/widget/LongInput";
import HourSelect from "../../common/widget/HourSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createSchedule, deleteSchedule, getSchedule, updateSchedule } from "../../common/util/httpForCalendar";
import { queryClient } from "../../common/util/http";
import { colorClasses } from "../../data/commonVariables";

interface ICalendarRegDialog {
    dialogHandler: Dispatch<SetStateAction<boolean>>;
}

const CalendarRegDialog = ({ dialogHandler }: ICalendarRegDialog) => {
    const { date, scheduleId }: any = useRegDayStore();
    const setScheduleId = useRegDayStore((state: any) => state.setScheduleId);
    const formatData = date.format("DD/MM/YYYY");
    const [fromHour, setFromHour] = useState<string>("00");
    const [toHour, setToHour] = useState<string>("00");
    const [selectedLabel, setSelectedLabel] = useState<string>(colorClasses[0]);
    const [showValidation, setShowValidation] = useState<boolean>(false);
    const [validationMessage, setValidationMessage] = useState<string>("Validation");

    const {
        mutate: createMutation,
        isError: isCreateError,
        error: createError,
    } = useMutation({
        mutationFn: createSchedule,
        onSuccess: () => {
            alert("Successfully created!");
            setScheduleId(null);
            dialogHandler(false);
            queryClient.invalidateQueries({ queryKey: ["schedule"] });
        },
    });

    const {
        data,
        isError: isFetchError,
        error: fetchError,
    } = useQuery({
        queryKey: ["schedule", scheduleId],
        queryFn: () => getSchedule(scheduleId),
        enabled: scheduleId ? true : false,
    });

    useEffect(() => {
        if (data) {
            setFromHour(data.fromHour || "00");
            setToHour(data.toHour || "00");
            setSelectedLabel(data.color || colorClasses[0]);
        }
    }, [data]);

    const {
        mutate: updateMutation,
        isError: isUpdateError,
        error: updateError,
    } = useMutation({
        mutationFn: updateSchedule,
        onSuccess: () => {
            alert("Successfully updated!");
            setScheduleId(null);
            dialogHandler(false);
            queryClient.invalidateQueries({ queryKey: ["schedule"] });
        },
    });

    const {
        mutate: deleteMutation,
        isError: isDeleteError,
        error: deleteError,
    } = useMutation({
        mutationFn: deleteSchedule,
        onSuccess: () => {
            alert("Successfully deleted!");
            setScheduleId(null);
            dialogHandler(false);
            queryClient.invalidateQueries({ queryKey: ["schedule"] });
        },
    });

    const onCloseClickHandler = () => {
        dialogHandler(false);
        setScheduleId(null);
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowValidation(false);
        const fd = new FormData(event.target as HTMLFormElement);
        const formData = Object.fromEntries(fd.entries());

        if (!formData.title) {
            setValidationMessage("You must insert a title");
            setShowValidation(true);
            return;
        }

        if (Number(fromHour) > Number(toHour)) {
            setValidationMessage("From hour cannot be later than To hour");
            setShowValidation(true);
            return;
        }

        if (!scheduleId) {
            const schedule = {
                title: formData.title as string,
                description: formData.description as string,
                date: formatData,
                fromHour,
                toHour,
                color: selectedLabel,
            };
            createMutation(schedule);
        } else {
            const schedule = {
                id: scheduleId,
                title: formData.title as string,
                description: formData.description as string,
                date: formatData,
                fromHour,
                toHour,
                color: selectedLabel,
            };
            updateMutation(schedule);
        }
    };

    const onDeleteClickHandler = () => {
        if (confirm("Are you sure to delete the this schedule?")) {
            deleteMutation(scheduleId);
        }
    };

    return (
        <form className={styles.calendar__reg__dialog__wrapper} onSubmit={onSubmitHandler}>
            <div className={styles.calendar__reg__dialog__content}>
                <div className={styles.calendar__reg__dialog__date}>
                    <div>{formatData}</div>
                    <div onClick={onCloseClickHandler}>
                        <img src={closeIcon} alt="Close Dialog" />
                    </div>
                </div>
                <div className={styles.calendar__reg__dialog__title}>
                    <LongInput
                        type="text"
                        name="title"
                        placeholder="Title"
                        width={545}
                        defaultValue={data ? data.title : null}
                    />
                </div>
                <div className={styles.calendar__reg__dialog__description}>
                    <textarea
                        name="description"
                        cols={49}
                        rows={10}
                        placeholder="Description"
                        defaultValue={data ? data.description : null}
                    />
                </div>
                <div className={styles.calendar__reg__dialog__bottom}>
                    <div className={styles.calendar__reg__dialog__time__group}>
                        <HourSelect
                            title="From"
                            id="fromHour"
                            onChangeHandler={(event) => setFromHour(event.target.value)}
                            value={fromHour}
                        />
                        <HourSelect
                            title="To"
                            id="toHour"
                            onChangeHandler={(event) => setToHour(event.target.value)}
                            value={toHour}
                        />
                    </div>
                    <div className={styles.calendar__reg__dialog__color__group}>
                        {colorClasses.map((lblClass, index) => (
                            <span
                                key={index}
                                onClick={() => setSelectedLabel(lblClass)}
                                className={styles.calendar__reg__dialog__color}
                                style={{ backgroundColor: lblClass }}
                            >
                                {selectedLabel === lblClass && (
                                    <span>
                                        <img src={checkIcon} />
                                    </span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
                <div className={styles.calendar__reg__dialog__button}>
                    <div>
                        {showValidation && (
                            <div className={styles.calendar__reg__dialog__message}>{validationMessage}</div>
                        )}
                        {isCreateError && (
                            <div className={styles.calendar__reg__dialog__message}>{createError.message}</div>
                        )}
                        {isUpdateError && (
                            <div className={styles.calendar__reg__dialog__message}>{updateError.message}</div>
                        )}
                        {isFetchError && (
                            <div className={styles.calendar__reg__dialog__message}>{fetchError.message}</div>
                        )}
                        {isDeleteError && (
                            <div className={styles.calendar__reg__dialog__message}>{deleteError.message}</div>
                        )}
                    </div>
                    <div>
                        {scheduleId && <Button title="Delete" type="button" onClickHandler={onDeleteClickHandler} />}
                        <Button title="Save" type="submit" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CalendarRegDialog;
