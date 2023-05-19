import React, { useEffect, useState } from "react";
import Layout from "./common/Layout/Layout";
// import './app.css';
import ClientsClubs from "./clients/clubs/Clubs";
import { userStateContext } from "@/context/context-provider";
import ManagerClubs from "./manager/Dashboard/Clubs/Clubs";
import axiosClient from "@/public/axios";
import clsx from "clsx";
import { useUI } from "@/context/use-ui";
import NewTraining from "./UI/Modal/ModalContent/NewTraining/NewTraining";

export default function Schedule() {
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const [timeSlots, setTimeSlots] = useState([]);
    console.log("timeslots", timeSlots);
    const daysOfWeek = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
    ];
    useEffect(() => {
        axios
            .get("/api/trainingtimes")
            .then((res) => setTimeSlots(res.data))
            .catch((err) => console.log(err));
    }, []);
    const [trainings, setTrainings] = useState();

    useEffect(() => {
        currentUser?.user_type == 't' && axios
            .get("/api/trainings",
            {
                params: {
                  trainer_id: currentUser.id
                }
              })
            .then((res) => setTrainings(res.data))
            .catch((err) => console.log(err));
    }, [currentUser]);
    console.log("training", trainings);
    const today = new Date().toLocaleDateString("ru-RU", { weekday: "long" });
    const { openModal, showLoader, hideLoader, setModalContent, displayModal } =
        useUI();

    const trainingByDayOfWeek =
        trainings &&
        trainings.reduce((acc, curr) => {
            const dayOfWeek = curr.day_of_week;
            if (!acc[dayOfWeek]) {
                acc[dayOfWeek] = [];
            }
            acc[dayOfWeek].push(curr);
            return acc;
        }, {});

    return (
        <div className="bg-gray-900">
            <div className="flex items-center justify-center pt-10 flex-col">
                <div className="flex items-center gap-4">
                    <p className="text-2xl text-white">Расписание на неделю</p>
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
                        {trainingByDayOfWeek && timeSlots.map((timeSlot, i) => (
                            <tr key={i}>
                                <td className="border border-gray-500 p-2 text-center text-white">
                                    {timeSlot.start_time}-{timeSlot.end_time}
                                </td>
                                {daysOfWeek.map((day, j) => {
                                    const trainingsForDay =
                                        trainingByDayOfWeek[j + 1] || [];
                                    const training = trainingsForDay.find(
                                        (t) => t.time_id === timeSlot.id
                                    );
                                    return (
                                        <td
                                            key={j}
                                            className="border border-gray-500 p-2 text-indigo-200 hover:text-indigo-400 text-center"
                                        >
                                            {!training && (
                                                <button
                                                    onClick={() => {
                                                        setModalContent(<NewTraining timeId={timeSlot.id} dayOfWeek={j+1}/>);
                                                        openModal();
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="black"
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

                                            <div className="font-medium text-white text-base">
                                                <strong>{training?.training_variation.name}</strong>
                                            </div>
                                            <div className="font-medium text-gray-500 text-xs">
                                                {training?.room?.name}
                                            </div>
                                            <div className="font-medium text-gray-400 text-xs">
                                                {training?.room?.club?.name}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
