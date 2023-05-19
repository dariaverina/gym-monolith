import { userStateContext } from "@/context/context-provider";
import { useEffect, useState } from "react";
import axiosClient from "@/public/axios";
import { useUI } from "@/context/use-ui";
import axios from "axios";

export default function NewTraining({ timeId, dayOfWeek, setTrainings }) {
    const [clubs, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [variations, setVariations] = useState([]);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [capacity, setCapacity] = useState(null);
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const { openModal, closeModal, showLoader, hideLoader, setModalContent, displayModal } =useUI();

    useEffect(() => {
        fetch("/api/clubs")
            .then((response) => response.json())
            .then((data) => setClubs(data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetch("/api/trainingvariations")
            .then((response) => response.json())
            .then((data) => setVariations(data))
            .catch((error) => console.error(error));
    }, []);
    useEffect(() => {
        if (selectedClub && selectedVariation)
            axios
                .get("/api/rooms", {
                    params: {
                        get_free_rooms: true,
                        time_id: timeId,
                        day_of_week: dayOfWeek,
                        club_id: selectedClub,
                        training_variation_id: selectedVariation,
                    },
                })
                .then((res) => setRooms(res.data))
                .catch((err) => console.log(err));
    }, [selectedClub, selectedVariation]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("/training", {
                    trainer_id: currentUser.id,
                    training_variation_id: selectedVariation,
                    time_id: timeId,
                    day_of_week: dayOfWeek,
                    capacity: capacity,
                    room_id: selectedRoom,
            })
            .then((response) => {
                axios
                    .get(`/api/trainings?trainer_id=${currentUser.id}`)
                    .then((res) => {setTrainings(res.data); console.log('res',res.data)})
                closeModal();
            });
    };

    return (
        <div className="p-6 bg-gray-900">
            <p className="block mb-2 text-sm font-medium text-white dark:text-white">
                Выберите спортзал из списка
            </p>
            <select
                id="clubs"
                className="block w-full p-2 mb-6 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setSelectedClub(e.target.value)}
            >
                <option value={null} selected></option>
                {clubs.map((club) => (
                    <option className="text-black" key={club.id} value={club.id}>
                        {club.name}
                    </option>
                ))}
            </select>
            <p className="block mb-2 text-sm font-medium text-white dark:text-white">
                Выберите занятие
            </p>
            <select
                id="variations"
                className="block w-full p-2 mb-6 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setSelectedVariation(e.target.value)}
            >
                <option value={null} selected></option>
                {variations.map((variation) => (
                    <option className="text-black" key={variation.id} value={variation.id}>
                        {variation.name}
                    </option>
                ))}
            </select>
            {rooms && rooms.length > 0 && (
                <>
                    <p className="block mb-2 text-sm font-medium text-white dark:text-white">
                        Выберите зал
                    </p>
                    <select
                        id="variations"
                        className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setSelectedRoom(e.target.value)}
                    >
                        <option value={null} selected></option>
                        {rooms.map((room) => (
                            <option className="text-black" key={room.id} value={room.id}>
                                {room.name}
                            </option>
                        ))}
                    </select>
                    <p className="block mb-2 text-sm font-medium text-white dark:text-white">
                        Введите размер группы
                    </p>
                    <div className="mt-2">
                        <input
                            type="number"
                            name="capacity"
                            id="capacity"
                            onChange={(e) => setCapacity(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </>
            )}
            {rooms && rooms.length<1 &&<div className="text-white">Нет свободных залов. Попробуйте выбрать другое время</div>}
            <div className="flex justify-center mt-6">
                <button
                    onClick={(e)=>{handleSubmit(e)}}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
}
