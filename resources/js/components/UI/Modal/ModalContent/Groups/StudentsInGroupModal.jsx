import { useEffect, useState } from 'react';
import { Listbox } from "@headlessui/react";
import { useUI } from '@/context/use-ui';
import { getStudentsByGroup } from "../../../../../api/groupApi";
import { getStudents } from '../../../../../api/get-users';
import { updateUser } from '../../../../../api/update-user';

export default function StudentsInGroupModal({ group }) {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [users, setUsers] = useState([]);
    const { closeModal, showLoader, hideLoader } = useUI();
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
        fetchUsers();
    }, []);

    const fetchStudents = async () => {
        try {
            const data = await getStudentsByGroup(group.id);
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await getStudents();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddStudent = async (student) => {
        if (!student) return;

        try {
            showLoader();
            const updatedUserData = { ...student, group_id: group.id };
            await updateUser(student.id, updatedUserData);
            setSelectedStudent(null); // сброс значения Listbox
            setSearchQuery(""); // сброс значения поиска
            fetchStudents(); // обновление списка студентов
        } catch (error) {
            console.error('Error updating student group:', error);
        } finally {
            hideLoader();
        }
    };

    const handleRemoveSelectedStudents = async () => {
        try {
          
            showLoader();
            for (const studentId of selectedStudents) {
                const id = parseInt(studentId);
                const student = students.find(s => s.id === id);
             
                if (student) {
                    const updatedUserData = { ...student, group_id: null }; // Обнуление группы
                    await updateUser(student.id, updatedUserData);
                }
            }
            setSelectedStudents([]); // Сброс выбранных студентов
            fetchStudents(); // обновление списка студентов
        } catch (error) {
            console.error('Error removing selected students from group:', error);
        } finally {
            hideLoader();
        }
    };

    const filteredStudents = students.filter((student) => {
        return student.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const handleSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedStudents(selectedOptions);
        console.log(selectedOptions); // Лог выбранных студентов
    };

    return (
        <div className="p-6 bg-gray-900 rounded-3xl">
            <h2 className="text-white mb-4 text-center">Студенты группы {group.name}</h2>
            {/* Поле для поиска и выбора студента */}
            <Listbox value={selectedStudent} onChange={(student) => { 
                setSelectedStudent(student); 
                handleAddStudent(student); 
            }}>
                <div className="relative">
                    <Listbox.Button className="bg-gray-800 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white">
                        {selectedStudent ? selectedStudent.name : 'Добавить студента...'}
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg rounded-md">
                        <input
                            type="text"
                            placeholder="Поиск по имени студента"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full px-4 py-2 rounded-t-md border-b border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {users.map((student) => (
                            <Listbox.Option
                                key={student.id}
                                value={student}
                                className={({ active }) =>
                                    `cursor-pointer select-none relative px-4 py-2 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    }`
                                }
                            >
                                {student.name}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
            
            <select
                size={5}
                className="block w-full mt-2 px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                multiple
                onChange={handleSelectChange} 
            >
                {filteredStudents.map((student) => (
                    <option key={student.id} value={student.id} className="flex justify-between items-center">
                        <span>{student.name}</span>
                        <button
                            onClick={() => handleRemoveStudent(student.id)}
                            className="flex-shrink-0 h-5 w-5 text-red-500 cursor-pointer focus:outline-none"
                            aria-label="Remove student"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zM5.707 4.293a1 1 0 00-1.414 1.414L8 10.414l-3.293 3.293a1 1 0 101.414 1.414L9.414 11l3.293 3.293a1 1 0 001.414-1.414L10.414 9l3.293-3.293a1 1 0 10-1.414-1.414L9 7.586 5.707 4.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </option>
                ))}
            </select>

            <button onClick={handleRemoveSelectedStudents} className="w-full mt-4 mx-auto bg-red-400 px-4 py-2 text-white rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Удалить выбранных студентов</button>
        </div>
    );
}
