import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const MessageItem = ({ message }) => {
    const isTeacher = message.senderRole === 'преподаватель';
    const iconClass = isTeacher ? 'text-blue-500' : 'text-green-500';
    const readClass = message.read ? 'text-gray-500' : 'text-white';

    return (
        <div className={`p-4 rounded mb-4 flex items-center justify-between ${readClass}`}>
            <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconClass}`}>
                    {isTeacher ? (
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                     </svg>
                     
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                      </svg>
                      
                    )}
                </div>
                <div className="ml-4">
                    <div className="font-bold">{message.senderName} ({message.senderRole})</div>
                    <div>{message.text}</div>
                </div>
            </div>
            <div className="flex items-center">
                {!message.resolved && !message.rejected && (
                    <div className="mr-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={message.rejected}
                                onChange={() => { } /* Placeholder for handling checkbox change */}
                            />
                            <span className='text-green-500'>Выполнено</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={message.rejected}
                                onChange={() => { } /* Placeholder for handling checkbox change */}
                            />
                            <span className='text-red-500'>Отказано</span>
                        </label>
                    </div>
                )}
            </div>

        </div>
    );
};

export default MessageItem;
