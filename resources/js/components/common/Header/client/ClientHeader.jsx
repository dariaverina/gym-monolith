import { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    BookmarkSquareIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ComputerDesktopIcon,
    CursorArrowRaysIcon,
    GlobeAltIcon,
    InformationCircleIcon,
    NewspaperIcon,
    PlayIcon,
    ShieldCheckIcon,
    Squares2X2Icon,
    UserGroupIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    ArrowPathIcon,
    ChartPieIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useUI } from "@/context/use-ui";
import Auth from "../../../UI/Modal/ModalContent/Auth/Auth";
import { userStateContext } from "@/context/context-provider";
import axiosClient from "@/public/axios";

export default function ClientHeader() {
    const { openModal, showLoader, hideLoader, setModalContent, displayModal } =
        useUI();
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    console.log("user", currentUser);

    const logout = (e) => {
        e.preventDefault();
        axiosClient.post("/logout").then((res) => {
            setCurrentUser(undefined);
            setUserToken(null);
            window.location.href = "/";
        });
    };
    const fakeMessages = [
        {
            "author": "Иванов Иван Иванович",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSq3mP1mD5I81Fzx6s_2QTvRVnBKPmR9vMThBo8-LdRQ&s",
            "message": "Здравствуйте! Напоминаю, что завтра у нас лекция по математике в 10:00."
        },
        {
            "author": "Воронин Константин Николаевич",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToBr4T5LEeqx7i0ZVu6VrLUJc8-4IN9IiRuecSf5MEwQ&s",
            "message": "Добрый день! Пожалуйста, не забудьте сдать домашнее задание до конца недели."
        },
        {
            "author": "Александрова Марина Юрьевна",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQIqyZ9mINq3Zkq_kbN0S3laRNHmitYTZdtT1622CADml7Q0VAcB3PiqXULzY7kGpOFr4&usqp=CAU",
            "message": "Приветствую всех! Напоминаю о предстоящем тестировании на следующей неделе."
        }]

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            // console.log(data);
            data != undefined && setCurrentUser(data);
        });
    }, []);

    return (
        <Popover
            className=" bg-gradient-to-r from-[#150f35] from-10% via-[#b55742] via-50% to-[#150f35] to-90% relative"
        >
            {/* className="relative bg-green-50"> */}
            <div
                className="pointer-events-none absolute inset-0 z-30"
                aria-hidden="true"
            />
            <div className="relative z-20">
                <div className="mx-auto flex max-w-7xl items-center justify-between py-5 px-6 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
                    <div>
                        <a href="/" className="flex">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
                        <Popover.Group as="nav" className="flex space-x-10">
                            {!currentUser?.id &&
                                <a
                                    href="/aboutus"
                                    className="text-base font-medium text-white hover:text-gray-100 hover:border-b-2"
                                >
                                    О сайте
                                </a>}

                            {/* <a
                                href="/trainers"
                                className="text-base font-medium text-white hover:text-gray-100 hover:border-b-2"
                            >
                                Тренеры
                            </a>
                            <a
                                href="/training-for-you"
                                className="text-base font-medium text-white hover:text-gray-100 hover:border-b-2"
                            >
                                Подбор тренировки
                            </a> */}
                            {currentUser?.id &&
                                <> <a
                                    href="/schedule"
                                    className="text-base font-medium text-white hover:text-gray-100 hover:border-b-2"
                                >
                                    Расписание
                                </a>
                                    <a
                                        href="/bot"
                                        className="text-base font-medium text-white hover:text-gray-100 hover:border-b-2"
                                    >
                                        Настройка бота
                                    </a></>}
                            {/* <a
                                href="/help"
                                className="text-base font-medium text-white hover:text-gray-100 hover:border-b-2"
                            >
                                Связь с поддержкой
                            </a> */}
                            {/* <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Docs
              </a> */}
                        </Popover.Group >
                        {currentUser && currentUser.name ? (
                            <Popover.Group className="flex">
                                <Popover className="relative text-gray-300 hover:text-gray-100 mt-2 mr-4">
                                    <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300 hover:text-gray-100">
                                        3
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                        </svg>
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="bg-gray-100 absolute transform -translate-x-1/2 left-1/2  z-100 mt-3 w-[400px] overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5">
                                            <div className="p-4">
                                                {fakeMessages.map((msg, index) => (
                                                    <div key={index} className="flex items-start mb-4">
                                                        <img src={msg.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                                                        <div>
                                                            <div className="font-semibold text-gray-400">{msg.author}</div>
                                                            <div className="text-gray-600">{msg.message}</div> {/* Выводим сообщение */}
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="flex items-start mb-4">
                                                    <button className="text-blue-700 hover:underline" onClick={() => { /* Действие по нажатию */ }}>
                                                        Просмотреть все уведомления
                                                    </button>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </Popover>
                                <Popover className="relative text-gray-300 hover:text-gray-100">
                                    <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300 hover:text-gray-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-10 h-10"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>

                                        {currentUser.name}
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute -left-8 top-full z-100 mt-3 w-40 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                            <div className=""></div>
                                            <div className="grid grid-cols-1 divide-x divide-gray-900/5 bg-gray-50">
                                                <a
                                                    key="account"
                                                    href="/account"
                                                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                                >
                                                    Аккаунт
                                                </a>
                                                <button
                                                    onClick={logout}
                                                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                                >
                                                    Выйти
                                                </button>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </Popover>
                            </Popover.Group>

                            // </Popover>
                        ) : (
                            <div className="flex items-center md:ml-12">
                                <button
                                    onClick={() => {
                                        setModalContent(<Auth />);
                                        openModal();
                                    }}
                                    className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Войти
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            ></Transition>
        </Popover>
    );
}
