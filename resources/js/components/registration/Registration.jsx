import { useState } from "react";
import axiosClient from "@/public/axios";
import { useUI } from "@/context/use-ui";

export default function Registration() {
    const [error, setError] = useState({ __html: "" });
    const [vuzData, setVuzData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const { openModal, setModalContent } = useUI();

    const onSubmit = (e) => {
        e.preventDefault();
        setError({ __html: "" });

        axiosClient
            .post("/signup/vuz", vuzData)
            .then(({ data }) => {
                setModalContent(
                    <div className="p-6 bg-indigo-400 sm:rounded-lg flex flex-col items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mb-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                            />
                        </svg>
                        <p className="text-black text-center">
                            Регистрация прошла успешно. Ожидайте проверки администратора.
                        </p>
                    </div>
                );
                openModal();
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    setError({ __html: error.response.data });
                }
            });
    };

    return (
        <div className="bg-gray-900 p-6">
            <div className="flex justify-center">
                <h1 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900">
                    Форма регистрации ВУЗа
                </h1>
            </div>
            <form onSubmit={onSubmit}>
                <div className="px-96">
                    <div className="border-b border-white/10 pb-12 pt-6">
                        <div className="mt-10">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Название ВУЗа
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) =>
                                                setVuzData({
                                                    ...vuzData,
                                                    name: e.target.value,
                                                })
                                            }
                                            id="name"
                                            name="name"
                                            value={vuzData.name}
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
                                                setVuzData({
                                                    ...vuzData,
                                                    email: e.target.value,
                                                })
                                            }
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
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
                                                setVuzData({
                                                    ...vuzData,
                                                    phone: e.target.value,
                                                })
                                            }
                                            id="phone"
                                            name="phone"
                                            type="phone"
                                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
