import React, { useEffect } from "react";
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
    return (
        <div className="bg-gray-900 flex flex-wrap">
          {/* <div className=" w-1/4 bg-red-200"> dokwodk</div>
          <div className=" w-3/4 bg-green-200"> fdf</div> */}
            <Selection/>
            <TrainingsList/>
        </div>
    );
}
