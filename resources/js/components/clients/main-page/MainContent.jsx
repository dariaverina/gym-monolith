// export default function MainClientContent() {
//     return (
//         <div className="bg-gray-900 relative">
//             <img
//                 className="w-full  opacity-5"
//                 src="https://avatars.dzeninfra.ru/get-zen_doc/112656/pub_5ae1de3d2f578c8a0d342a03_5ae1de5457906af28ad4bb71/scale_1200"
//                 alt="Background Image"
//             />
//             <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
//                 <h1 className="font-extrabold text-transparent h-72 text-7xl bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900">
//                     Удобное расписание
//                 </h1>
//                 <button className="text-white px-6 py-2 font-extrabold opacity-100 text-2xl rounded-lg bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900 opacity-100">
//                     <a href="http://localhost:8000/register">Зарегистрировать ВУЗ</a>
//                 </button>
//             </div>
//         </div>
//     );
// }

import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const images = [
    {
        src: "https://www.profguide.io/images/article/a/51/RRfM53TmVX.webp",
        text: "Начните работу, зарегистрировав свой ВУЗ!",
    },
    {
        src: "https://www.profguide.io/images/article/a/51/RRfM53TmVX.webp",
        text: "Нужно создать расписание по своим условиям? Свяжитесь с нами по почте dashka400g@gmail.com",
    },
    {
        src: "https://www.profguide.io/images/article/a/51/RRfM53TmVX.webp",
        text: "Получение напоминаний через телеграмм-бот",
    }
];
export default function MainClientContent() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };
    return (
        <div className="bg-gray-900">
            <p className="flex items-center justify-center pt-10 flex-col text-2xl text-white">
                Какие возможности открывает использование сайта?
            </p>
            <div className="flex items-center justify-center pt-10">
                <div className="relative w-3/5 h-56 md:h-96 overflow-hidden rounded-lg bg-gray-900">
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

                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white text-3xl">
                                <p className="ml-24 mr-24 mb-8 text-center">{imageUrl.text}</p>
                                {/* Отобразить кнопку только для первого элемента */}
                                {index === 0  && (
                                    <button className="text-white px-6 py-2 font-extrabold text-2xl rounded-lg bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900 opacity-100">
                                        <a href="http://localhost:8000/register">Зарегистрировать ВУЗ</a>
                                    </button>
                                )}
                                {index === 1  && (
                                    <button className="text-white px-6 py-2 font-extrabold text-2xl rounded-lg bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900 opacity-100">
                                        <a href="http://localhost:8000/order">Свои условия</a>
                                    </button>
                                )}
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
        </div>

    );
}

