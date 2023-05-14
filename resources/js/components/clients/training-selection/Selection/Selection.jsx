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
    { name: "Выберите ваши предпочтения", href: "#", current: true },
    {
        name: "Teams",
        current: false,
        children: [
            { name: "Engineering", href: "#" },
            { name: "Human Resources", href: "#" },
            { name: "Customer Success", href: "#" },
        ],
    },
    {
        name: "Projects",
        current: false,
        children: [
            { name: "GraphQL API", href: "#" },
            { name: "iOS App", href: "#" },
            { name: "Android App", href: "#" },
            { name: "New Customer Portal", href: "#" },
        ],
    },
];

export default function Selection() {
    return (
        <div className="pt-6 pb-32 w-1/4 flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gray-900  px-6">
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    {!item.children ? (
                                        <a
                                            href={item.href}
                                            className={clsx(
                                                item.current
                                                    ? "bg-gray-800"
                                                    : "hover:bg-gray-800",
                                                "block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-100"
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ) : (
                                        <Disclosure as="div">
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button
                                                        className={clsx(
                                                            item.current
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
                                                        {item.name}
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel
                                                        as="ul"
                                                        className="mt-1 px-2"
                                                    >
                                                        {item.children.map(
                                                            (subItem) => (
                                                                <li
                                                                    key={
                                                                        subItem.name
                                                                    }
                                                                >
                                                                    <Disclosure.Button
                                                                        as="a"
                                                                        href={
                                                                            subItem.href
                                                                        }
                                                                        className={clsx(
                                                                            subItem.current
                                                                                ? "bg-gray-800"
                                                                                : "hover:bg-gray-800",
                                                                            "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-100"
                                                                        )}
                                                                    >
                                                                        {
                                                                            subItem.name
                                                                        }
                                                                    </Disclosure.Button>
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
