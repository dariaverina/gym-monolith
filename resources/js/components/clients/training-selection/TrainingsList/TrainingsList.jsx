import axios from "axios";
import { useState, useEffect } from "react";
import { userStateContext } from "@/context/context-provider";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const statuses = {
    Paid: "text-green-700 bg-green-50 ring-green-600/20",
    Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
    Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};

const clients = [
    {
        id: 1,
        name: "Tuple",
        imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
        lastInvoice: {
            date: "December 13, 2022",
            dateTime: "2022-12-13",
            amount: "$2,000.00",
            status: "Overdue",
        },
    },
    {
        id: 2,
        name: "SavvyCal",
        imageUrl:
            "http://localhost:8000/storage/photos/VLCIkcFiwDnYmyGHUoSByuMZJ5Yc3vh7v2cIhDzn.jpg",
        lastInvoice: {
            date: "January 22, 2023",
            dateTime: "2023-01-22",
            amount: "$14,000.00",
            status: "Paid",
        },
    },
    {
        id: 3,
        name: "Reform",
        imageUrl: "https://tailwindui.com/img/logos/48x48/reform.svg",
        lastInvoice: {
            date: "January 23, 2023",
            dateTime: "2023-01-23",
            amount: "$7,600.00",
            status: "Paid",
        },
    },
    {
        id: 4,
        name: "Reform",
        imageUrl: "https://tailwindui.com/img/logos/48x48/reform.svg",
        lastInvoice: {
            date: "January 23, 2023",
            dateTime: "2023-01-23",
            amount: "$7,600.00",
            status: "Paid",
        },
    },
];
export default function TrainingsList() {
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const [trainings, setTrainings] = useState([]);
    useEffect(() => {
        axios
            .get("/api/trainings")
            .then((res) => setTrainings(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleJoinTraining = (trainingId) => {
        axios
            .post("/trainingparticipant", {
                user_id: currentUser.id,
                training_id: trainingId,
            })
            .then((response) => {
                console.log(response.data);
            });
    };
    return (
        <>
            {trainings && trainings.length > 1 && (
                <ul
                    role="list"
                    className="p-6 w-3/4 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
                >
                    {trainings.map((training) => (
                        <li
                            key={training.id}
                            className="overflow-hidden rounded-xl border border-gray-200 h-64"
                        >
                            <div className="flex bg-gradient-to-r from-indigo-400 to-indigo-500 items-center gap-x-4 border-b border-gray-900/5  p-6">
                                <img
                                    src={"/storage/" + training.trainer.photo}
                                    alt={"trainer-photo"}
                                    className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                                />
                                <div className="text-sm font-medium leading-6 text-gray-900">
                                    <p className="text-base">{training.training_variation.name}</p>
                                    <p className="text-sm font-light">{training.trainer.name}</p>
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
                                                        href="#"
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
                                                                training.trainer
                                                                    .name
                                                            }
                                                        </span>
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
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
                                                                training.trainer
                                                                    .name
                                                            }
                                                        </span>
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>

                            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-gray-500">
                                        Last invoice
                                    </dt>
                                    <dd className="text-gray-700">
                                        {/* <time dateTime={client.lastInvoice.dateTime}>{client.lastInvoice.date}</time> */}
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
                                onClick={() => handleJoinTraining(training.id)}
                                className="rounded-md bg-indigo-900 px-3 py-2 text-sm font-semibold text-indigo-200 shadow-sm  hover:bg-indigo-800"
                            >
                                Записаться
                            </button></div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
