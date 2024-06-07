import React, { useState } from 'react';
import { editGroup, deleteGroup } from '../../../../api/groupApi';
import { useUI } from "@/context/use-ui";
import StudenstInGroupModal from '../../../UI/Modal/ModalContent/Groups/StudentsInGroupModal';

const GroupItem = ({ group, onEdit, onShowMembers, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(group.name);
    const { openModal, setModalContent } = useUI();

    const handleEdit = () => {
        onEdit(group.id, newName);
        setIsEditing(false);
    };
    const handleDelete = async () => {
        try {
            await deleteGroup(group.id);
            // Perform any additional actions after deletion, if needed
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    const onShowStudents = () => {
        setModalContent(<StudenstInGroupModal group = {group}/>);
        openModal();
    };

    return (
        <li className="flex items-center justify-between py-2 border-b border-gray-700">
            {isEditing ? (
                <>
                    <input
                        className="border px-2 py-1 text-black"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <button
                        className="bg-green-500 text-white py-1 px-3 ml-2 rounded"
                        onClick={handleEdit}
                    >
                        Сохранить
                    </button>
                </>
            ) : (
            //     <>
            //     <span className='text-white'>{group.name}</span>
            //     <div className="flex items-center">
            //         <button
            //             className="bg-yellow-500 text-white py-1 px-3 ml-2 rounded"
            //             onClick={() => setIsEditing(true)}
            //         >
            //             Edit
            //         </button>
            //         <button
            //             className="bg-red-500 text-white py-1 px-3 ml-2 rounded"
            //             onClick={handleDelete}
            //         >
            //             Delete
            //         </button>
            //         <button
            //             className="bg-blue-500 text-white py-1 px-3 ml-2 rounded"
            //             onClick={onShowMembers}
            //         >
            //             Show Members
            //         </button>
            //     </div>
            // </>
                <>
                    <span className='text-white'>{group.name}</span>
                    <div className="flex items-center">
                        <button
                            className="bg-yellow-500 text-white py-1 px-3 ml-2 rounded flex items-center"
                            onClick={() => setIsEditing(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                        </button>
                        <button
                            className="bg-red-500 text-white py-1 px-3 ml-2 rounded flex items-center"
                            onClick={() => onDelete(group.id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                        </button>
                        <button
                            className="bg-blue-500 text-white py-1 px-3 ml-2 rounded"
                            onClick={onShowStudents}
                        >
                            Список студентов
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default GroupItem;
