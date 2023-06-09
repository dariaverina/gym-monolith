import React, { useState } from "react";
import { userStateContext } from "@/context/context-provider";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useUI } from "@/context/use-ui";

export default function ClientAccount() {
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const { openModal, closeModal, showLoader, hideLoader, setModalContent, displayModal } = useUI();
    const [userData, setUserData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        password: "",
        user_type: "c",
        phone: currentUser.phone,
        photo: null,
        // photo: currentUser.photo,
    });
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    console.log("userdata", userData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPhoneError(""); // Clear phone number error
        setEmailError(""); // Clear email error

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
        try {
            const response = await axios.patch(`/api/users/${currentUser.id}`, {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                photo: userData.photo, // Use the updated photo state
            });
            setModalContent(
                <div className="p-6 bg-gray-900 sm:rounded-lg flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="w-6 h-6 mb-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                        />
                    </svg>
                    <p className="text-white text-center">
                        Успешно обновлено!
                    </p>
                </div>
            );
            openModal()
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="px-96 bg-gray-900">
            <div className="flex justify-center pt-6">
                <h1 className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900">
                    Добро пожаловать в личный кабинет,
                    <span className="font-bold">{` ${currentUser.name}`}!</span>
                </h1>
            </div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                method="put"
                encType="multipart/form-data"
            >
                <div className="space-y-12 w-3/5">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Профиль
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Эта информация будет отображаться публично.
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
                                        value={userData.email}
                                        className={`block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${emailError && "border-red-500"
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
                                        value={userData.phone}
                                        id="phone"
                                        name="phone"
                                        type="phone"
                                        className={`block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${phoneError && "border-red-500"
                                            }`}
                                    />
                                    {phoneError && (
                                        <p className="mt-1 text-sm text-red-500">{phoneError}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-span-full">
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

                                if (file && file.type.substr(0, 5) === "image") {
                                    setUserData({
                                        ...userData,
                                        photo: file,
                                    });
                                } else {
                                    alert("Please select an image file.");
                                }
                            }}
                        />
                    </div>
                </div> */}

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Cancel
                    </button>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            onClick={(e) => handleSubmit(e)}
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
