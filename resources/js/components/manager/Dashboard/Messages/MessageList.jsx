import React, { useState } from 'react';
import MessageItem from './MessageItem';

const MessageList = () => {
    const [messages, setMessages] = useState([
        { id: 1, senderName: 'Иван Иванов', senderRole: 'преподаватель', text: 'На этой неделе изменить кабинет у группы ПИбд-42 в четверг 5 парой.' },
        { id: 2, senderName: 'Мария Петрова', senderRole: 'работник', text: 'Перенос занятий группы ПИбд-31 с пятницы на понедельник.' },
        { id: 3, senderName: 'Сергей Сидоров', senderRole: 'преподаватель', text: 'Изменение времени лекции для группы ПИбд-22 во вторник.' },
        { id: 4, senderName: 'Ольга Николаева', senderRole: 'работник', text: 'Отмена занятий группы ПИбд-13 в среду.' },
    ]);

    return (
        <div className="p-4 bg-gray-900 min-h-screen">
            <h1 className='text-white text-4xl text-center mb-4'>Сообщения</h1>
            {messages.map(message => (
                <MessageItem key={message.id} message={message} />
            ))}
        </div>
    );
};

export default MessageList;
