import { PlusIcon } from "@heroicons/react/20/solid";
import Variations from "./Variations/Variations";

export default function Room({ room, clubInfo, setClubInfo }) {
 console.log('rrooom',room)

    return (
        <div class="flex">
            <div
                key={room.id}
                className="mb-10 w-3/5 grid grid-cols-9 gap-4 items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm "
            >
                <div className="col-span-4">
                    <div>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Название зала
                            </label>
                            <div className="mt-2">
                                <input
                                    value={room.name}
                                    onChange={(e) =>
                                        setClubInfo((prev) => ({
                                            ...prev,
                                            rooms: prev.rooms.map((r) =>
                                                r.id === room.id
                                                    ? {
                                                          ...r,
                                                          name: e.target.value,
                                                      }
                                                    : r
                                            ),
                                        }))
                                    }
                                    name="name"
                                    id="name"
                                    className="block w-64 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="capacity"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Максимальная вместимость
                            </label>
                            <div className="mt-2">
                                <input
                                    value={room.capacity}
                                    onChange={(e) =>
                                        setClubInfo((prev) => ({
                                            ...prev,
                                            rooms: prev.rooms.map((r) =>
                                                r.id === room.id
                                                    ? {
                                                          ...r,
                                                          capacity:
                                                              e.target.value,
                                                      }
                                                    : r
                                            ),
                                        }))
                                    }
                                    name="capacity"
                                    id="capacity"
                                    className="block w-16 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <legend className="text-base font-semibold leading-6 text-gray-900">
                        Типы тренировок
                    </legend>
                    <Variations roomVariations = {room.training_variations} clubInfo = {clubInfo} setClubInfo={setClubInfo} room={room}/>
                </div>
                <button className="col-span-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
