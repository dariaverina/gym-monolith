import '../bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import Layout from '../components/common/Layout/Layout';

const App = () => {
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
        // Set the last updated date to 20 May at 12:00
        const lastUpdateDate = new Date(2024, 5, 10, 12, 54); // Months are 0-indexed in JavaScript (4 = May)
        setLastUpdated(lastUpdateDate.toLocaleString('ru-RU', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        }));
    }, []);

    const handleUploadSchedule = async () => {
        try {
            const response = await axios.get('https://vm.nathoro.ru/timetable/by-group/%D0%9F%D0%98%D0%B1%D0%B4-42');
            const scheduleData = response.data;
            // setLoading(true);
            await axios.post('/api/schedule/upload', {schedule: scheduleData});
            // const response = await axios.post('/api/schedule', { 
            //     // Здесь вы можете передать данные о расписании, если они необходимы
            // });
            // setLoading(false);
            console.log(response.data.message); // Выводим сообщение об успешной загрузке расписания
        } catch (error) {
            // setLoading(false);
            setError('Произошла ошибка при загрузке расписания');
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="p-4 pt-10 bg-gray-900 min-h-screen">
                <div className="flex justify-center mb-4">
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded"
                        onClick={handleUploadSchedule}
                    >
                        Загрузить расписание с сайта УЛГТУ
                    </button>
                </div>
                <div className="text-center text-white mt-4">
                    Последнее обновление: {lastUpdated}
                </div>
            </div>
        </Layout>
    );
}

if (document.getElementById('upload-schedule')) {
    createRoot(document.getElementById('upload-schedule')).render(<App />);
}
