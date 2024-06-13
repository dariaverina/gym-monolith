import React from "react";
import { userStateContext } from "@/context/context-provider";

export default function Header({ dragMode, toggleDragMode, saveSchedule, fetchScheduleData }) {
    const { currentUser } = userStateContext();
    return (
        <>
            {(currentUser && (currentUser.user_type === 'm' || currentUser.user_type === 'w' || (currentUser.user_type === 't' && currentUser.privilege === 'a'))) ? (
                <div className="flex justify-between items-center mb-2">
                    {(!dragMode  )? (
                        <div className="flex justify-center w-full">
                            <button
                                onClick={toggleDragMode}
                                className="bg-green-400 text-gray-900 font-semibold py-2 px-4 rounded-lg"
                            >
                                Перейти в режим редактирования занятий
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center">
                                <span className="text-red-500 font-semibold">
                                    Вы находитесь в режиме редактирования занятий!
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => { toggleDragMode(); fetchScheduleData(); }}
                                    className="bg-red-400 text-gray-900 font-semibold py-2 px-4 rounded-lg"
                                >
                                    Отменить
                                </button>
                                <button
                                    onClick={async () => {
                                        await saveSchedule();
                                        toggleDragMode();
                                    }}
                                    className="bg-green-400 text-gray-900 font-semibold py-2 px-4 rounded-lg"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <></>
            )}
        </>
    );

}
