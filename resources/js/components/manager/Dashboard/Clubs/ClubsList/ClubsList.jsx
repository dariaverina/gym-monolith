import { useEffect, useState } from "react";

export default function ClubsList() {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        fetch("/api/clubs")
            .then((response) => response.json())
            .then((data) => setClubs(data))
            .catch((error) => console.error(error));
    }, []);
    return (
        <div className="px-4 pt-10 sm:px-6 lg:px-8 bg-gray-900">
            <div className="sm:flex sm:items-center pt-10">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-white ">
                        Клубы
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Список всех клубов
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <a
                        href={"clubs/new-club"}
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Добавить клуб
                    </a>
                </div>
            </div>
            <div className="mt-8 flow-root ">
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
                                            Название
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                        >
                                            Адрес
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        >
                                            <span className="sr-only">
                                                Редактировать
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700 bg-gray-900">
                                    {clubs &&
                                        clubs.map((club) => (
                                            <tr key={club.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                                                    {club.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {club.address}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <a
                                                        href={
                                                            "/clubs/" +
                                                            club.id
                                                        }
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Редактировать
                                                        <span className="sr-only">
                                                            , {club.seo_name}
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
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
