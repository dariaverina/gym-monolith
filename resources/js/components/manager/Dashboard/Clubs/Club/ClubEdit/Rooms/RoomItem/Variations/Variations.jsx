import { useEffect, useState } from "react";
import Variation from "./Variation/Variation";

export default function Variations({ roomVariations, clubInfo, setClubInfo, room }) {
    const [variations, setVariations] = useState([]);
    console.log(clubInfo)
    useEffect(() => {
        fetch("/api/trainingvariations")
            .then((response) => response.json())
            .then((data) => setVariations(data))
            .catch((error) => console.error(error));
    }, []);

    // const handleCheckboxChange = (variationId, checked) => {
    //     const updatedVariations = checked
    //         ? [...roomVariations, variationId]
    //         : roomVariations.filter(id => id !== variationId);
    //     const updatedRooms = clubInfo.rooms.map(current_room => {
    //         if (current_room.id === room.id) {
    //             return { ...current_room, training_variations: updatedVariations };
    //         }
    //         return room;
    //     });
    //     setClubInfo({ ...clubInfo, rooms: updatedRooms });
    // }

    return (
        <div className="mt-4 divide-y  divide-gray-200 border-gray-200 h-32 overflow-y-auto">
        {variations && variations.map((variation, variationIdx) => (
            <Variation setClubInfo = {setClubInfo} variation={variation} clubInfo={clubInfo} room = {room}/>
        ))}
    </div>
    );
}
