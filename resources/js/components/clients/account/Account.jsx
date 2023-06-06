import React, { useState } from "react";
import { userStateContext } from "@/context/context-provider";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function ClientAccount() {
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const [userData, setUserData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        password: "",
        user_type: "c",
        phone: "+798279816844"
    });
    // console.log('userdata', currentUser.name)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.patch(`/api/users/${user.id}`, { name: name });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    return (
        <div className="px-96 bg-gray-900">
            <div className="flex justify-center pt-6">
                <h1 class="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900">
                    Добро пожаловать в личный кабинет,
                    <span className="font-bold">{` ${currentUser.name}`}!</span>
                </h1>
            </div>
            <form
                // onSubmit={handleSubmit}
                // method="post"
                // encType="multipart/form-data"
            >
                <div className="space-y-12 w-3/5">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Профиль
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Эта информация будет отображаться публично, поэтому
                            будьте осторожны, чем вы делитесь.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                                <label
                                    htmlFor="email"
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
                                        // placeholder="Вася Иванов"
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
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
                                        type="email"
                                        value={userData.email}
                                        // autoComplete="email"
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Номер телефона
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        value={userData.phone}
                                        name="phone"
                                        type="phone"
                                        // autoComplete="phone"
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Cancel
                    </button>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            // type="submit"
                            onClick={()=>handleSubmit(e)}
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
