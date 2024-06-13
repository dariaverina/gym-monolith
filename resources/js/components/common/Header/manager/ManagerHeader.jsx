import { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useUI } from "@/context/use-ui";
import Auth from "../../../UI/Modal/ModalContent/Auth/Auth";
import { userStateContext } from "@/context/context-provider";
import axiosClient from "@/public/axios";

export default function ManagerHeader() {
  const { openModal, showLoader, hideLoader, setModalContent, displayModal } = useUI();
  const { currentUser, setCurrentUser, setUserToken } = userStateContext();
  console.log('user', currentUser);

  const logout = (e) => {
    e.preventDefault();
    axiosClient.post('/logout')
      .then(res => {
        setCurrentUser(undefined);
        setUserToken(null);
        window.location.href = "http://localhost:8000";
      });
  };

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        if (data) setCurrentUser(data);
      });
  }, []);

  return (
    <Popover className={clsx(
      currentUser && currentUser.user_type === 't' ? "bg-gradient-to-r from-[#150f35] from-10% via-[#b55742] via-50% to-[#150f35] to-90%" :
        currentUser && currentUser.user_type === 'm' ? "bg-gradient-to-r from-[#150f35] from-10% via-[#b55742] via-50% to-[#150f35] to-90%" :
          "bg-gradient-to-r from-gray-900 to-emerald-900",
      "relative"
    )}>
      <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true" />
      <div className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-5 px-6 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
          {/* <div>
            <a href="/" className="flex">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div> */}
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-white hover:bg-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">
              <Popover className="relative">
                <Popover.Button className="inline-flex items-center text-base font-medium text-white hover:text-white">
                  Пользователи
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-white" aria-hidden="true" />
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
                  <Popover.Panel className="absolute z-10 mt-3 w-56 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <a href="/users/workers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Сотрудники</a>
                      <a href="/users/teachers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Преподаватели</a>
                      <a href="/users/students" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Студенты</a>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>

              <a href="/schedule" className="text-base font-medium text-white hover:text-white">
                Расписание
              </a>

              <Popover className="relative">
                <Popover.Button className="inline-flex items-center text-base font-medium text-white hover:text-white">
                  Личный кабинет ВУЗа
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-white" aria-hidden="true" />
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
                  <Popover.Panel className="absolute z-10 mt-3 w-56 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <a href="/groups" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Группы</a>
                      <a href="/upload-schedule" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Загрузка расписания</a>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>

              <a href="/messages" className="flex items-center text-base font-medium text-white hover:text-white">
    <span>Сообщения</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
    </svg>
    <span class="ml-1">1</span>
</a>


            </Popover.Group>
            {currentUser && currentUser.name ? (
              <Popover className="relative text-white">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6">
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
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-40 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="grid grid-cols-1 divide-y divide-gray-900/5 bg-gray-50">
                      <a
                        key="account"
                        href="/account"
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                      >
                        Аккаунт
                      </a>
                      <a
                        onClick={logout}
                        href="http://localhost:8000/"
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                      >
                        Выйти
                      </a>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ) : (
              <div className="flex items-center md:ml-12">
                <a href="/register" className="text-base font-medium text-white">
                  Sign up
                </a>
                <button
                  onClick={() => {
                    setModalContent(<Auth />);
                    openModal();
                  }}
                  className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Sign in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
}
