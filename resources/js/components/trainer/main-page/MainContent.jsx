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
export default function MainTrainerContent() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };
    return (
        <>
            <p className="flex items-center justify-center pt-10 flex-col text-2xl">
                Добро пожаловать на обзорную панель тренера клуба Grupovie
                trenirovki
                <br />
            </p>
            <p className="flex items-center justify-center pt-10 flex-col text-2xl">
                Какие возможности открывает панель тренера?
            </p>
            <div className="flex items-center justify-center pt-10">
                <div className="relative w-3/5 h-56 md:h-96 overflow-hidden rounded-lg bg-gray-900 ">
                    {/* Carousel wrapper */}
                    {images.map((imageUrl, index) => (
                        <Transition
                            key={index}
                            show={index === currentIndex}
                            enter="transition-opacity duration-700"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-700"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <img
                                src={imageUrl.src}
                                className="absolute inset-0 object-cover w-full h-full backdrop-opacity-0"
                                alt={`Carousel Item ${index}`}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white text-3xl">
                                <p className="ml-24 mr-24">{imageUrl.text}</p>
                            </div>
                        </Transition>
                    ))}
                    {/* Slider controls */}
                    <button
                        type="button"
                        className="absolute z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gray-900/50 top-1/2 left-2 md:w-10 md:h-10 md:left-4 transform -translate-y-1/2 focus:outline-none"
                        onClick={handlePrev}
                    >
                        <ChevronLeftIcon className="w-5 h-5 text-white md:w-6 md:h-6" />
                    </button>
                    <button
                        type="button"
                        className="absolute z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gray-900/50 top-1/2 right-2 md:w-10 md:h-10 md:right-4 transform -translate-y-1/2 focus:outline-none"
                        onClick={handleNext}
                    >
                        <ChevronRightIcon className="w-5 h-5 text-white md:w-6 md:h-6" />
                    </button>
                </div>
            </div>
        </>
    );
}
