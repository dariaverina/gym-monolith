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
import TrainingDetailsCustomer from "./UI/Modal/ModalContent/TrainingDetails/TrainingDetailsCustomer";
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Caroline Schultz' },
    { id: 8, name: 'Mason Heaney' },
    { id: 9, name: 'Claudie Smitham' },
    { id: 10, name: 'Emil Schaefer' },
]

const days = [
    {
        "day": 0,
        "lessons": [
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "лек.Тестирование программного обеспечения",
                    "teacher": "Романов А А",
                    "room": "3-420"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "пр.Физическая культура и спорт",
                    "teacher": "Преподаватели кафедры",
                    "room": "2-СЗ"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Вычислительная математика- 1 п/г",
                    "teacher": "Чекина А В",
                    "room": "3-418/3"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Вычислительная математика- 1 п/г",
                    "teacher": "Чекина А В",
                    "room": "3-418/3"
                }
            ],
            [

            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Методы моделирования- 2 п/г",
                    "teacher": "Евсеева О Н",
                    "room": "3-ДОТ"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Методы моделирования- 2 п/г",
                    "teacher": "Евсеева О Н",
                    "room": "3-ДОТ"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Основы XML-технологий",
                    "teacher": "Токмаков Г П Предприятие",
                    "room": "0-0"
                }
            ]
        ]
    },
    {
        "day": 1,
        "lessons": [
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "лек.Методы искусственного интеллекта",
                    "teacher": "Воронина В В",
                    "room": "3_3"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "лек.Компьютерная графика",
                    "teacher": "Воронина В В",
                    "room": "3_3"
                }
            ],
            [

            ],
            [

            ],
            [

            ],
            [

            ],
            [

            ],
            [

            ]
        ]
    },
    {
        "day": 2,
        "lessons": [
            [

            ],
            [

            ],
            [

            ],
            [

            ],
            [

            ],
            [

            ],
            [

            ],
            [

            ]
        ]
    },
    {
        "day": 3,
        "lessons": [
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Методы искусственного интеллекта- 2 п/г",
                    "teacher": "Дырночкин А А",
                    "room": "3-418/3"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Методы искусственного интеллекта- 2 п/г",
                    "teacher": "Дырночкин А А",
                    "room": "3-418/3"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Безопасность жизнедеятельности- 1 п/г",
                    "teacher": "Кодолова Ф Н",
                    "room": "5-103"
                },
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Компьютерная графика- 2 п/г",
                    "teacher": "Петрушан Н И",
                    "room": "3-418/1"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Тестирование программного обеспечения- 1 п/г",
                    "teacher": "Романов А А",
                    "room": "3-429"
                },
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Право интелектуальной собственности- 2 п/г",
                    "teacher": "Скворцов С В",
                    "room": "3-306"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Тестирование программного обеспечения- 1 п/г",
                    "teacher": "Романов А А",
                    "room": "3-429"
                }
            ],
            [

            ],
            [

            ],
            [

            ]
        ]
    },
    {
        "day": 4,
        "lessons": [
            [

            ],
            [

            ],
            [

            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Проектирование и архитектура программных систем- 2 п/г",
                    "teacher": "Корунова Н В",
                    "room": "3-424/1"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Проектирование и архитектура программных систем- 2 п/г",
                    "teacher": "Корунова Н В",
                    "room": "3-424/1"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Проектирование и архитектура программных систем- 1 п/г",
                    "teacher": "Корунова Н В",
                    "room": "3-424/1"
                }
            ],
            [
                {
                    "group": "ПИбд-32",
                    "nameOfLesson": "Лаб.Проектирование и архитектура программных систем- 1 п/г",
                    "teacher": "Корунова Н В",
                    "room": "3-424/1"
                }
            ],
            [

            ]
        ]
    },
    {
        "day": 5,
        "lessons": [
            [

            ],
            [

            ],
            [

            ],
            [

            ],
            [

            ],
            [

            ],
            [

            ],
            [

            ]
        ]
    }
]

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
    const year = new Date().getFullYear();
    const firstDayOfYear = new Date(year, 0, 1);
    const daysToAdd = (weekNumber - 1) * 7;
    const startDayOfWeek = 1; // 1 corresponds to Monday
    const offset = startDayOfWeek - firstDayOfYear.getDay();
    const startDate = new Date(firstDayOfYear.getTime() + (offset * 24 * 60 * 60 * 1000) + (daysToAdd * 24 * 60 * 60 * 1000));
    const endDate = new Date(startDate.getTime() + (6 * 24 * 60 * 60 * 1000));
    return endDate;
}
// Вместо времени из базы данных, создайте массив с порядковыми номерами пар
const timeSlots1 = ["1 пара", "2 пара", "3 пара", "4 пара", "5 пара", "6 пара", "7 пара", "8 пара"];


export default function Schedule() {
    const [selected, setSelected] = useState(people[3])
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
            .then((res) => setTimeSlots(timeSlots1))
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

        currentUser?.user_type == 'c' && currentUser?.id && axios
            .get("/api/trainings",
                {
                    params: {
                        client_id: currentUser.id,
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
        <>
            {/* {currentUser.user_type !== 'm' ? ( */}
            <div className="bg-gray-900">
                {/* <div className="flex items-center justify-center pt-10 flex-col text-white">
                    <div className="flex items-center gap-4">
                        кнопки для переключения недели
                    </div>
                </div> */}

                <div className="flex justify-center">
                    <div className="overflow-x-auto mx-4 mt-6"> {/* Добавлен отступ от края экрана */}


                        <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <>
                                    <div className="relative">
                                        <Listbox.Button className="relative w-1/6 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-1/6 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {people.map((person) => (
                                                    <Listbox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            clsx(
                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                    {person.name}
                                                                </span>

                                                                {selected ? (
                                                                    <span
                                                                        className={clsx(
                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
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





                        <table className="border-collapse border border-gray-500 mt-5 ">
                            <thead>
                                <tr>
                                    <th className="border border-gray-500 p-2 bg-gray-900"></th>
                                    {/* Итерация по номерам пар */}
                                    {timeSlots.map((timeSlot, index) => (
                                        <th
                                            key={index}
                                            className="border border-gray-500 p-2 text-sm text-gray-400 text-center"
                                            style={{ width: "calc(100% / 9)" }} // Равномерное распределение ширины столбцов
                                        >
                                            {index + 1} пара
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Итерация по дням недели */}
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
                                        {/* Итерация по номерам пар */}
                                        {timeSlots.map((timeSlot, j) => (
                                            <td
                                                key={j}
                                                className="border border-gray-500 p-2 text-xs text-gray-400 text-center"
                                                style={{ width: "calc(100% / 9)" }} // Равномерное распределение ширины столбцов
                                            >
                                                {/* Вывод уроков для данного дня и номера пары */}
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
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* ) : (
          <h1 className="bg-gray-900">404</h1>
        )} */}
        </>

    );
}
