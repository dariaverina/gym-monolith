import Room from "./RoomItem/Room";

import { useEffect, useState } from "react";

export default function Rooms({ clubInfo, setClubInfo }) {
    console.log('lol', clubInfo)
    const addNewRoom = () => {
        const newRoom = {
          id: null,
          name: '',
          club_id: clubInfo.id,
          created_at: null,
          updated_at: null,
        };
        const newRoomsArray = [...clubInfo.rooms, newRoom];
        setClubInfo({ ...clubInfo, rooms: newRoomsArray });
      };
     
    return (
        <div>
            {clubInfo.rooms.map((room) => (
                <Room room={room} clubInfo={clubInfo} setClubInfo={setClubInfo}/>
            ))}
            <button
                type="button"
                onClick={addNewRoom}
                class="flex items-center gap-2 rounded-md bg-white px-10 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>Добавить новый зал</span>
            </button>
        </div>
    );
}
