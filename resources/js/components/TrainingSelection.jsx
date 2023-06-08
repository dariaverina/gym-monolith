import React, { useEffect, useState } from "react";
import Layout from "./common/Layout/Layout";
// import './app.css';
import ClientsClubs from "./clients/clubs/Clubs";
import { userStateContext } from "@/context/context-provider";
import ManagerClubs from "./manager/Dashboard/Clubs/Clubs";
import axiosClient from "@/public/axios";
import ClientsTrainers from "./clients/trainers/Trainers";
import Selection from "./clients/training-selection/Selection/Selection";
import TrainingsList from "./clients/training-selection/TrainingsList/TrainingsList";


export default function TrainingSelection() {
    const [trainings, setTrainings] = useState([]);
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    useEffect(() => {
        axios
            .get('/api/trainings?filter=true&user_id=' + currentUser.id)
            .then((res) => setTrainings(res.data))
            .catch((err) => console.log(err));
    }, [currentUser]);
    return (
        <div className="bg-gray-900 flex ">
            <Selection trainings={trainings} setTrainings={setTrainings}/>
            <TrainingsList trainings={trainings} setTrainings={setTrainings}/>
        </div>
    );
}
