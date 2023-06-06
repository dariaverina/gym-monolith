import React, { useState } from "react";
import Layout from "./common/Layout/Layout";
import { userStateContext } from '@/context/context-provider';
import MainTrainerContent from "./trainer/main-page/MainContent";
import MainClientContent from "./clients/main-page/MainContent";
import MainManagerContent from "./manager/main-page/main-page/MainContent";

const App = () => {
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    return (
        <div className="bg-indigo-100">
             {(currentUser && currentUser.user_type == 't') ? <MainTrainerContent/> : (currentUser && currentUser.user_type == 'm') ? <MainManagerContent/> : <MainClientContent/>}
        </div>
    );
};

export default App;
