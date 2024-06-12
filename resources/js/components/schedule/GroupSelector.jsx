import React, { useEffect, useState, Fragment } from "react";
import clsx from "clsx";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function GroupSelector({ groups, selectedGroup, setSelectedGroup }) {
    return (
        <div className="mb-4">
            <Listbox value={selectedGroup} onChange={setSelectedGroup}>
                {({ open }) => (
                    <>
                        <div className="relative">
                            <Listbox.Button className="mt-4 relative w-full cursor-default rounded-md bg-gray-800 py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <span className="block truncate">
                                    {selectedGroup ? selectedGroup.name : "Поиск"}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>
                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {groups.map((group) => (
                                        <Listbox.Option
                                            key={group.id}
                                            className={({ active }) =>
                                                clsx(
                                                    active ? "bg-indigo-600 text-white" : "text-gray-900",
                                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                                )
                                            }
                                            value={group}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={clsx(
                                                            selected ? "font-semibold" : "font-normal",
                                                            "block truncate"
                                                        )}
                                                    >
                                                        {group.name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={clsx(
                                                                active ? "text-white" : "text-indigo-600",
                                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
}
