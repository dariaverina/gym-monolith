import React, { useState } from "react";
import { userStateContext } from "@/context/context-provider";
import { useUI } from "@/context/use-ui";
import axios from "axios";

export default function ClientAccount() {
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const { openModal, closeModal, showLoader, hideLoader, setModalContent, displayModal } = useUI();
    const [userData, setUserData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        password: "",
        user_type: "c",
        phone: currentUser.phone,
        photo: null,
    });
    const [telegramSettings, setTelegramSettings] = useState({
        telegramId: "",
        notificationFrequency: "",
        notifyFromTeachers: false,
        blacklist: [],
        notifyScheduleChanges: false,
    });
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [blacklistTeacher, setBlacklistTeacher] = useState("");
    const [activeTab, setActiveTab] = useState("personal");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPhoneError("");
        setEmailError("");
        setPasswordError("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            setEmailError("Недопустимый email-адрес");
            return;
        }

        const phoneRegex = /^\+?\d{10,}$/;
        if (!phoneRegex.test(userData.phone)) {
            setPhoneError("Недопустимый номер телефона");
            return;
        }

        try {
            const response = await axios.patch(`/api/users/${currentUser.id}`, {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                photo: userData.photo,
                password: userData.password ? userData.password : undefined,
                telegramSettings,
            });
            setModalContent(
                <div className="p-6 bg-gray-900 sm:rounded-lg flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="w-6 h-6 mb-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                        />
                    </svg>
                    <p className="text-white text-center">
                        Успешно обновлено!
                    </p>
                </div>
            );
            openModal();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addToBlacklist = () => {
        if (blacklistTeacher && !telegramSettings.blacklist.includes(blacklistTeacher)) {
            setTelegramSettings({
                ...telegramSettings,
                blacklist: [...telegramSettings.blacklist, blacklistTeacher],
            });
            setBlacklistTeacher("");
        }
    };

    const renderPersonalDataForm = () => (
        <div className="space-y-12 w-3/5">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Профиль
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Ваше имя
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        name: e.target.value,
                                    })
                                }
                                id="name"
                                name="name"
                                value={userData.name}
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Email адрес
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        email: e.target.value,
                                    })
                                }
                                id="email"
                                name="email"
                                value={userData.email}
                                className={`block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${emailError && "border-red-500"
                                    }`}
                            />
                            {emailError && (
                                <p className="mt-1 text-sm text-red-500">{emailError}</p>
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Номер телефона
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        phone: e.target.value,
                                    })
                                }
                                value={userData.phone}
                                id="phone"
                                name="phone"
                                type="phone"
                                className={`block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${phoneError && "border-red-500"
                                    }`}
                            />
                            {phoneError && (
                                <p className="mt-1 text-sm text-red-500">{phoneError}</p>
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Новый пароль
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        password: e.target.value,
                                    })
                                }
                                id="password"
                                name="password"
                                type="password"
                                value={userData.password}
                                className={`block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${passwordError && "border-red-500"
                                    }`}
                            />
                            {passwordError && (
                                <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Старый пароль
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        password: e.target.value,
                                    })
                                }
                                id="password"
                                name="password"
                                type="password"
                                value={userData.password}
                                className={`block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${passwordError && "border-red-500"
                                    }`}
                            />
                            {passwordError && (
                                <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTelegramSettingsForm = () => (
        <div className="space-y-12 w-3/5">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Настройки Telegram
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="telegramId"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Telegram ID
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) =>
                                    setTelegramSettings({
                                        ...telegramSettings,
                                        telegramId: e.target.value,
                                    })
                                }
                                id="telegramId"
                                name="telegramId"
                                value={telegramSettings.telegramId}
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="notificationFrequency"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Частота уведомлений
                        </label>
                        <div className="mt-2">
                            <select
                                onChange={(e) =>
                                    setTelegramSettings({
                                        ...telegramSettings,
                                        notificationFrequency: e.target.value,
                                    })
                                }
                                id="notificationFrequency"
                                name="notificationFrequency"
                                value={telegramSettings.notificationFrequency}
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            >
                                <option value="">Не уведомлять</option>
                                <option value="9:00">9:00</option>
                                <option value="12:00">12:00</option>
                                <option value="15:00">15:00</option>
                                <option value="18:00">18:00</option>
                                <option value="21:00">21:00</option>
                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="notifyFromTeachers"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Уведомления от преподавателей
                        </label>
                        <div className="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setTelegramSettings({
                                        ...telegramSettings,
                                        notifyFromTeachers: e.target.checked,
                                    })
                                }
                                id="notifyFromTeachers"
                                name="notifyFromTeachers"
                                checked={telegramSettings.notifyFromTeachers}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="blacklistTeacher"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Черный список преподавателей
                        </label>
                        <div className="mt-2 flex">
                            <input
                                onChange={(e) =>
                                    setBlacklistTeacher(e.target.value)
                                }
                                id="blacklistTeacher"
                                name="blacklistTeacher"
                                value={blacklistTeacher}
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                            <button
                                type="button"
                                onClick={addToBlacklist}
                                className="ml-2 rounded-md bg-indigo-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Добавить
                            </button>
                        </div>
                        <div className="mt-2">
                            {telegramSettings.blacklist.length > 0 && (
                                <ul className="list-disc list-inside text-white">
                                    {telegramSettings.blacklist.map((teacher, index) => (
                                        <li key={index}>{teacher}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="notifyScheduleChanges"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Уведомлять об изменениях в расписании
                        </label>
                        <div className="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setTelegramSettings({
                                        ...telegramSettings,
                                        notifyScheduleChanges: e.target.checked,
                                    })
                                }
                                id="notifyScheduleChanges"
                                name="notifyScheduleChanges"
                                checked={telegramSettings.notifyScheduleChanges}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-900">
            <div className="container mx-auto px-4 py-6 bg-gray-900">
                <div className="flex justify-center space-x-4 mb-8">
                    <button
                        onClick={() => setActiveTab("personal")}
                        className={`px-4 py-2 rounded-md ${activeTab === "personal" ? "bg-indigo-900 text-white" : "bg-gray-700 text-gray-300"
                            }`}
                    >
                        Личные данные
                    </button>
                    <button
                        onClick={() => setActiveTab("telegram")}
                        className={`px-4 py-2 rounded-md ${activeTab === "telegram" ? "bg-indigo-900 text-white" : "bg-gray-700 text-gray-300"
                            }`}
                    >
                        Настройки бота
                    </button>
                </div>
                <form>
                    {activeTab === "personal" ? renderPersonalDataForm() : renderTelegramSettingsForm()}
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={(e) => handleSubmit(e)}
                            className="rounded-md bg-indigo-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
