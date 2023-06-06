import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function ClubsListItem({
    club,
    selectedClub,
    setSelectedClub,
    setMapState,
}) {
    const uniqueNames = new Set();
    return (
        <li
            className={clsx(
                    selectedClub?.id === club.id
                    ?"bg-indigo-200"
                    :"bg-indigo-50",
                    "col-span-1 divide-ydivide-gray-200 rounded-lg  shadow "
            )}
        >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="truncate text-sm font-medium text-gray-900">
                            {club.name}
                        </h3>
                        {/* <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {club.address}
                        </span> */}
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">
                        {club.address}
                    </p>
                </div>
                <img
                    className="h-16 w-16 flex-shrink-0 bg-gray-300"
                    src="https://amiel.club/uploads/posts/2022-03/1647619760_1-amiel-club-p-kartinki-sportzala-1.jpg"
                    alt=""
                />
            </div>
            {/* {club.rooms &&
                club.rooms.map((room, roomidx) => (
                    <div className="bg-red-50">
                        {room.training_variations &&
                            room.training_variations.map((tr) => (
                                <div className="bg-red-200">{tr.name}</div>
                            ))}
                    </div>
                ))} */}
            <div>
                <div className="-mt-px flex divide-x divide-gray-200 border-black border-t">
                    {/* <div className="flex w-0 flex-1">
                        <a
                            href={"clubs/" + club.seo_name}
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            Подробнее
                        </a>
                    </div> */}
                    <div className="-ml-px flex w-0 flex-1">
                        <button
                            onClick={() => {
                                setSelectedClub(club);
                                setMapState({
                                    center: [club.latitude, club.longitude],
                                    zoom: 15,
                                });
                            }}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                            {/* <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                            На карте
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}
