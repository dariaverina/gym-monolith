import React, { useState, useEffect } from 'react';
import GroupItem from './GroupItem';
import GroupModal from './GroupModal';
import {  getGroups, updateGroups } from '../../../../api/groupApi';

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

    const addGroup = () => {
        if (newGroupName.trim() === '') return;
        const newGroup = { id: Date.now(), name: newGroupName, members: [] };
        setGroups([...groups, newGroup]);
        setNewGroupName('');
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

    const handleShowModal = (group) => {
        setSelectedGroup(group);
        setShowModal(true);
    };

    return (
        <div className="p-4 bg-gray-900 min-h-screen">
            <h1 className='text-white text-4xl text-center mb-4'>Группы</h1>
            <div className="flex justify-center mb-4">
                <button 
                    className="bg-green-500 text-white py-2 px-4 rounded"
                    onClick={fetchGroups}
                >
                    Загрузить группы с сайта УЛГТУ
                </button>
            </div>
            <div className="flex justify-center mb-4">
                <input 
                    className="border px-2 py-1 text-black mr-2"
                    value={newGroupName} 
                    onChange={(e) => setNewGroupName(e.target.value)} 
                    placeholder="Название группы"
                />
                <button 
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={addGroup}
                >
                    Добавить группу
                </button>
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

