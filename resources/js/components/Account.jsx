import React, { useState } from "react";
import Layout from "./common/Layout/Layout";
import { userStateContext } from '@/context/context-provider';
import MainTrainerContent from "./trainer/main-page/MainContent";
import MainClientContent from "./clients/main-page/MainContent";
import ClientAccount from "./clients/account/Account";

const UniversityEdit = () => {
    const [universityName, setUniversityName] = useState("УлГТУ");
    const [password, setPassword] = useState("********");
    const [scheduleLink, setScheduleLink] = useState("https://time.ulstu.ru/api/schedule");
    const [externalUsername, setExternalUsername] = useState("d.verina");
    const [externalPassword, setExternalPassword] = useState("********");

    const handleSave = () => {
        // Логика для сохранения деталей университета
        console.log("Сохранение деталей университета");
    };

    return (
        <div className="bg-gray-900 text-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">Редактирование информации об университете</h2>
            <div className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-sm font-medium">Название университета</label>
                    <input
                        type="text"
                        defaultValue={universityName}
                        onChange={(e) => setUniversityName(e.target.value)}
                        className="mt-1 p-2 w-full border rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Пароль</label>
                    <input
                        type="password"
                        defaultValue={"dlpwl"}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 w-full border rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Внешняя ссылка на расписание</label>
                    <input
                        type="text"
                        defaultValue={scheduleLink}
                        onChange={(e) => setScheduleLink(e.target.value)}
                        className="mt-1 p-2 w-full border rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Имя пользователя внешнего источника</label>
                    <input
                        type="text"
                        defaultValue={externalUsername}
                        onChange={(e) => setExternalUsername(e.target.value)}
                        className="mt-1 p-2 w-full border rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Пароль внешнего источника</label>
                    <input
                        type="password"
                        defaultValue={externalPassword}
                        onChange={(e) => setExternalPassword(e.target.value)}
                        className="mt-1 p-2 w-full border rounded text-black"
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
};

const Account = () => {
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();

    return (
        <div>
            {currentUser && currentUser.user_type === 't' ? (
                <ClientAccount />
            ) : currentUser && currentUser.user_type === 'c' && currentUser.name ? (
                <ClientAccount />
            ) : (
                <UniversityEdit />
            )}
        </div>
    );
};

export default Account;
