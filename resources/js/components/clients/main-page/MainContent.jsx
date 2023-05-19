import { useState, useEffect } from "react";

export default function MainClientContent() {
    return (
        <div className="bg-gray-900 relative">
            <img
                className="w-full  opacity-10"
                src="https://alexfitness.ru/assets/images/fitguide/gruppovie-trenirovki.jpg"
                alt="Background Image"
            />
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
                <h1 className="font-extrabold text-transparent h-72 text-7xl bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900">
                    Сеть спортклубов
                </h1>
            </div>
        </div>
    );
}
