import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ClubsList from "./ClubsList/ClubsList";

export default function ManagerClubs() {
    return (<>
        <ClubsList/>
    </>);
}
