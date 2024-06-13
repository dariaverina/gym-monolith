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
import Header from "./schedule/Header";
import GroupSelector from "./schedule/GroupSelector";
import EditNoteModal from "./UI/Modal/ModalContent/LessonDetails/EditNote";


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

    const [searchType, setSearchType] = useState('groupsSearch');
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    console.log('sel', selectedGroup)
    const [dragMode, setDragMode] = useState(false);

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
            <div className="cursor-pointer">
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
                    <div className="font-medium text-white text-xs">
                        {training.group_name}
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

    useEffect(() => {
        if (currentUser?.group_id) {
            const group = groups.find(group => group.id === currentUser.group_id);
            if (group) {
                setSelectedGroup(group); // Устанавливаем найденную группу в selectedGroup
            }
        }
    }, [currentUser, groups]);
    const fetchScheduleData = () => {
        if (searchType == 'mySearch') {
            const params = {
                week_number: week,
                teacher_name: currentUser.name,
            };
            axios
                .get("http://localhost:8000/api/schedule", { params })
                .then((res) => setTrainings(res.data))
                .catch((err) => console.error(err));
        }
        else {
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
        }

    };
    useEffect(() => {
        fetchScheduleData();
    }, [currentUser, selectedGroup, week, searchType]);

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

    console.log('t', trainings);
    const handleUpdateTraining = (updatedTraining) => {
        setTrainings((prevTrainings) => {
            const existingTrainingIndex = prevTrainings.findIndex((t) => t.id === updatedTraining.id);

            if (existingTrainingIndex !== -1) {
                // Обновить существующую тренировку
                const updatedTrainings = prevTrainings.map((t) =>
                    t.id === updatedTraining.id ? updatedTraining : t
                );
                return updatedTrainings;
            } else {
                // Добавить новую тренировку
                return [...prevTrainings, updatedTraining];
            }
        });
    };
    const handleDeleteTraining = (id) => {
        setTrainings((prevTrainings) => prevTrainings.filter((t) => t.id !== id));
    };


    function Cell({ day, timeSlot, training, onMove, dragMode }) {
        const [showTooltip, setShowTooltip] = useState(false);
        const [, ref] = useDrop({
            accept: ItemTypes.TRAINING,
            drop: (item) => {
                if (dragMode) {
                    onMove(item.training, day, timeSlot);
                }
            },
            canDrop: () => dragMode,
        });
// console.log('teacher',training)
        return (
            <td
                ref={ref}
                onClick={() => {
                    if ((currentUser.user_type === 'm' || currentUser.user_type === 'w') && dragMode) {
                        setModalContent(
                            <EditLessonModal
                                lesson={training}
                                day={day}
                                week_number={week}
                                time={timeSlot}
                                fetchScheduleData={fetchScheduleData}
                                onUpdateTraining={handleUpdateTraining}
                                onDeleteTraining={handleDeleteTraining}
                            />
                        );
                        openModal();
                    }
                    else if (currentUser.user_type === 't' && training && training[0].teacher === currentUser.name) {
                        setModalContent(
                            <EditNoteModal
                                lesson={training}
                                day={day}
                                week_number={week}
                                time={timeSlot}
                                fetchScheduleData={fetchScheduleData}
                                onUpdateTraining={handleUpdateTraining}
                                onDeleteTraining={handleDeleteTraining}
                                onSaveSchedule={saveSchedule}
                                trainings={trainings}
                            />
                        );
                        openModal();
                    }
                }}
                className={`relative border border-slate-700 w-32 h-24 text-xs text-center ${dragMode ? "bg-gray-600" : "bg-gray-900"
                    }`}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <button>
                    <div className="overflow-auto h-full relative">
                        {training && training.length > 0 ? (
                            training.map((training, index) => (
                                <Training key={index} training={training} />
                            ))
                        ) : (
                            <div className="text-center"></div>
                        )}
                    </div>
                </button>

                {training && training[0].note && training[0].note !== null && (
                    <>
                        <div className="absolute top-0 right-0 mt-1 mr-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 text-yellow-500"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                        </div>
                        {showTooltip && (
                            <div className="absolute right-0 bottom-6 bg-white text-gray-900 p-2 rounded-lg shadow-lg">
                                {training[0].note}
                            </div>
                        )}
                    </>
                )}
            </td>
        );
    }

    const saveSchedule = async () => {
        try {
            const response = await axios.put("http://localhost:8000/api/schedule/update", {
                schedule: trainings,
            });
            console.log(response.data.message);
            fetchScheduleData(); // Reload the schedule to reflect the latest changes
        } catch (error) {
            console.error("Error saving schedule:", error);
        }
    };

    const today = new Date().toLocaleDateString("ru-RU", { weekday: "long" });

    let notificationMethods = [
        { id: 'groupsSearch', title: 'Поиск по группам' },
        { id: 'logicSearch', title: 'Логический поиск' },
        { id: 'mySearch', title: 'Свое расписание', type: 't' },
    ]
    const filteredNotificationMethods = notificationMethods.filter(method => !method.type || method.type === currentUser.user_type);


    const [query, setQuery] = useState('(ПИбд-11 || ПИбд-12)');
    const handleChangeLogicQueue = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`/api/schedule/search?query=${query}`);
            setTrainings(response.data)
            onSearch(response.data); // Передаем результаты поиска родительскому компоненту
        } catch (error) {
            console.error('Ошибка при выполнении поиска:', error);
        }
    };
    useEffect(() => {
        if (currentUser && currentUser.user_type === 't') {
            setSearchType('mySearch');
        }
    }, [currentUser]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-gray-900">
                <div className="flex justify-center">
                    <div className="overflow-x-auto mx-4 mt-6">
                        <Header
                            dragMode={dragMode}
                            toggleDragMode={toggleDragMode}
                            saveSchedule={saveSchedule}
                            fetchScheduleData={fetchScheduleData}
                        />

                        <fieldset>
                            <div className="mt-6 mb-2 space-y-6 sm:flex sm:items-center sm:justify-evenly sm:space-y-0">
                                {filteredNotificationMethods.map((notificationMethod) => (
                                    <div key={notificationMethod.id} className="flex items-center">
                                        <input
                                            id={notificationMethod.id}
                                            name="notification-method"
                                            type="radio"
                                            checked={searchType === notificationMethod.id} // Проверяем, соответствует ли выбранному типу поиска
                                            className="h-4 w-4 border-gray-300 text-white focus:ring-indigo-600"
                                            onChange={() => setSearchType(notificationMethod.id)}
                                        />

                                        <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-white">
                                            {notificationMethod.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>


                        {searchType === 'groupsSearch' && (
                            <GroupSelector
                                groups={groups}
                                selectedGroup={selectedGroup}
                                setSelectedGroup={setSelectedGroup}
                            />
                        )}
                        {searchType === 'logicSearch' && (
                            <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={handleChangeLogicQueue}
                                    placeholder="Введите запрос..."
                                    className="border border-gray-300 px-2 py-1 rounded-md w-full"
                                />
                                <button type="submit" className="pt-2 pb-2 pr-4 pl-4 text-white bg-gray-700 rounded">
                                    Искать
                                </button>
                            </form>


                        )}

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
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="border border-slate-700 w-32 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">

                                    </th>
                                    {daysOfWeek.map((day) => (
                                        <th
                                            key={day}
                                            className={`border border-slate-700 w-32 text-center text-xs font-medium uppercase tracking-wider ${day === today ? "text-indigo-500" : "text-gray-300"
                                                }`}
                                        >
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800">
                                {timeSlots.map((timeSlot, i) => (
                                    <tr key={timeSlot}>
                                        <td className="border border-slate-700 w-32 text-center text-xs text-gray-300">{timeSlot}</td>
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
