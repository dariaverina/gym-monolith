import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import clsx from "clsx";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { userStateContext } from "@/context/context-provider";
import { useUI } from "@/context/use-ui";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EditLessonModal from "./UI/Modal/ModalContent/LessonDetails/EditLessonModal";

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

const ItemTypes = {
    TRAINING: "training",
};

export default function Schedule() {
    const { currentUser } = userStateContext();
    const [week, setWeek] = useState(getWeekNumber(new Date()));
    const [trainings, setTrainings] = useState([]);
    const { openModal, setModalContent } = useUI();

    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [dragMode, setDragMode] = useState(false);
    console.log('dragMode', dragMode);
    const toggleDragMode = () => {
        setDragMode(!dragMode);
    };

    const getGroups = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/groups");
            return response.data;
        } catch (error) {
            console.error("Error fetching groups:", error);
            return [];
        }
    };

    function Training({ training }) {
        const [, ref] = useDrag({
            type: ItemTypes.TRAINING,
            item: { training },
        });

        return (
            <div
                className="cursor-pointer"
            >
                <div ref={ref} className="cursor-pointer">
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
            </div>
        );
    }

    useEffect(() => {
        getGroups()
            .then((data) => setGroups(data))
            .catch((error) => console.error(error));
    }, []);

    const fetchScheduleData = () => {
        if (currentUser?.user_type && selectedGroup) {
            const params = {
                week_number: week,
                group_name: selectedGroup.name,
            };
            axios
                .get("http://localhost:8000/api/schedule", { params })
                .then((res) => setTrainings(res.data))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        fetchScheduleData();
    }, [currentUser, selectedGroup, week]);

    const trainingByDayAndLesson = trainings.reduce((acc, curr) => {
        const { day_of_week, lesson_number } = curr;
        if (!acc[day_of_week]) acc[day_of_week] = {};
        if (!acc[day_of_week][lesson_number]) acc[day_of_week][lesson_number] = [];
        acc[day_of_week][lesson_number].push(curr);
        return acc;
    }, {});

    const handleMoveTraining = (training, newDay, newTimeSlot) => {
        const updatedTrainings = trainings.map((t) => {
            if (t.id === training.id) {
                return { ...t, day_of_week: newDay, lesson_number: newTimeSlot };
            }
            return t;
        });
        setTrainings(updatedTrainings);
    };

    function Cell({ day, timeSlot, training, onMove, dragMode }) {
        const [, ref] = useDrop({
            accept: ItemTypes.TRAINING,
            drop: (item) => {
                if (dragMode) {
                    onMove(item.training, day, timeSlot);
                }
            },
            canDrop: () => dragMode,
        });

        return (
            <td
                ref={ref}
                onClick={() => {
                    setModalContent(<EditLessonModal lesson={training} fetchScheduleData={fetchScheduleData} />);
                    openModal();
                }}
                className={`border border-slate-700 w-32 h-24 text-xs text-center ${dragMode ? "bg-gray-600" : "bg-gray-900"
                    }`}
            >
                <button>
                  
                    <div className="overflow-auto h-full">
                        {training && training.length > 0 ? (
                            training.map((training, index) => (
                                <Training key={index} training={training} />
                            ))
                        ) : (
                            <div className="text-center">
            
                            </div>
                        )}
                    </div>
                </button>
            </td >

        );
    }

    const today = new Date().toLocaleDateString("ru-RU", { weekday: "long" });

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-gray-900">
                <div className="flex justify-center">
                    <div className="overflow-x-auto mx-4 mt-6">
                        <div className="flex justify-between items-center mb-2">
                            {!dragMode ? (
                                <div className="flex justify-center w-full">
                                    <button
                                        onClick={toggleDragMode}
                                        className="bg-green-400 text-gray-900 font-semibold py-2 px-4 rounded-lg"
                                    >
                                        Перейти в режим редактирования занятий
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center">
                                        <span className="text-red-500 font-semibold">
                                            Вы находитесь в режиме редактирования занятий!
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => { toggleDragMode(); fetchScheduleData() }}
                                            className="bg-red-400 text-gray-900 font-semibold py-2 px-4 rounded-lg"
                                        >
                                            Отменить
                                        </button>
                                        <button
                                            onClick={toggleDragMode}
                                            className="bg-green-400 text-gray-900 font-semibold py-2 px-4 rounded-lg"
                                        >
                                            Сохранить
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mb-4">
                            <Listbox value={selectedGroup} onChange={setSelectedGroup}>
                                {({ open }) => (
                                    <>
                                        <div className="relative">
                                            <Listbox.Button className="mt-4 relative w-full cursor-default rounded-md bg-gray-800 py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <span className="block truncate">
                                                    {selectedGroup ? selectedGroup.name : "Выберите группу"}
                                                </span>
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
                                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {groups.map((group) => (
                                                        <Listbox.Option
                                                            key={group.id}
                                                            className={({ active }) =>
                                                                clsx(
                                                                    active ? "bg-indigo-600 text-white" : "text-gray-900",
                                                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                                                )
                                                            }
                                                            value={group}
                                                        >
                                                            {({ selected, active }) => (
                                                                <>
                                                                    <span
                                                                        className={clsx(
                                                                            selected ? "font-semibold" : "font-normal",
                                                                            "block truncate"
                                                                        )}
                                                                    >
                                                                        {group.name}
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
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex-1 flex items-center justify-center text-white">
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
                        <table className="table-fixed border-collapse border border-slate-500 mt-4 mx-auto">
                            <thead>
                                <tr>
                                    <th className="w-32 h-12 border border-slate-700 px-4 py-2 text-white"></th>
                                    {daysOfWeek.map((day) => (
                                        <th
                                            key={day}
                                            className={clsx(
                                                "w-32 h-12 border border-slate-700 px-4 py-2 text-white",
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
                                        <td className="w-32 h-12 border border-slate-700 px-4 py-2 text-white">{timeSlot}</td>
                                        {daysOfWeek.map((day, j) => {
                                            const trainings = trainingByDayAndLesson[j + 1]?.[i + 1];
                                            return (
                                                <Cell
                                                    key={`${day}-${timeSlot}`}
                                                    day={j + 1}
                                                    timeSlot={i + 1}
                                                    training={trainings}
                                                    onMove={handleMoveTraining}
                                                    dragMode={dragMode}
                                                />
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
}
