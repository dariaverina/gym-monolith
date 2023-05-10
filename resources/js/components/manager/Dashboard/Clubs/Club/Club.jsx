import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ClubEdit from "./ClubEdit/ClubEdit";

export default function ManagerClub(props) {
    const { clubName } = useParams();
    console.log("clubName", clubName);
    const [club, setClub] = useState(null);


    useEffect(() => {
        axios
            .get(`/api/clubs/${clubName}`)
            .then((res) => setClub(res.data))
            .catch((err) => console.log(err));
    }, [clubName]);

    return (<>
        {clubName == 'new-club'
        ? <div><ClubEdit/></div>
        : <>{club ? <div><ClubEdit/></div> : <>404 no such club</>}</>
        }
    </>);
}
