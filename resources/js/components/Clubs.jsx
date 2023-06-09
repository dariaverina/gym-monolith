import React, { useEffect } from "react";
import Layout from "./common/Layout/Layout";
// import './app.css';
import ClientsClubs from "./clients/clubs/Clubs";
import { userStateContext } from '@/context/context-provider';
import ManagerClubs from './manager/Dashboard/Clubs/Clubs';
import axiosClient from "@/public/axios";

export default function Clubs () {
  const { currentUser, setCurrentUser, setUserToken } = userStateContext();
  console.log('us',currentUser);
    return (
        <div>
         {(currentUser && currentUser.user_type == 'm') ? <ManagerClubs/> :<ClientsClubs/>}
        </div>
       
    )
}
