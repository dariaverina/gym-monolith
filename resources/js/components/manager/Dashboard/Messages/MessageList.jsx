import React, { useState } from 'react';
import MessageItem from './MessageItem';

const MessageList = () => {
    const [messages, setMessages] = useState([
        { id: 1, senderName: 'Эгов Евгений Николаевич', senderRole: 'преподаватель', text: 'На этой неделе изменить кабинет у группы ПИбд-42 в четверг 5 парой.', completed: false },
        { id: 2, senderName: 'Скалкин Антон Михайлович', senderRole: 'преподаватель', text: 'Перенос занятий группы ПИбд-31 с пятницы на понедельник.', completed: false },
        { id: 3, senderName: 'Скалкин Антон Михайлович', senderRole: 'преподаватель', text: 'Изменение времени лекции для группы ПИбд-22 во вторник.', completed: false },
        { id: 4, senderName: 'Морозова Ольга Николаева', senderRole: 'преподаватель', text: 'Отмена занятий группы ПИбд-13 в среду.', completed: true },
    ]);
    const [showCompleted, setShowCompleted] = useState(false);

    const filteredMessages = showCompleted ? messages.filter(message => message.completed) : messages.filter(message => !message.completed);

    const toggleCompleted = () => {
        setShowCompleted(!showCompleted);
    };

    return (
        <div className="p-4 bg-gray-900 min-h-screen">
            <h1 className='text-white text-4xl text-center mb-4'>Сообщения</h1>
            <div className="flex justify-center mb-4">
                <button
                    className={`mr-2 py-1 px-3 rounded focus:outline-none ${showCompleted ? 'bg-gray-400 text-gray-800' : 'bg-gray-800 text-gray-400'}`}
                    onClick={toggleCompleted}
                >
                    Новые
                </button>
                <button
                    className={`py-1 px-3 rounded focus:outline-none ${showCompleted ? 'bg-gray-800 text-gray-400' : 'bg-gray-400 text-gray-800'}`}
                    onClick={toggleCompleted}
                >
                    Выполненные
                </button>
            </div>
            {filteredMessages.map(message => (
                <MessageItem key={message.id} message={message} />
            ))}
        </div>
    );
};

export default MessageList;
