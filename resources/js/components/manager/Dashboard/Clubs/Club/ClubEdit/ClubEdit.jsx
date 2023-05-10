import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import ClubInfo from "./ClubInfo/ClubInfo";
import Rooms from "./Rooms/Rooms";

const navigation = [
    { name: "Клуб", id: 1 },
    { name: "Залы", id: 2 },
];

export default function ClubEdit() {
    const [selectedSection, setSelectedSection] = useState(navigation[0].name);
    const [clubInfo, setClubInfo] = useState({name: '', seo_name: '', address: '', latitude:null, longitude: null})
    console.log(clubInfo)

    let content;
    switch (selectedSection) {
        case "Клуб":
            content = <ClubInfo clubInfo = {clubInfo} setClubInfo = {setClubInfo}/>;
            break;
        case "Залы":
            content = <Rooms />;
            break;
        default:
            content = null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/clubs", clubInfo).then((response) => {
          console.log(response.data);
          // Do something with the response
        });
      };
    return (
        <>
            <Navigation
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                navigation={navigation}
            />
            <div className="mt-10 ml-32">
                {content}
                <button
                    onClick={handleSubmit}
                    className="mt-6 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Сохранить
                </button>
            </div>
        </>
    );
}
