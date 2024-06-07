import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import UsersListLine from "./UserListLine/UserListLine";
import { useUI } from "@/context/use-ui";
import CreateUserModal from "../CreateUserModal";
import { getGroups } from "../../../../../api/groupApi";
import { getStudents } from "../../../../../api/get-users";

export default function UsersList() {
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    console.log('selected',selectedGroup)
    const { openModal, closeModal, showLoader, hideLoader, setModalContent, displayModal } = useUI();


    const fetchUsers = () => {
        getStudents()
            .then((data) => setUsers(data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getGroups()
            .then((data) => setGroups(data))
            .catch((error) => console.error(error));
        fetchUsers();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleGroupChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedGroup === "" || user.group_name === selectedGroup)
        );
    });

    return (
        <div className="px-4 pt-10 sm:px-6 lg:px-8 bg-gray-900">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-white">
                        Студенты
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Список всех студентов.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex space-x-2">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Загрузить
                    </button>
                    <button
                        onClick={() => {
                            setModalContent(<CreateUserModal groups = {groups} fetchUsers={fetchUsers}/>);
                            openModal();
                        }}
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Создать
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Поиск по имени"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="block w-1/4 h-6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <select
                    value={selectedGroup}
                    onChange={handleGroupChange}
                    className="block w-1/4 mt-2 h-6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="">Все группы</option>
                    {groups.map((group) => (
                        <option key={group.id} value={group.name}>{group.name}</option>
                    ))}
                </select>
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
                                    {filteredUsers.map((user) => (
                                        <UsersListLine key={user.id} user={user} groups = {groups} fetchUsers={fetchUsers}/>
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
