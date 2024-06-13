import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useUI } from "@/context/use-ui";
import EditUserModal from "./../../EditUserModal";
import { userStateContext } from "@/context/context-provider";
import EditTeacherModal from "../../EditTeacherModal";

export default function UsersListLine({ user, groups, fetchUsers }) {

    const [privilege, setPrivilege] = useState(user.privilege);
    const { currentUser } = userStateContext();
    const { openModal, setModalContent } = useUI();
    const handleSubmit = async () => {
        setPrivilege(privilege === 'a' ? 'n' : 'a');
        try {
            const response = await axios.patch(`/api/users/${user.id}`, { privilege: privilege === 'a' ? 'n' : 'a' });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    console.log('us', user)
    const handleEdit = () => {
        setModalContent(
            user.user_type === 't'
                ? <EditTeacherModal user={user} groups={groups} fetchUsers={fetchUsers} />
                : <EditUserModal user={user} groups={groups} fetchUsers={fetchUsers} />
        );
        openModal();
    };

    return (
        <tr key={user.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                {user.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {user.email}
            </td>
            {user.user_type === 'c' &&
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {user.group_name}
                </td>
            }
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            </td>
            {user.user_type === 't' &&
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <Switch
                        checked={privilege === "a"}
                        onChange={handleSubmit}
                        className={`${privilege === "a" ? "bg-green-400" : "bg-red-400"} relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                        <span className="sr-only">Enable notifications</span>
                        <span className={`${privilege === "a" ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                    </Switch>
                </td>}
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <button onClick={handleEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
            </td>
        </tr>
    );
}
