import React, { useState } from "react";
import Layout from "./common/Layout/Layout";
import { userStateContext } from '@/context/context-provider';
import MainTrainerContent from "./trainer/main-page/MainContent";
import MainClientContent from "./clients/main-page/MainContent";
import TrainerAccount from "./trainer/account/Account";
import ClientAccount from "./clients/account/Account";

const Account = () => {
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    return (
        <div className="">
             {(currentUser && currentUser.user_type == 't') ? <TrainerAccount/> : (currentUser && currentUser.user_type == 'c' && currentUser.name)? <ClientAccount/> : <>404</>}
        </div>
    );
};

export default Account;
