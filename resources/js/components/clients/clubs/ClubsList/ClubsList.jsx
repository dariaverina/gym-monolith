import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import ClubsListItem from "./ClubsListItem/ClubsListItem";

export default function ClubsList({
    clubs,
    selectedClub,
    setSelectedClub,
    setMapState,
}) {
    return (
        <ul
            role="list"
            className=" w-2/5 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-2 mr-10 ml-10 "
        >
            {clubs.map((club) => (
                <ClubsListItem club = {club} selectedClub={selectedClub} setSelectedClub={setSelectedClub} setMapState={setMapState}/>
            ))}
        </ul>
    );
}
