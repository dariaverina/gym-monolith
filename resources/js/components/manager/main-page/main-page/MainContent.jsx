import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const images = [
    {
        src: "https://www.fitness-briz.ru/bitrix/templates/briz/images/5foto.jpg",
        text: "Планирование своего расписания и возможность проведения тренировок в удобное время",
    },
    {
        src: "https://cdn.shazoo.ru/c576x256/660078_LRGPHwe_shfiayi11azoo-title.jpg",
        text: "Ведение учета финансов и клиентов",
    },
];
export default function MainManagerContent() {
  
    return (
        <div className="bg-gray-900 relative">
            <img
                className="w-full  opacity-10"
                src="https://sfedu.ru/files/imagecache/newsBig/presscenter/ac6/e7a/news_pic_id73114.jpg"
                alt="Background Image"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
                <h1 className="font-extrabold text-transparent h-72 text-4xl bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900">
                    Добро пожаловать в личный кабинет сотрудника ВУЗа
                </h1>
            </div>
        </div>
    );
}
