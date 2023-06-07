import { userStateContext } from "@/context/context-provider";
import { useEffect, useState } from "react";
import axiosClient from "@/public/axios";
import { useUI } from "@/context/use-ui";
import axios from "axios";

export default function TrainingDetails() {
    const [clubs, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [variations, setVariations] = useState([]);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [capacity, setCapacity] = useState(null);
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const { openModal, closeModal, showLoader, hideLoader, setModalContent, displayModal } = useUI();

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
                    .then((res) => { setTrainings(res.data); console.log('res', res.data) })
                closeModal();
            });
    };

    return (
        <div className="p-6 bg-gray-900">
            <p className="block mb-2 font-medium text-white dark:text-white text-center">
                Детали тренировки
            </p>
            <p className="block mb-2 font-medium text-sm text-white dark:text-white">
                Участники тренировки
            </p>
                <ul className="h-16 overflow-y-scroll bg-gray-800">
                    <li>1</li>
                    <li>2</li>
                    <li>2</li>
                    <li>2</li>
                    <li>2</li>
                    <li>2</li>
                    <li>2</li>
                    <li>2</li>
                </ul>
            <div className="flex justify-center">
                <button
                    type="button"
                    className="mt-4 rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                >
                    Отменить тренировку
                </button>
            </div>
        </div>
    );
}
