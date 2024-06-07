import React, { useState, useEffect } from 'react';
import GroupItem from './GroupItem';
import GroupModal from './GroupModal';
import { getGroups, updateGroups, addGroup, editGroup, deleteGroup } from '../../../../api/groupApi';
import StudentInGroupModal from '../../../UI/Modal/ModalContent/Groups/StudentsInGroupModal';

const GroupList = () => {
    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [newGroupName, setNewGroupName] = useState('');

    const fetchGroups = async () => {
        try {
            await updateGroups();
            const data = await getGroups();
            setGroups(data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    useEffect(() => {
        getGroups()
            .then((data) => setGroups(data))
            .catch((error) => console.error(error));
    }, []);

    const handleAddGroup = async () => {
        try {
            await addGroup(newGroupName);
            const data = await getGroups();
            setGroups(data);
            setNewGroupName('');
        } catch (error) {
            console.error('Error adding group:', error);
        }
    };

    const editGroup = (id, newName) => {
        const updatedGroups = groups.map(group =>
            group.id === id ? { ...group, name: newName } : group
        );
        setGroups(updatedGroups);
    };

    const deleteGroup = (id) => {
        const updatedGroups = groups.filter(group => group.id !== id);
        setGroups(updatedGroups);
    };



    return (
        <div className="p-4 bg-gray-900 min-h-screen">
            <h1 className='text-white text-4xl text-center mb-4'>Группы</h1>
            <div className="flex justify-between mb-4">
                <div>
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                        onClick={fetchGroups}
                    >
                        Загрузить группы с сайта УЛГТУ
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded"
                    // onClick={handleDeleteAllGroups}
                    >
                        Удалить все группы
                    </button>
                </div>
                <div>
                    <input
                        className="border px-2 py-1 text-black mr-2"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="Название группы"
                    />
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={handleAddGroup}
                    >
                        Добавить группу
                    </button>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <input
                    className="border px-4 py-2 text-black w-full max-w-md"
                    placeholder="Поиск по группам"
                // onChange={handleSearch} // добавьте обработчик изменения для поиска
                />
            </div>


            <ul>
                {groups.map(group => (
                    <GroupItem
                        // key={group.id} 
                        group={group}
                        onEdit={editGroup}
                        // onShowMembers={() => handleShowModal(group)} 
                        onShowMembers={() => console.log("show")}
                        onDelete={deleteGroup}
                    />
                ))}
            </ul>
            {selectedGroup && (
                <GroupModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    group={selectedGroup}
                />
            )}
        </div>
    );
};

export default GroupList;

