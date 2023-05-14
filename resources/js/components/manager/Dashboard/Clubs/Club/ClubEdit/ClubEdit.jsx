import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import ClubInfo from "./ClubInfo/ClubInfo";
import Rooms from "./Rooms/Rooms";
import { useUI } from '@/context/use-ui';

const navigation = [
    { name: "Клуб", id: 1 },
    { name: "Залы", id: 2 },
];

export default function ClubEdit({ isNew, club }) {
    const { openModal, showLoader, hideLoader, setModalContent, displayModal } =useUI();
    const [selectedSection, setSelectedSection] = useState(navigation[0].name);
    const [clubInfo, setClubInfo] = useState(
        club
            ? club
            : {
                  name: "",
                  seo_name: "",
                  address: "",
                  latitude: null,
                  longitude: null,
                  rooms: []
              }
    );
    console.log('oooo',clubInfo)

    let content;
    switch (selectedSection) {
        case "Клуб":
            content = (
                <ClubInfo clubInfo={clubInfo} setClubInfo={setClubInfo} />
            );
            break;
        case "Залы":
            content = <Rooms clubInfo={clubInfo} setClubInfo={setClubInfo} />;
            break;
        default:
            content = null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNew) {
            axios.post("/clubs", clubInfo).then((response) => {
                console.log(response.data);
                // window.location.href = "/clubs/" + clubInfo.seo_name;
                // Do something with the response
            });
        }
        else{
            console.log('pppp', clubInfo)
            axios.put(`/clubs/${clubInfo.id}`, clubInfo).then((response) => {
                console.log(response.data);
                // setModalContent(<div>Успешно обновлено!</div>)
                // openModal();
                // window.location.href = "/clubs/";
                // Do something with the response
            });
        }
    };
    return (
        <>
            <Navigation
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                navigation={navigation}
            />
            <div className="mt-10 ml-32 mr-32">
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
