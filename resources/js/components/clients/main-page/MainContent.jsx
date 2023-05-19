import { useState, useEffect } from "react";

export default function MainClientContent() {
    return (
        <div className="bg-gray-900">
            <div className="flex justify-center">
                <h1 class="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-indigo-900 via-indigo-400 to-indigo-900">
                    Сеть спортклубов
                </h1>
            </div>
            <img
                className="w-11/12 "
                src="https://krot.info/uploads/posts/2023-04/thumbs/1680469144_krot-info-p-fon-sportzala-vkontakte-92.jpg"
            ></img>
        </div>
    );
}
