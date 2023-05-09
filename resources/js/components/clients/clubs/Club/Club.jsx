import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Club(props) {
    const { clubName } = useParams();
    console.log("clubName", clubName);
    const [club, setClub] = useState(null);


    useEffect(() => {
        axios
            .get(`/api/clubs/${clubName}`)
            .then((res) => setClub(res.data))
            .catch((err) => console.log(err));
    }, [clubName]);

    return <>{club ? <div>{club.name}</div> : <>404 no such club</>}</>;
}
