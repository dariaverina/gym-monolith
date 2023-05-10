import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

export default function UsersListLine({ user }) {
    const [status, setStatus] = useState(user.status);

    const handleSubmit = async () => {
        // e.preventDefault();
        setStatus(status == 'a' ? 'n' : 'a')
        try {
          const response = await axios.patch(`/api/users/${user.id}`, { status: (status == 'a') ? 'n' : 'a'});
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      
    return (
        <tr key={user.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {user.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {user.email}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {user.user_type}
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <a
                    href={"clubs/" + user.id}
                    className="text-indigo-600 hover:text-indigo-900"
                >
                    Edit
                    <span className="sr-only">, {user.id}</span>
                </a>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <Switch
                    checked={status == "a"}
                    onChange={handleSubmit}
                    className={`${
                        status == "a" ? "bg-green-200" : "bg-red-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span className="sr-only">Enable notifications</span>
                    <span
                        className={`${
                            status == "a"
                                ? "translate-x-6"
                                : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </Switch>
            </td>
        </tr>
    );
}
