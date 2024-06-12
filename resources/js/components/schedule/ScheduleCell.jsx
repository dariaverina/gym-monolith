import React, { useState } from "react";
import { useDrop } from "react-dnd";

function Training({ training }) {
    const [, ref] = useDrag({
        type: ItemTypes.TRAINING,
        item: { training },
    });

    return (
        <div className="cursor-pointer">
            <div ref={ref} className="cursor-pointer">
                <div className="font-medium text-white text-s">
                    <strong>{training.lesson_name}</strong>
                </div>
                <div className="font-medium text-gray-500 text-xs">
                    {training.room}
                </div>
                <div className="font-medium text-gray-400 text-xs">
                    {training.teacher}
                </div>
            </div>
        </div>
    );
}


export default function ScheduleCell({ day, timeSlot, training, onMove, dragMode, setModalContent, openModal }) {
    const ItemTypes = {
        TRAINING: "training",
    };
    
    const [showTooltip, setShowTooltip] = useState(false);

    const [, ref] = useDrop({
        accept: ItemTypes.TRAINING,
        drop: (item) => {
            if (dragMode) {
                onMove(item.training, day, timeSlot);
            }
        },
        canDrop: () => dragMode,
    });

    return (
        <td
            ref={ref}
            onClick={() => {
                setModalContent(
                    <EditLessonModal
                        lesson={training}
                        day={day}
                        week_number={week}
                        time={timeSlot}
                        fetchScheduleData={fetchScheduleData}
                        onUpdateTraining={handleUpdateTraining}
                        onDeleteTraining={handleDeleteTraining}
                    />
                );
                openModal();
            }}
            className={`relative border border-slate-700 w-32 h-24 text-xs text-center ${dragMode ? "bg-gray-600" : "bg-gray-900"
                }`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <button>
                <div className="overflow-auto h-full relative">
                    {training && training.length > 0 ? (
                        training.map((training, index) => (
                            <Tra key={index} training={training} />
                        ))
                    ) : (
                        <div className="text-center"></div>
                    )}
                </div>
            </button>

            {training && training[0].note && training[0].note !== null && (
                <>
                    <div className="absolute top-0 right-0 mt-1 mr-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-yellow-500"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                    </div>
                    {showTooltip && (
                        <div className="absolute right-0 bottom-6 bg-white text-gray-900 p-2 rounded-lg shadow-lg">
                            {training[0].note}
                        </div>
                    )}
                </>
            )}
        </td>
    );
}
