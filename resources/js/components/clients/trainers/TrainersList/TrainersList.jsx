import axios from "axios";
import { StarIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from "react";
import { userStateContext } from "@/context/context-provider";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Variation from "./../../../manager/Dashboard/Clubs/Club/ClubEdit/Rooms/RoomItem/Variations/Variation/Variation";
import clsx from "clsx";

export default function TrainersList({ trainers }) {
    
    return (
        <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
            {trainers.map((trainer) => (
                <li
                    key={trainer.email}
                    className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gradient-to-tl from-[#89403c] to-[#532837] text-center shadow"
                >
                    <div className="flex flex-1 flex-col p-8" href='/trainers'>
                        <img
                            className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                            src={trainer.photo ? `/storage/${trainer.photo}` : "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-6-1024x1024.jpg"}
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
                    <div className="flex items-center">
               
              </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <a
                                    href={`trainers/${trainer.id}`}
                                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />
</svg>

                                    Подробнее
                                </a>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                {/* <button
                                    href={`tel:${trainer.phone}`}
                                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                >
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                     <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>


                                    В избранное
                                </button> */}
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
