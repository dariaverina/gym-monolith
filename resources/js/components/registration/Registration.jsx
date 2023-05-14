import { useState, useEffect } from "react";
import axiosClient from "@/public/axios";
import { userStateContext } from "@/context/context-provider";
// import { Redirect  } from "react-router-dom";
import { useUI } from "@/context/use-ui";
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
        <>
            <form
                onSubmit={onSubmit}
                method="post"
                encType="multipart/form-data"
            >
                <div>
                    <label>Name</label>
                    <input
                        className="square border border-black"
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                        }
                    ></input>
                </div>
                <div>
                    <label>Email address</label>
                    <input
                        className="square border border-black"
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                    ></input>
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        className="square border border-black"
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={(e) =>
                            setUserData({ ...userData, phone: e.target.value })
                        }
                    ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        className="square border border-black"
                        type="text"
                        name="password"
                        id="password"
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                password: e.target.value,
                            })
                        }
                    ></input>
                </div>
                <br />
                <p>Выберите тип аккаунта</p>
                <div>
                    <input
                        type="radio"
                        id="t"
                        name="user_type"
                        value="t"
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                user_type: e.target.value,
                            })
                        }
                    />
                    <label htmlFor="t">тренер</label>
                    <input
                        type="radio"
                        id="c"
                        name="user_type"
                        value="c"
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                user_type: e.target.value,
                            })
                        }
                    />
                    <label htmlFor="c">клиент</label>
                    <input
                        type="radio"
                        id="m"
                        name="user_type"
                        value="m"
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                user_type: e.target.value,
                            })
                        }
                    />
                    <label htmlFor="m">менеджер</label>
                </div>
                <br />
                <div>
                    <label>Profile Photo</label>
                    <input
                        type="file"
                        name="photo"
                        id="photo"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            // Check if file is an image
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
                <br />
                <button type="submit" value="Submit">
                    submit
                </button>
            </form>
        </>
    );
}
