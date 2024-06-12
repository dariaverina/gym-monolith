
    import React, { useState } from 'react';
    import axios from 'axios';
    import { userStateContext } from '@/context/context-provider';
    
    const Communication = () => {
        const { currentUser, setCurrentUser, setUserToken } = userStateContext();
        const [group, setGroup] = useState('');

        const [showModal, setShowModal] = useState(false);
        const [message, setMessage] = useState('');
        const [studentMessages, setStudentMessages] = useState([
            { id: 1, group: 'ПИБД-42', message: 'Напоминаю, что завтра у нас лекция в 10:00.' },
            { id: 2, group: 'ПИБД-42', message: 'Добрый день! Просьба прочитать дополнительные материалы к следующему уроку.' },
            { id: 3, group: 'ИСЭБД-13', message: 'Уважаемые студенты, пожалуйста, сдайте домашнее задание до конца недели.' },
        ]);
        const [requestMessages, setRequestMessages] = useState([
            { id: 1, group: 'ПИБД-42', message: 'Перенос занятий на час раньше.' },
            { id: 2, group: 'ПИБД-41', message: 'Отмена лекции на следующей неделе.' },
        ]);
        const [showStudentMessages, setShowStudentMessages] = useState(true);
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (showStudentMessages) {
                setStudentMessages([...studentMessages, { id: studentMessages.length + 1, group: group, message: message }]);
            } else {
                setRequestMessages([...requestMessages, { id: requestMessages.length + 1, group: group, message: message }]);
            }
            setGroup('');
            setMessage('');
    
            try {
                await axios.post('/send-notification', { message, name: currentUser.name });
                console.log('Уведомление успешно отправлено в телеграм!');
            } catch (error) {
                console.error('Ошибка отправки уведомления в телеграм:', error);
            }
        };
    
        return (
            <div className="bg-gray-900 relative flex items-center justify-center min-h-screen">
                <div className="max-w-4xl mx-auto p-8">
                    <h1 className="text-center text-white font-extrabold text-3xl mb-8">Страница коммуникации</h1>
    
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={() => setShowStudentMessages(true)}
                            className={`mr-2 py-1 px-3 rounded focus:outline-none ${showStudentMessages ? 'bg-gray-400 text-gray-800' : 'bg-gray-800 text-white'}`}
                        >
                            Студентам
                        </button>
                        <button
                            onClick={() => setShowStudentMessages(false)}
                            className={`py-1 px-3 rounded focus:outline-none ${showStudentMessages ? 'bg-gray-800 text-white' : 'bg-gray-400 text-gray-800'}`}
                        >
                            Запросы
                        </button>
                    </div>
    
                    <div className="grid grid-cols-2 gap-4">
                        {showStudentMessages
                            ? studentMessages.map((msg) => (
                                <div key={msg.id} className="bg-gray-800 text-white rounded-lg px-4 py-2 mb-4">
                                    <h3 className="font-semibold">{msg.group}</h3>
                                    <p>{msg.message}</p>
                                </div>
                            ))
                            : requestMessages.map((msg) => (
                                <div key={msg.id} className="bg-gray-800 text-white rounded-lg px-4 py-2 mb-4">
                                    <h3 className="font-semibold">{msg.group}</h3>
                                    <p>{msg.message}</p>
                                </div>
                            ))}
                    </div>
    
                    <button onClick={() => setShowModal(true)} className="block mx-auto bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg mt-4">
                        Новое сообщение
                    </button>
    
                </div>
                {showModal && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg w-96">
                            <button onClick={() => setShowModal(false)} className="text-gray-900 font-semibold text-xl mb-4">Новое сообщение</button>
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                <select
                                    value={group}
                                    onChange={(e) => setGroup(e.target.value)}
                                    className="bg-gray-100 text-gray-900 rounded-lg px-4 py-2 mb-4"
                                >
                                    <option value="">Выберите группу</option>
                                    <option value="ПИБД-41">ПИБД-41</option>
                                    <option value="ПИБД-42">ПИБД-42</option>
                                    <option value="ИСЭБД-41">ИСЭБД-41</option>
                                </select>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="bg-gray-100 text-gray-900 rounded-lg px-4 py-2 mb-4 resize-none"
                                    placeholder="Введите ваше сообщение..."
                                    rows="4"
                                ></textarea>
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-green-400 font-semibold py-2 px-4 rounded-lg">
                                        Отправить
                                    </button>
                                    <button onClick={() => setShowModal(false)} className="bg-red-400 text-gray-900 font-semibold py-2 px-4 rounded-lg ml-2">
                                        Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    };
    
    export default Communication;
    