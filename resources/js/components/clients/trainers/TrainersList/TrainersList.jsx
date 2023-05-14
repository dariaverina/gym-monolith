import axios from "axios";
import { useState, useEffect } from "react";
import { userStateContext } from "@/context/context-provider";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Variation from "./../../../manager/Dashboard/Clubs/Club/ClubEdit/Rooms/RoomItem/Variations/Variation/Variation";

export default function TrainersList({ trainers }) {
    return (
        <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
            {trainers.map((trainer) => (
                <li
                    key={trainer.email}
                    className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-indigo-300 text-center shadow"
                >
                    <div className="flex flex-1 flex-col p-8">
                        <img
                            className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                            src={"/storage/" + trainer.photo}
                            alt="User's profile photo"
                        />
                        <h3 className="mt-6 text-sm font-medium text-gray-900">
                            {trainer.name}
                        </h3>
                        <dl className="mt-1 flex flex-grow flex-col justify-between">
                            <dt className="sr-only">Title</dt>
                            <dd className="text-sm text-gray-500">
                                {/* {person.title} */}
                            </dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="mt-3">
                                {trainer?.training_variations_names.map(
                                    (variation) => (
                                        <span className="mr-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            {/* {person.role} */}
                                            {variation}
                                        </span>
                                    )
                                )}
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <a
                                    href={`mailto:${trainer.email}`}
                                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                >
                                    <EnvelopeIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    Email
                                </a>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                <a
                                    href={`tel:${trainer.phone}`}
                                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                >
                                    <PhoneIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    Call
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
