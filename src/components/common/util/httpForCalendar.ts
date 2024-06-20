import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

interface IScheduleForMonth {
    fromDate: string;
    toDate: string;
}

export const queryClient = new QueryClient();

export async function createSchedule(data: any) {
    try {
        const response = await axios.post("http://localhost:8080/api/v1/schedule/create", data);

        if (response.status !== 200) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while save schedule data"
        );
    }
}

export async function getScheduleForMonth({ fromDate, toDate }: IScheduleForMonth) {
    const URL = `http://localhost:8080/api/v1/schedule/month?fromDate=${fromDate}&toDate=${toDate}`;

    try {
        const response = await axios.get(URL);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while fetching monthly schedule data"
        );
    }
}

export async function getSchedule(id: number) {
    const URL = `http://localhost:8080/api/v1/schedule/${id}`;

    try {
        const response = await axios.get(URL);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while fetching schedule data"
        );
    }
}

export async function updateSchedule(data: any) {
    try {
        const response = await axios.patch("http://localhost:8080/api/v1/schedule/update", data, {
            headers: { "Content-Type": "application/json" },
        });

        if (response.status !== 200) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while update schedule data"
        );
    }
}

export async function deleteSchedule(id: number) {
    try {
        const response = await axios.delete("http://localhost:8080/api/v1/schedule/delete/" + id);

        if (response.status !== 204) {
            throw new Error(`Unexpected status: ${response.status}`);
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(
            axios.isAxiosError(error) && error.response
                ? error.response.data
                : "An error occurred while delete schedule data"
        );
    }
}
