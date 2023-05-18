import { userStateContext } from "@/context/context-provider";
import { useState } from "react";
import axiosClient from "@/public/axios";
// import { useNavigate } from 'react-router-dom';
import { useUI } from "@/context/use-ui";

export default function Auth() {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const [error, setError] = useState(null);
    const { displayModal, closeModal, modalContent } = useUI();
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient
            .post("/login", userData)
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
                closeModal();
            })
            .catch((responseError) => {
                setError(responseError.response.data.error);
            });
    };
    return (
        <>
            <div className="flex flex-col justify-center  bg-gradient-to-b from-indigo-900 to-white py-8 px-8 sm:rounded-lg">
                <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="flex justify-center"><svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="black"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-16 h-16 border-2 border-black rounded-full px-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                        </svg></div>
                        <form className="space-y-6 " action="#" method="POST">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                email: e.target.value,
                                            })
                                        }
                                        id="email"
                                        name="email"
                                        type="text"
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                password: e.target.value,
                                            })
                                        }
                                        id="password"
                                        name="password"
                                        type="text"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                {error && (
                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-medium text-red-600 hover:text-red-500"
                                        >
                                            {error}
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={onSubmit}
                                    className=" rounded-md px-5 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 text-lg"
                                >
                                    Войти
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
