import axios from "axios";
import { useState, useEffect } from "react";
import { userStateContext } from "@/context/context-provider";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const navigation = [
    {
        name: "Клуб",
        current: false,
        children: [
            { name: "GraphQL API", href: "#" },
            { name: "iOS App", href: "#" },
            { name: "Android App", href: "#" },
            { name: "New Customer Portal", href: "#" },
        ],
    },
    {
        name: "Вид активности",
        current: false,
        children: [
            { name: "Engineering", href: "#" },
            { name: "Human Resources", href: "#" },
            { name: "Customer Success", href: "#" },
        ],
    },
    {
        name: "Сложность",
        current: false,
        children: [
            { name: "GraphQL API", href: "#" },
            { name: "iOS App", href: "#" },
            { name: "Android App", href: "#" },
            { name: "New Customer Portal", href: "#" },
        ],
    },
    {
        name: "Тренер",
        current: false,
        children: [
            { name: "GraphQL API", href: "#" },
            { name: "iOS App", href: "#" },
            { name: "Android App", href: "#" },
            { name: "New Customer Portal", href: "#" },
        ],
    },
    {
        name: "Время",
        current: false,
        children: [
            { name: "GraphQL API", href: "#" },
            { name: "iOS App", href: "#" },
            { name: "Android App", href: "#" },
            { name: "New Customer Portal", href: "#" },
        ],
    },
];

export default function Selection({ trainings, setTrainings }) {
    const [filters, setFilters] = useState([
        { id: 1, name: "Вид тренировки", items: [] },
        { id: 2, name: "Время", items: [] },
    ]);
    console.log(filters);
    const [currentFilters, setCurrentFilters] = useState([
        { id: 1, items: [] },
        { id: 2, items: [] },
    ]);
    console.log("cur", currentFilters);

    useEffect(() => {
        fetch("/api/trainingvariations")
            .then((response) => response.json())
            .then((data) => {
                setFilters((prevFilters) => {
                    const updatedFilters = prevFilters.map((filter) => {
                        if (filter.id === 1) {
                            return { ...filter, items: data };
                        }
                        return filter;
                    });
                    return updatedFilters;
                });
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetch("/api/trainingtimes")
            .then((response) => response.json())
            .then((data) => {
                setFilters((prevFilters) => {
                    const updatedFilters = prevFilters.map((filter) => {
                        if (filter.id === 2) {
                            return { ...filter, items: data };
                        }
                        return filter;
                    });
                    return updatedFilters;
                });
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        console.log("filter changed");
        axios
            .get(
                `/api/trainings?filter=true&training_variations=${currentFilters.find(({ id }) => id === 1)?.items.join(",")}
                    &training_timings=${currentFilters.find(({ id }) => id === 2)?.items.join(",")}`
            )
            .then((res) => setTrainings(res.data))
            .catch((err) => console.log(err));
    }, [currentFilters]);
    return (
        <div className="h-screen overflow-y-auto top-0 left-0 pt-6 pb-32 w-1/4 flex-col gap-y-5  border-r border-indigo-900 bg-gray-900  px-6">
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {filters.map((filter) => (
                                <li key={filter.name}>
                                    {!filter.items ? (
                                        <a
                                            href=""
                                            className={clsx(
                                                item.current
                                                    ? "hover:bg-gray-800"
                                                    : "hover:bg-gray-800",
                                                "block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-100"
                                            )}
                                        >
                                            {filter.name}
                                        </a>
                                    ) : (
                                        <Disclosure as="div">
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button
                                                        className={clsx(
                                                            filter.current
                                                                ? "bg-gray-800"
                                                                : "hover:bg-gray-800",
                                                            "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-100"
                                                        )}
                                                    >
                                                        <ChevronRightIcon
                                                            className={clsx(
                                                                open
                                                                    ? "rotate-90 text-gray-100"
                                                                    : "text-gray-100",
                                                                "h-5 w-5 shrink-0"
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {filter.name}
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel
                                                        as="ul"
                                                        className="mt-1 px-2"
                                                    >
                                                        {filter.id == 1 && filter.items.map(
                                                            (subItem) => (
                                                                <li
                                                                    key={
                                                                        subItem.name ||
                                                                        subItem.start_time
                                                                    }
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            if (
                                                                                e
                                                                                    .target
                                                                                    .checked
                                                                            ) {
                                                                                setCurrentFilters(
                                                                                    (
                                                                                        prevFilter
                                                                                    ) =>
                                                                                        prevFilter.map(
                                                                                            (
                                                                                                currentFilter
                                                                                            ) =>
                                                                                                currentFilter.id ===
                                                                                                filter.id
                                                                                                    ? {
                                                                                                          ...currentFilter,
                                                                                                          items: [
                                                                                                              ...currentFilter.items,
                                                                                                              subItem.id,
                                                                                                          ],
                                                                                                      }
                                                                                                    : currentFilter
                                                                                        )
                                                                                );
                                                                            } else {
                                                                                setCurrentFilters(
                                                                                    (
                                                                                        prevFilter
                                                                                    ) =>
                                                                                        prevFilter.map(
                                                                                            (
                                                                                                currentFilter
                                                                                            ) =>
                                                                                            currentFilter.id ===
                                                                                                filter.id
                                                                                                    ? {
                                                                                                          ...currentFilter,
                                                                                                          items: currentFilter.items.filter(
                                                                                                              (
                                                                                                                  item
                                                                                                              ) =>
                                                                                                                  item !==
                                                                                                                  subItem.id
                                                                                                          ),
                                                                                                      }
                                                                                                    : currentFilter
                                                                                        )
                                                                                );
                                                                            }
                                                                        }}
                                                                        checked={currentFilters
                                                                            .find(
                                                                                ({
                                                                                    id,
                                                                                }) =>
                                                                                    id ===
                                                                                    filter.id
                                                                            )
                                                                            .items.includes(
                                                                                subItem.id
                                                                            )}
                                                                        id={
                                                                            subItem.id
                                                                        }
                                                                        name={
                                                                            subItem.id
                                                                        }
                                                                    ></input>
                                                                    <label
                                                                        className="pl-2 text-gray-400"
                                                                        for={
                                                                            subItem.id
                                                                        }
                                                                    >
                                                                        {subItem.name ||
                                                                            `${subItem.start_time.slice(
                                                                                0,
                                                                                -3
                                                                            )} - ${subItem.end_time.slice(
                                                                                0,
                                                                                -3
                                                                            )}`}
                                                                    </label>
                                                                </li>
                                                            )
                                                        )}


                                                        {filter.id == 2 && filter.items.map(
                                                            (subItem) => (
                                                                <li
                                                                    key={
                                                                        subItem.start_time
                                                                    }
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        onChange={(e) => {
                                                                            if (
                                                                                e.target.checked
                                                                            ) {
                                                                                setCurrentFilters(
                                                                                    (
                                                                                        prevFilter
                                                                                    ) =>
                                                                                        prevFilter.map(
                                                                                            (
                                                                                                currentFilter
                                                                                            ) =>
                                                                                                currentFilter.id ===
                                                                                                filter.id
                                                                                                    ? {
                                                                                                          ...currentFilter,
                                                                                                          items: [
                                                                                                              ...currentFilter.items,
                                                                                                              subItem.id,
                                                                                                          ],
                                                                                                      }
                                                                                                    : currentFilter
                                                                                        )
                                                                                );
                                                                            } else {
                                                                                setCurrentFilters(
                                                                                    (
                                                                                        prevFilter
                                                                                    ) =>
                                                                                        prevFilter.map(
                                                                                            (
                                                                                                currentFilter
                                                                                            ) =>
                                                                                                currentFilter.id ===
                                                                                                filter.id
                                                                                                    ? {
                                                                                                          ...currentFilter,
                                                                                                          items: currentFilter.items.filter(
                                                                                                              (
                                                                                                                  item
                                                                                                              ) =>
                                                                                                                  item !==
                                                                                                                  subItem.id
                                                                                                          ),
                                                                                                      }
                                                                                                    : currentFilter
                                                                                        )
                                                                                );
                                                                            }
                                                                        }}
                                                                        checked={currentFilters
                                                                            .find(
                                                                                ({
                                                                                    id,
                                                                                }) =>
                                                                                    id ===
                                                                                    filter.id
                                                                            )
                                                                            .items.includes(
                                                                                subItem.id
                                                                            )}
                                                                        id={
                                                                            subItem.start_time
                                                                        }
                                                                        name={
                                                                            subItem.start_time
                                                                        }
                                                                    ></input>
                                                                    <label
                                                                        className="pl-2 text-gray-400"
                                                                        for={
                                                                            subItem.start_time
                                                                        }
                                                                    >
                                                                        {subItem.name ||
                                                                            `${subItem.start_time.slice(
                                                                                0,
                                                                                -3
                                                                            )} - ${subItem.end_time.slice(
                                                                                0,
                                                                                -3
                                                                            )}`}
                                                                    </label>
                                                                </li>
                                                            )
                                                        )}
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
