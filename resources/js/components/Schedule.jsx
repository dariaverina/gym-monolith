import React, { useEffect, useState } from "react";
import Layout from "./common/Layout/Layout";
import ClientsClubs from "./clients/clubs/Clubs";
import { userStateContext } from "@/context/context-provider";
import ManagerClubs from "./manager/Dashboard/Clubs/Clubs";
import axiosClient from "@/public/axios";
import clsx from "clsx";
import { useUI } from "@/context/use-ui";
import NewTraining from "./UI/Modal/ModalContent/NewTraining/NewTraining";
import TrainingDetails from "./UI/Modal/ModalContent/TrainingDetails/TrainingDetails";


function getWeekNumber(date) {
    const currentDate = new Date(date.getTime());
    currentDate.setMonth(0, 1);
    const firstDayOfWeek = currentDate.getDay();
    const daysOffset = firstDayOfWeek > 4 ? 11 - firstDayOfWeek : 4 - firstDayOfWeek;
    const diff = date - currentDate;
    const weekNumber = Math.ceil((diff + daysOffset) / (7 * 24 * 60 * 60 * 1000));
    return weekNumber;
}


export default function Schedule() {
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const weeks = ["прошлую", "текущую", "следующую"];
    const [week, setWeek] = useState(1);
    const currentDate = new Date();
    const weekNumber = getWeekNumber(currentDate);
    console.log('week', week)
    useEffect(() => {
        setWeek(weekNumber)
    }, [currentUser])


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
                        trainer_id: currentUser.id,
                        week_number: week
                    }
                })
            .then((res) => setTrainings(res.data))
            .catch((err) => console.log(err));
    }, [currentUser, week]);
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



    // Получение номера недели


    return (
        <div className="bg-gray-900">
            <div className="flex items-center justify-center pt-10 flex-col text-white">
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
                        Расписание на 
                        {week == weekNumber ? ' текущую ': week-1 == weekNumber? ' следующую ': week+1 == weekNumber? ' предыдущую ': '  '}
                       
                        неделю
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
                                        "border border-gray-500 p-2 text-gray-400",
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
                                <td className="border border-gray-500 p-2 text-center text-gray-400">
                                    {timeSlot.start_time.slice(0, -3)}-{timeSlot.end_time.slice(0, -3)}
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
                                            className={clsx(
                                                "border border-gray-500 p-2 text-indigo-200  text-center",
                                                { "hover:bg-gray-800": training },
                                            )}
                                        // className="border border-gray-500 p-2 text-indigo-200 hover:text-indigo-400 text-center hover:bg-gray-800"
                                        >
                                            {!training && (
                                                <button
                                                    onClick={() => {
                                                        setModalContent(<NewTraining timeId={timeSlot.id} dayOfWeek={j + 1} setTrainings={setTrainings} />);
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
                                            <button
                                                onClick={() => {
                                                    setModalContent(<TrainingDetails timeId={timeSlot.id} dayOfWeek={j + 1} setTrainings={setTrainings} />);
                                                    openModal();
                                                }}
                                            >
                                                <div className="font-medium text-white text-base">
                                                    <strong>{training?.training_variation.name}</strong>
                                                </div>
                                                <div className="font-medium text-gray-500 text-xs">
                                                    {training?.room?.name}
                                                </div>
                                                <div className="font-medium text-gray-400 text-xs">
                                                    {training?.room?.club?.name}
                                                </div>
                                            </button>
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
