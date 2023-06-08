import axios from "axios";
import { useState, useEffect } from "react";
import { userStateContext } from "@/context/context-provider";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useUI } from '@/context/use-ui';
import Auth from "../../../UI/Modal/ModalContent/Auth/Auth";

const statuses = {
    Paid: "text-green-700 bg-green-50 ring-green-600/20",
    Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
    Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};

export default function TrainingsList({ trainings, setTrainings, currentFilters }) {
    console.log('trainings', trainings)
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const { displayModal, closeModal, openModal, modalContent, setModalContent } = useUI();
    const [error, setError] = useState(null);
    const handleJoinTraining = (trainingId) => {
        axios
            .post("/trainingparticipant", {
                user_id: currentUser.id,
                training_id: trainingId,
            })
            .then((response) => {
                console.log(response.data);
                axios
                .get(
                    `/api/trainings?filter=true&training_variations=${currentFilters.find(({ id }) => id === 1)?.items.join(",")}
                        &training_timings=${currentFilters.find(({ id }) => id === 2)?.items.join(",")}&user_id=${currentUser.id}`
                )
                .then((res) => setTrainings(res.data))
                .catch((err) => console.log(err));
            })
            .catch((responseError) => {
                setError(responseError.response.data.message);
                console.log(responseError.response.data.message)
                if(responseError.response.data.message == 'Войдите в аккаунт прежде чем записываться на тренировку.'){
                    setModalContent(<Auth/>);
                    openModal()
                }
                if(responseError.response.data.message == 'Вы уже записаны на эту тренировку.'){
                    setModalContent(<div className="p-6 bg-red-400  sm:rounded-lg">Вы уже записаны на эту тренировку.</div>);
                    openModal()
                }
            });
    };

    const handleLeaveTraining = (trainingId) => {
        axios
            .delete(`/trainingparticipant?training_id=${trainingId}&user_id=${currentUser.id}`)
            .then((response) => {
                console.log(response.data);
                axios
                .get(
                    `/api/trainings?filter=true&training_variations=${currentFilters.find(({ id }) => id === 1)?.items.join(",")}
                        &training_timings=${currentFilters.find(({ id }) => id === 2)?.items.join(",")}&user_id=${currentUser.id}`
                )
                .then((res) => setTrainings(res.data))
                .catch((err) => console.log(err));
            })
    };
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

    return (
        <>
            {trainings && trainings.length > 0 ? (
                <div
                    // role="list"
                    className="items-start justify-start p-6 w-3/4 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 bg-gray-900"
                >
                    {trainings.map((training) => (
                        <div class="rounded-xl bg-gradient-to-b from-purple-400 via-red-400 to-orange-400 p-0.5 h-64">
                            <div
                                key={training.id}
                                className="overflow-hidden rounded-xl   h-full bg-gray-900"
                            >
                                <div className="flex bg-gray-900 items-center gap-x-4 border-b border-gray-900/5  p-5">
                                    <img
                                        src={
                                            "/storage/" + training.trainer.photo
                                        }
                                        alt={"trainer-photo"}
                                        className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                                    />
                                    <div className="text-sm font-medium leading-6 text-white">
                                        <p className="text-base">
                                            {training.training_variation.name}
                                        </p>
                                        <p className="text-sm font-light">
                                            {training.trainer.name}
                                        </p>
                                    </div>
                                    <Menu as="div" className="relative ml-auto">
                                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">
                                                Open options
                                            </span>
                                            <EllipsisHorizontalIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-gray-200 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href={`/trainers/${training.trainer.id}`}
                                                            className={clsx(
                                                                active
                                                                    ? "bg-gray-50"
                                                                    : "",
                                                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                            )}
                                                        >
                                                            Подробнее о тренере
                                                            <span className="sr-only">
                                                                ,{" "}
                                                                {
                                                                    training
                                                                        .trainer
                                                                        .name
                                                                }
                                                            </span>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                {/* <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={clsx(
                                                                active
                                                                    ? "bg-gray-50"
                                                                    : "",
                                                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                            )}
                                                        >
                                                            В избранное
                                                            <span className="sr-only">
                                                                ,{" "}
                                                                {
                                                                    training
                                                                        .trainer
                                                                        .name
                                                                }
                                                            </span>
                                                        </a>
                                                    )}
                                                </Menu.Item> */}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>

                                <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                    <div className="flex justify-between gap-x-4 py-3">
                                        <dt className="text-gray-500">
                                            <time
                                                dateTime={training.updated_at}
                                            >
                                                {
                                                    daysOfWeek[
                                                        training.day_of_week - 1
                                                    ]
                                                }
                                                ,{" "}
                                                {new Date(training.training_date).toLocaleDateString("ru-RU", {day: "numeric",month: "long"})}
                                                ,{" "}
                                                {timeSlots[
                                                    training.time_id - 1
                                                ]?.start_time.slice(0, -3)}{" "}
                                                -{" "}
                                                {timeSlots[
                                                    training.time_id - 1
                                                ]?.end_time.slice(0, -3)}
                                            </time>
                                        </dt>
                                        <dd className="text-gray-700">
                                            {/* <time dateTime={training.updated_at}>
                                        {daysOfWeek[training.day_of_week - 1]}, {timeSlots[training.time_id - 1]?.start_time.slice(0, -3)} - {timeSlots[training.time_id - 1]?.end_time.slice(0, -3)}
                                    </time> */}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between gap-x-4 py-3">
                                        <dt className="text-gray-500">
                                            Свободных мест
                                        </dt>
                                        <dd className="flex items-start gap-x-2">
                                            <div className="rounded-md py-1 px-2 font-medium ring-1 ring-inset text-indigo-300">
                                                {training.free_slots +
                                                    "/" +
                                                    training.capacity}
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            {
                                                training.is_registered
                                                ? handleLeaveTraining(training.id)
                                                : handleJoinTraining(training.id)
                                            }
                                        }
                                        // disabled={training.is_registered}
                                        className={clsx(
                                            training.is_registered
                                                ? "bg-gray-800 hover:bg-gray-700"
                                                : "bg-indigo-900 hover:bg-indigo-800",
                                            "rounded-md px-3 py-2 text-sm font-semibold text-indigo-200 shadow-sm  "
                                        )}
                                    >
                                        {training.is_registered? 'Отменить запись' :'Записаться'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-white bg-gray-900 p-6">
                    По вашему запросу ничего не найдено 
                </div>
            )}
        </>
    );
}
