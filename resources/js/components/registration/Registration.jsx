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
        // group: "",
        // vuz: ""
    });
    console.log(userData)
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
        setPhoneError(""); // Clear phone number error
        setEmailError(""); // Clear email error
        setPasswordError(""); // Clear password error

        // Password validation
        if (userData.password.length < 6) {
            setPasswordError("Длина паспорта должна быть не менее 6 символов"); // Set the password error message
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            setEmailError("Недопустимый email-адрес"); // Set the email error message
            return;
        }
        // Phone number validation
        const phoneRegex = /^\+?\d{10,}$/; // Modify the regex pattern based on your phone number format requirements
        if (!phoneRegex.test(userData.phone)) {
            setPhoneError("Недопустимый номер телефона"); // Set the phone number error message
            return;
        }
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
                            Укажите тип аккаунта
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
                                            Студент
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
                                            Преподаватель
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
                                Эта информация будет отображаться публично.
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
                                        // type="email"
                                        className={`block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${emailError && "border-red-500" // Add a red border for an invalid email address
                                            }`}
                                    />
                                    {emailError && (
                                        <p className="mt-1 text-sm text-red-500">{emailError}</p>
                                    )}
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
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                phone: e.target.value,
                                            })
                                        }
                                        id="phone"
                                        name="phone"
                                        type="phone"
                                        className={`block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${phoneError && "border-red-500" // Add a red border for an invalid phone number
                                            }`}
                                    />
                                    {phoneError && (
                                        <p className="mt-1 text-sm text-red-500">{phoneError}</p>
                                    )}
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="vuz"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    ВУЗ
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                vuz: e.target.value,
                                            })
                                        }
                                        id="vuz"
                                        name="vuz"
                                        value={userData.vuz}
                                        // placeholder="Вася Иванов"
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="group"
                                    className="block text-sm font-medium leading-6 text-white"
                                >
                                    Группа (для студентов)
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setUserData({
                                                ...userData,
                                                group: e.target.value,
                                            })
                                        }
                                        id="group"
                                        name="group"
                                        value={userData.group}
                                        // placeholder="Вася Иванов"
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
                                        type={showPassword ? "text" : "password"} // Show password as text or dots based on showPassword state
                                        className={`block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${passwordError && "border-red-500" // Add a red border for an invalid password
                                            }`}
                                    />
                                    {passwordError && (
                                        <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                                    )}
                                </div>
                                
                                <div className="flex items-center mt-1">
                                    <input
                                        type="checkbox"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="show-password"
                                        className="ml-2 block text-sm text-white"
                                    >
                                        Show Password
                                    </label>
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
