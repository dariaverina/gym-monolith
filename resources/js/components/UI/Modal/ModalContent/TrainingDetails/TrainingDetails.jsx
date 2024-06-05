import { userStateContext } from "@/context/context-provider";
import { useEffect, useState } from "react";
import axiosClient from "@/public/axios";
import { useUI } from "@/context/use-ui";
import axios from "axios";
import { getTrainingVariations } from "../../../../../api/get-training-variations";

export default function TrainingDetails({ training, setTrainings, weekNumber }) {
    const [selectedClub, setSelectedClub] = useState(null);

    const [selectedVariation, setSelectedVariation] = useState(null);
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    const { openModal, closeModal, showLoader, hideLoader, setModalContent, displayModal } = useUI();
    console.log('training', training)


    const handleCancel = (event) => {
        event.preventDefault();
        axios
            .delete("/training/" + training.id)
            .then((response) => {
                axios
                    .get(`/api/trainings?trainer_id=${currentUser.id}&week_number=${weekNumber}`)
                    .then((res) => { setTrainings(res.data); console.log('res', res.data) })
                closeModal();
            });
    };

    return (
        <div className="p-6 bg-gray-900">
            <p className="block mb-2 font-medium text-white dark:text-white text-center border-b border-gray-600 pb-4">
                Детали занятия
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
                    Отменить
                </button>
            </div>
        </div>
    );
}
