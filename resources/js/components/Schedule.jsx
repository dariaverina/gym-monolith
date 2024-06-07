import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import clsx from "clsx";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { userStateContext } from "@/context/context-provider";
import { useUI } from "@/context/use-ui";
import TrainingDetails from "./UI/Modal/ModalContent/TrainingDetails/TrainingDetails";

const people = [
    { id: 1, name: "ПИбд-11" },
    { id: 2, name: "ПИбд-12" },
    { id: 3, name: "ПИбд-13" },
    { id: 4, name: "ПИбд-14" },
    { id: 5, name: "ПИбд-21" },
    { id: 6, name: "ПИбд-22" },
    { id: 7, name: "ПИбд-23" },
    { id: 8, name: "ПИбд-31" },
    { id: 9, name: "ПИбд-32" },
    { id: 10, name: "ПИбд-33" },
];

const timeSlots = ["1 пара", "2 пара", "3 пара", "4 пара", "5 пара", "6 пара", "7 пара", "8 пара"];
const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

function getWeekNumber(date) {
    const currentDate = new Date(date.getTime());
    currentDate.setMonth(0, 1);
    const firstDayOfWeek = currentDate.getDay();
    const daysOffset = firstDayOfWeek > 4 ? 11 - firstDayOfWeek : 4 - firstDayOfWeek;
    const diff = date - currentDate;
    const weekNumber = Math.ceil((diff + daysOffset) / (7 * 24 * 60 * 60 * 1000));
    return weekNumber;
}

function getStartDateFromWeekNumber(weekNumber) {
    const year = new Date().getFullYear();
    const firstDayOfYear = new Date(year, 0, 1);
    const daysToAdd = (weekNumber - 1) * 7;
    const startDayOfWeek = 1; // 1 corresponds to Monday
    const offset = startDayOfWeek - firstDayOfYear.getDay();
    const startDate = new Date(firstDayOfYear.getTime() + (offset * 24 * 60 * 60 * 1000) + (daysToAdd * 24 * 60 * 60 * 1000));
    return startDate;
}

function getEndDateFromWeekNumber(weekNumber) {
    const startDate = getStartDateFromWeekNumber(weekNumber);
    const endDate = new Date(startDate.getTime() + (6 * 24 * 60 * 60 * 1000));
    return endDate;
}

export default function Schedule() {
    const [selected, setSelected] = useState(people[3]);
    const { currentUser } = userStateContext();
    const [week, setWeek] = useState(getWeekNumber(new Date()));
    const [trainings, setTrainings] = useState([]);
    const { openModal, setModalContent } = useUI();

    useEffect(() => {
        if (currentUser?.user_type) {
            const params = {
                week_number: week,
            };
            if (currentUser.user_type === "t") {
                params.trainer_id = currentUser.id;
            } else if (currentUser.user_type === "c") {
                params.client_id = currentUser.id;
            }
            axios
                .get("http://localhost:8000/api/schedule", { params })
                .then((res) => setTrainings(res.data))
                .catch((err) => console.error(err));
        }
    }, [currentUser, week]);

    const trainingByDayAndLesson = trainings.reduce((acc, curr) => {
        const { day_of_week, lesson_number } = curr;
        if (!acc[day_of_week]) acc[day_of_week] = {};
        if (!acc[day_of_week][lesson_number]) acc[day_of_week][lesson_number] = [];
        acc[day_of_week][lesson_number].push(curr);
        return acc;
    }, {});

    const today = new Date().toLocaleDateString("ru-RU", { weekday: "long" });

    return (
        <div className="bg-gray-900">
            <div className="flex justify-center">
                <div className="overflow-x-auto mx-4 mt-6">
                    <div className="flex items-center space-x-4">
                        <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <>
                                    <div className="relative">
                                        <Listbox.Button className="relative w-48 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            <span className="block truncate">{selected.name}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {people.map((person) => (
                                                    <Listbox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            clsx(
                                                                active ? "bg-indigo-600 text-white" : "text-gray-900",
                                                                "relative cursor-default select-none py-2 pl-3 pr-9"
                                                            )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span
                                                                    className={clsx(
                                                                        selected ? "font-semibold" : "font-normal",
                                                                        "block truncate"
                                                                    )}
                                                                >
                                                                    {person.name}
                                                                </span>
                                                                {selected ? (
                                                                    <span
                                                                        className={clsx(
                                                                            active ? "text-white" : "text-indigo-600",
                                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                        <div className="flex items-center text-white pl-80 ">
                            <button onClick={() => setWeek((prev) => prev - 1)}>
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
                            <p className="text-2xl mx-4">
                                Расписание на{" "}
                                {week === getWeekNumber(new Date())
                                    ? "текущую неделю"
                                    : week - 1 === getWeekNumber(new Date())
                                        ? "следующую неделю"
                                        : week + 1 === getWeekNumber(new Date())
                                            ? "предыдущую неделю"
                                            : getStartDateFromWeekNumber(week).toLocaleDateString() +
                                            " - " +
                                            getEndDateFromWeekNumber(week).toLocaleDateString()}
                            </p>
                            <button onClick={() => setWeek((prev) => prev + 1)}>
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
                                        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <table className="table-auto border-collapse border border-slate-500 mt-4 mx-auto">
                        <thead>
                            <tr>
                                <th className="border border-slate-600 px-4 py-2 text-white">Time Slot</th>
                                {daysOfWeek.map((day) => (
                                    <th
                                        key={day}
                                        className={clsx(
                                            "border border-slate-600 px-4 py-2 text-white",
                                            day === today && "bg-red-600"
                                        )}
                                    >
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {timeSlots.map((timeSlot, i) => (
                                <tr key={timeSlot}>
                                    <td className="border border-slate-700 px-4 py-2 text-white">{timeSlot}</td>
                                    {daysOfWeek.map((day, j) => {
                                        const trainings = trainingByDayAndLesson[j + 1]?.[i + 1];
                                        return (
                                            <td
                                                key={day}
                                                className={clsx(
                                                    "border border-slate-700 px-4 py-2 text-white",
                                                    day === today && "bg-red-600"
                                                )}
                                            >
                                                {trainings && trainings.length > 0 ? (
                                                    trainings.map((training, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => {
                                                                setModalContent(
                                                                    <TrainingDetails
                                                                        data={training}
                                                                    />
                                                                );
                                                                openModal();
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="font-medium text-white text-s">
                                                                <strong>{training.lesson_name}</strong>
                                                            </div>
                                                            <div className="font-medium text-gray-500 text-xs">
                                                                {training.room}
                                                            </div>
                                                            <div className="font-medium text-gray-400 text-xs">
                                                                {training.teacher}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center">
                                                        <button onClick={() => {
                                                            setModalContent(
                                                                <>
                                                                    Отправьте заявку на бронирование зала для тренировки.
                                                                    Заявка будет рассмотрена менеджером спортклуба
                                                                </>
                                                            );
                                                            openModal()
                                                        }}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="gray"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                className="w-3 h-3 inline-block align-middle text-gray-800"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>

                        {/* <tbody>

                                {daysOfWeek.map((day, i) => (
                                    <tr key={i}>
                                        <th
                                            key={day}
                                            className={clsx(
                                                "border border-gray-500 p-2 text-sm text-gray-400",
                                                {
                                                    "bg-[#5aae3b] text-gray-900": day === today,
                                                },
                                                { "bg-gray-900 ": day !== today }
                                            )}
                                        >
                                            {day}
                                        </th>
                                        {timeSlots.map((timeSlot, j) => (
                                            <td
                                                key={j}
                                                className="border border-gray-500 p-2 text-xs text-gray-400 text-center"
                                                style={{ width: "calc(100% / 9)" }} // Равномерное распределение ширины столбцов
                                            >
                                                <button
                                                    onClick={() => {
                                                        setModalContent(<TrainingDetails  />);
                                                        openModal();
                                                    }}
                                                >
                                         
                                                    {days[j]?.lessons[i]?.map((training, k) => (
                                                        <div key={k}>
                                                            <div className="font-medium text-white text-s">
                                                                <strong>{training.nameOfLesson}</strong>
                                                            </div>
                                                            <div className="font-medium text-gray-500 text-xs">
                                                                {training.room}
                                                            </div>
                                                            <div className="font-medium text-gray-400 text-xs">
                                                                {training.teacher}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </button>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody> */}
                    </table>
                </div>
            </div>
        </div>
    );
}
