import { userStateContext } from "@/context/context-provider";
import { useEffect, useState } from "react";
import axiosClient from "@/public/axios";
import { useUI } from "@/context/use-ui";
import axios from "axios";

export default function TrainingDetailsCustomer({ training, setTrainings, weekNumber }) {
    const [clubs, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState(null);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [capacity, setCapacity] = useState(null);
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const { openModal, closeModal, showLoader, hideLoader, setModalContent, displayModal } = useUI();
    console.log('training', training)
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

    const handleCancel = (event) => {
        event.preventDefault();
        axios
            .delete("/trainingparticipant?training_id=" + training.id +'&user_id=' + currentUser.id)
            .then((response) => {
                axios
                    .get(`/api/trainings?client_id=${currentUser.id}&week_number=${weekNumber}`)
                    .then((res) => { setTrainings(res.data); console.log('res', res.data) })
                closeModal();
            });
    };

    return (
        <div className="p-6 bg-gray-900">
            <p className="block mb-2 font-medium text-white dark:text-white text-center border-b border-gray-600 pb-4">
                Детали тренировки
            </p>
            {/* {training.training_participants.length > 0 ? <>
                <p className="block mb-2 font-medium text-sm text-gray-400">
                    Участники тренировки:
                </p>
                <ol className="h-16 overflow-y-scroll bg-gray-800 text-gray-500 list-decimal">
                    {training.training_participants.map((trainer) => (
                        <li>{trainer.user.name}</li>
                    ))}
                </ol>
            </>
                : <p className="block mb-2 font-medium text-sm text-gray-400 text-center">
                    Пока никто не записан
                </p>
            } */}
            <div className="flex justify-center">
                <button
                    onClick={(e) => { handleCancel(e) }}
                    type="button"
                    className="mt-4 rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                >
                    Отменить запись
                </button>
            </div>
        </div>
    );
}
