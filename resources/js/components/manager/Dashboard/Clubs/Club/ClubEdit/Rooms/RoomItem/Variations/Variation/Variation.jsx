export default function Variation({ variation, room, clubInfo, setClubInfo }) {
    const handleCheckboxChange = (variationId, checked) => {
        const updatedVariations = checked
            ? [...room.training_variations, variationId]
            : room.training_variations.filter(id => id !== variationId);
        const updatedRoom = { ...room, training_variations: updatedVariations };
        const updatedRooms = clubInfo.rooms.map(current_room =>
            current_room.id === room.id ? updatedRoom : current_room
        );
        setClubInfo({ ...clubInfo, rooms: updatedRooms });
    }

    return (
        <div key={variation.id} className="relative flex items-start">
            <div className="min-w-0 flex-1 text-sm leading-6">
                <label
                    htmlFor={`person-${variation.id}`}
                    className="select-none font-medium text-gray-900"
                >
                    {variation.name}
                </label>
            </div>
            <div className="ml-3 flex h-6 items-center">
                <input
                    id={`person-${variation.id}-${room.id}`}
                    name={`person-${variation.id}-${room.id}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={
                        room.training_variations && room.training_variations.includes(variation.id)
                    }
                    onChange={(e) =>
                        handleCheckboxChange(variation.id, e.target.checked)
                    }
                />
            </div>
        </div>
    );
}
