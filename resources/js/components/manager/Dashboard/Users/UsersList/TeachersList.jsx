import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import UsersListLine from "./UserListLine/UserListLine";

export default function TeachersList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("/api/users")
            .then((response) => response.json())
            .then((data) => setUsers([{id: 1, name: "Мартышева Тамара Сергеевна", user_type: "ПиБД-42", email: "mart@gmail.com"}, {id: 1, name: "Симонов Никита Константинович", user_type: "ПиБД-42", email: "nikita@gmail.com", status: "a"}]))
            .catch((error) => console.error(error));
    }, []);
    return (
        <div className="px-4 pt-10 sm:px-6 lg:px-8 bg-gray-900">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-white">
                        Преподаватели
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Список всех преподавателей.
                    </p>
                </div>
                <div className="mt-4 sm:ml-1a6 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Создать
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-white ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-900">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                                        >
                                            Имя
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                        >
                                            Почта
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                        >
                                            Группа
                                        </th>
                                        
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                        >
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                        >
                                            Активен
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                        >
                                            Редактировать
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700 bg-gray-900">
                                    {users &&
                                        users.map((user) => (
                                            <UsersListLine user={user} />
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
