import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UsersList from "./UsersList/UsersList";

export default function Users() {
    return (
        <><UsersList/></>
    )
}
