import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useUI } from "@/context/use-ui";
import { updateUser } from "../../../../api/update-user"; 

export default function EditUserModal({ user, groups, fetchUsers }) {
    const { closeModal, showLoader, hideLoader } = useUI();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [selectedGroup, setSelectedGroup] = useState(groups.find(group => group.id === user.group_id));
    const handleSubmit = async (e) => {
        e.preventDefault();
        showLoader();

        try {
            const userData = {
                name,
                email,
                user_type: user.user_type,
                group_id: selectedGroup.id,
                status: user.status
            };

            const updatedUser = await updateUser(user.id, userData);

            if (updatedUser) {
                console.log('User updated successfully:', updatedUser);
                fetchUsers();
            }

            closeModal();
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            hideLoader();
        }
    };

    return (
        <div className="p-6 bg-gray-900 rounded-3xl">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Имя</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Почта</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Группа</label>
                        <Listbox value={selectedGroup} onChange={setSelectedGroup}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
                                    <span className="block truncate">{selectedGroup.name}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        {/* <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                                    </span>
                                </Listbox.Button>

                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {groups.map((group, groupIdx) => (
                                        <Listbox.Option
                                            key={group.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                }`
                                            }
                                            value={group}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                    >
                                                        {group.name}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Listbox>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            onClick={closeModal}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
