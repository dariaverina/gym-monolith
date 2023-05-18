import { useState, useEffect } from "react";
import axiosClient from "@/public/axios";
import { userStateContext } from "@/context/context-provider";
// import { Redirect  } from "react-router-dom";
import { useUI } from "@/context/use-ui";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function Registration() {
    const [error, setError] = useState({ __html: "" });
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        user_type: "c",
        phone: "+7927876566",
    });
    console.log(userData);
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const { openModal, showLoader, hideLoader, setModalContent, displayModal } =
        useUI();
    const [isTrainerAlertOpen, setIsTrainerAlertOpen] = useState(false);

    useEffect(() => {
        if (isTrainerAlertOpen && !displayModal) window.location.href = "/";
    }, [displayModal]);
    const onSubmit = (e) => {
        e.preventDefault();
        setError({ __html: "" });
        axiosClient
            .post("/signup", userData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
                if (userData.user_type == "c")
                    window.location.href = "/account";
                if (userData.user_type == "t") {
                    setModalContent(
                        <div>
                            Регистрация прошла успешно. Ожидайте проверки
                            администратора
                        </div>
                    );
                    openModal();
                    setIsTrainerAlertOpen(true);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error);
                }
            });
    };
    return (
        <div className="bg-gray-900 p-6">
            <div className="flex justify-center">
                <h1 class="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900">
                    Форма регистрации
                </h1>
            </div>
            <form
                onSubmit={onSubmit}
                method="post"
                encType="multipart/form-data"
            >
                <div className="px-96">
                    <div className="border-b border-white/10 pb-12 pt-6">
                        <h2 className="text-base font-semibold leading-7 text-white">
                            Тип аккаунта
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            Укажите, хотите ли вы стать тренером или стать
                            клиентом клуба
                        </p>

                        <div className="mt-10 ">
                            <fieldset>
                                <div className=" space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            checked={userData.user_type == "c"}
                                            onChange={(e) =>
                                                setUserData({
                                                    ...userData,
                                                    user_type: "c",
                                                })
                                            }
                                            id="c"
                                            name="c"
                                            type="radio"
                                            className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                                        />
                                        <label
                                            htmlFor="c"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            Хочу тренироваться
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            checked={userData.user_type == "t"}
                                            onChange={(e) =>
                                                setUserData({
                                                    ...userData,
                                                    user_type: "t",
                                                })
                                            }
                                            id="t"
                                            name="t"
                                            type="radio"
                                            className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                                        />
                                        <label
                                            htmlFor="t"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            Хочу тренировать
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    {userData.user_type == "t" && (
                        <div className="border-b border-white/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-white pt-6">
                                Профиль
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-400">
                                Эта информация будет отображаться публично,
                                поэтому будьте осторожны, чем вы делитесь.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        О вас
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-400">
                                        Напишите пару предложений для клиентов.
                                    </p>
                                </div>
                                <div className="col-span-full">
                                    <label
                                        htmlFor="photo"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Фото профиля
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3 text-white">
                                        <input
                                            type="file"
                                            name="photo"
                                            id="photo"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];

                                                if (
                                                    file &&
                                                    file.type.substr(0, 5) ===
                                                        "image"
                                                ) {
                                                    setUserData({
                                                        ...userData,
                                                        photo: file,
                                                    });
                                                } else {
                                                    alert(
                                                        "Please select an image file."
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="border-b border-white/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-white">
                            Личная информация
                        </h2>

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
                                        name="phone"
                                        type="phone"
                                        // autoComplete="phone"
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Пароль
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                password: e.target.value,
                                            })
                                        }
                                        name="password"
                                        value={userData.password}
                                        // placeholder="пароль"
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
