import { useState, useEffect } from "react";
import { useUI } from "@/context/use-ui";
import axios from "axios";

export default function EditNoteModal({ lesson, onUpdateTraining, onDeleteTraining, fetchScheduleData, day, time, week_number }) {
    const { closeModal, showLoader, hideLoader } = useUI();
    const [lessonName, setLessonName] = useState('');
    const [room, setRoom] = useState('');
    const [teacher, setTeacher] = useState('');
    const [note, setNote] = useState('');

    // Destructure the lesson array to get the lesson object
    const lessonData = lesson && lesson.length > 0 ? lesson[0] : null;

    useEffect(() => {
        if (lessonData) {
            setLessonName(lessonData.lesson_name);
            setRoom(lessonData.room);
            setTeacher(lessonData.teacher);
            setNote(lessonData.note || ''); // Initialize note state
        }
    }, [lessonData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        showLoader();

        try {
            const updatedLesson = {
                id: lessonData ? lessonData.id : Date.now(), 
                group_name: lessonData ? lessonData.group_name : 'ААСбв-11',
                week_number: week_number,
                day_of_week: day,
                lesson_number: time,
                note: note,
                lesson_name: lessonName,
                room,
                teacher,
            };
            // Update the lesson note in Laravel via API
            const response = await axios.put(`http://localhost:8000/api/schedule/update-note/${updatedLesson.id}`, {
                note: note
            });
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
            closeModal();
        }
    };

    return (
        <div className="p-6 bg-gray-900 rounded-3xl">
            <h2 className="text-2xl text-white mb-4">Редактировать примечание к уроку</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="note">
                        Примечание
                    </label>
                    <textarea
                        id="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Сохранить
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Отменить
                    </button>
                </div>
            </form>
        </div>
    );
}
