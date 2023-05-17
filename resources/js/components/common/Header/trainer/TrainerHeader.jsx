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

export default function TrainerHeader() {
    const { openModal, showLoader, hideLoader, setModalContent, displayModal } =
        useUI();
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    console.log("user", currentUser);

    const logout = (e) => {
        e.preventDefault();
        axiosClient.post("/logout").then((res) => {
            setCurrentUser(undefined);
            setUserToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            // console.log(data);
            data != undefined && setCurrentUser(data);
        });
    }, []);

    return (
        <Popover
            className={clsx(
                currentUser && currentUser.user_type == "t"
                    ? "bg-gradient-to-r from-[#150f35] from-10% via-[#b55742] via-50% to-[#150f35] to-90%"
                    : currentUser && currentUser.user_type == "m"
                    ? "bg-gradient-to-r from-[#150f35] from-10% via-[#b55742] via-50% to-[#150f35] to-90%"
                    : "bg-gradient-to-r from-[#150f35] from-10% via-[#b55742] via-50% to-[#150f35] to-90%",
                "relative"
            )}
        >
            {/* className="relative bg-green-50"> */}
            <div
                className="pointer-events-none absolute inset-0 z-30 shadow"
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
                            <a
                                href="/account"
                                className="text-base font-medium text-gray-300 hover:text-gray-100 hover:border-b-2"
                            >
                                Аккаунт
                            </a>
                            <a
                                href="/schedule"
                                className="text-base font-medium text-gray-300 hover:text-gray-100 hover:border-b-2"
                            >
                                Расписание
                            </a>
                            <a
                                href="/reporting"
                                className="text-base font-medium text-gray-300 hover:text-gray-100 hover:border-b-2"
                            >
                                Отчетность
                            </a>
                            <a
                                href="/reporting"
                                className="text-base font-medium text-gray-300 hover:text-gray-100 hover:border-b-2"
                            >
                                Связь с менеджером
                            </a>
                            {/* <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Docs
              </a> */}
                        </Popover.Group>
                            <Popover className="relative text-gray-300 hover:text-gray-100">
                                {currentUser.name}
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
                                    <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-40 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                        <div className="p-4"></div>
                                        <div className="grid grid-cols-1 divide-x divide-gray-900/5 bg-gray-50">
                                            <a
                                                key="account"
                                                href="/account"
                                                className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                            >
                                                account
                                            </a>
                                            {currentUser.account_type ==
                                                "m" && (
                                                <a
                                                    key="dashboard"
                                                    href="/dashboard"
                                                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                                >
                                                    dashboard
                                                </a>
                                            )}
                                            <button
                                                onClick={logout}
                                                className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                            >
                                                logout
                                            </button>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </Popover>
                        
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
