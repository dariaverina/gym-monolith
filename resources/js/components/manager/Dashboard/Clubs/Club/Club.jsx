import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ClubEdit from "./ClubEdit/ClubEdit";

export default function ManagerClub(props) {
    const { clubName } = useParams();
    console.log("clubName", clubName);
    const [club, setClub] = useState(null);
    // console.log('1111', club)

    useEffect(() => {
        axios
            .get(`/api/clubs/${clubName}`)
            .then((res) => setClub(res.data))
            .catch((err) => console.log(err));
    }, [clubName]);

    return (<>
        {clubName == 'new-club'
        ? <div><ClubEdit isNew/></div>
        : <>{club ? <div><ClubEdit club = {club}/></div> : <>404 no such club</>}</>
        }
    </>);
}
