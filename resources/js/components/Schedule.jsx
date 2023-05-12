import React, { useEffect, useState } from "react";
import Layout from "./common/Layout/Layout";
// import './app.css';
import ClientsClubs from "./clients/clubs/Clubs";
import { userStateContext } from "@/context/context-provider";
import ManagerClubs from "./manager/Dashboard/Clubs/Clubs";
import axiosClient from "@/public/axios";
import clsx from "clsx";
import { useUI } from '@/context/use-ui';

export default function Schedule() {
    const daysOfWeek = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
    ];
    const timeSlots = [
        "09:00",
        "10:30",
        "12:00",
        "13:30",
        "15:00",
        "16:30",
        "17:00",
        "18:00",
        "19:30",
    ];
    const weeks = ["прошлую", "текущую", "следующую"];
    const [week, setWeek] = useState(1);
    const activities = ["Pilates", "Yoga", "Spinning", "Zumba"];
    const today = new Date().toLocaleDateString("ru-RU", { weekday: "long" });
    const { openModal, showLoader, hideLoader, setModalContent, displayModal } =useUI();

    let data_init = Array.from({ length: timeSlots.length }, () =>
        daysOfWeek.reduce((obj, day) => {
            let shouldHaveData = Math.random() < 0.5;
            if (day === "Воскресенье" || day === "Понедельник") shouldHaveData = false;
            if (shouldHaveData) {
                const activity =
                    activities[Math.floor(Math.random() * activities.length)];
                obj[day] = {
                    activity: `${activity}`,
                    address: `Address ${Math.floor(Math.random() * 1000)}`,
                };
            }
            return obj;
        }, {})
    );
    let data_2 = Array.from({ length: timeSlots.length }, () =>
        daysOfWeek.reduce((obj, day) => {
            return obj;
        }, {})
    );
    const [data, setData] = useState(data_init);
    // console.log(data)
    useEffect(() => {
        if(week!=1) setData(data_2);
        else setData(data_init);
        // console.log(week)
    },[week]);
    return (
        <div className="bg-indigo-100">
            <div className="flex items-center justify-center pt-10 flex-col">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            setWeek(week - 1);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                    <p className="text-2xl">
                        Расписание на {weeks[week]} неделю
                    </p>
                    <button
                        onClick={() => {
                            setWeek(week + 1);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                <table className="border-collapse border border-gray-500 mt-10 ">
                    <thead>
                        <tr>
                            <th className="border border-gray-500 p-2 bg-gray-900"></th>
                            {daysOfWeek.map((day) => (
                                <th
                                    key={day}
                                    className={clsx(
                                        "border border-gray-500 p-2 text-gray-300",
                                        {
                                            "bg-[#5aae3b] text-gray-900":
                                                day === today,
                                        },
                                        { "bg-gray-900 ": day !== today }
                                    )}
                                >
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i}>
                                <td className="border border-gray-500 p-2 text-center">
                                    {timeSlots[i]}
                                </td>
                                {daysOfWeek.map((day) => (
                                    <td
                                        key={day}
                                        className="border border-gray-500 p-2 text-indigo-200 hover:text-indigo-400 text-center"
                                    >
                                        {!item[day] && (
                                            <button onClick={()=>{setModalContent(<>Отправьте заявку на бронирование зала для тренировки. Заявка будет рассмотрена менеджером спортклуба</>); openModal()}}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </button>
                                        )}

                                        <div className="font-medium text-black">
                                            {item[day]?.activity}
                                        </div>
                                        <div className="font-medium text-gray-500 text-xs">
                                            {item[day]?.address}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
