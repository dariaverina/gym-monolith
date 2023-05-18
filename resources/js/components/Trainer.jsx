import React, { useEffect } from "react";
import Layout from "./common/Layout/Layout";
// import './app.css';
import ClientsClubs from "./clients/clubs/Clubs";
import { userStateContext } from '@/context/context-provider';
import ManagerClubs from './manager/Dashboard/Clubs/Clubs';
import axiosClient from "@/public/axios";
import ManagerClub from "./manager/Dashboard/Clubs/Club/Club";
import ClientClub from "./clients/clubs/Club/Club";
import TrainerProfile from "./clients/trainers/TrainerProfile/TrainerProfile";

export default function Trainer () {
  const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    return (
        <>
        <TrainerProfile/>
        </>
       
    )
}
