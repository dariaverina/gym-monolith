import { useState, useEffect } from "react";
import { useUI } from "@/context/use-ui";

export default function EditLessonModal({ lesson, onUpdateTraining, onDeleteTraining, fetchScheduleData, day, time, week_number }) {
    const { closeModal, showLoader, hideLoader } = useUI();
    const [lessonName, setLessonName] = useState('');
    const [room, setRoom] = useState('');
    const [teacher, setTeacher] = useState('');

    // Destructure the lesson array to get the lesson object
    const lessonData = lesson && lesson.length > 0 ? lesson[0] : null;

    useEffect(() => {
        if (lessonData) {
            setLessonName(lessonData.lesson_name);
            setRoom(lessonData.room);
            setTeacher(lessonData.teacher);
        }
    }, [lessonData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        showLoader();

        try {
            const updatedLesson = {
                id: lessonData ? lessonData.id : Date.now(), // Используем Date.now() для уникального id
                group_name: 'ААСбв-11',
                week_number: week_number - 6,
                day_of_week: day,
                lesson_number: time,
                note: null,
                lesson_name: lessonName,
                room,
                teacher,
            };

            // Обновить существующую или создать новую тренировку
            onUpdateTraining(updatedLesson);
            closeModal();
        } catch (error) {
            console.error('Error updating lesson:', error);
        } finally {
            hideLoader();
        }
    };

    const handleDelete = () => {
        if (lessonData && lessonData.id) {
            onDeleteTraining(lessonData.id);
            closeModal();
        }
    };

    return (
        <div className="p-6 bg-gray-900 rounded-3xl">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <form onSubmit={handleSubmit} className="mt-4 w-full">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Название занятия</label>
                        <input
                            type="text"
                            value={lessonName}
                            onChange={(e) => setLessonName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Кабинет</label>
                        <input
                            type="text"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Преподаватель</label>
                        <input
                            type="text"
                            value={teacher}
                            onChange={(e) => setTeacher(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mt-4 flex justify-between space-x-2">
                        <button
                            type="button"
                            className="w-1/2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            onClick={closeModal}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                            Сохранить
                        </button>
                    </div>
                    {lessonData && lessonData.id && (
                        <button
                            type="button"
                            className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            onClick={handleDelete}
                        >
                            Удалить
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
