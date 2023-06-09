import React, { useState } from "react";
import Layout from "./common/Layout/Layout";
import { userStateContext } from '@/context/context-provider';
import MainTrainerContent from "./trainer/main-page/MainContent";
import MainClientContent from "./clients/main-page/MainContent";
// import TrainerAccount from "./trainer/account/Account";
import ClientAccount from "./clients/account/Account";

const Account = () => {
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();
    return (
        <div className="">
             {(currentUser && currentUser.user_type == 't') ? <ClientAccount/> : (currentUser && currentUser.user_type == 'c' && currentUser.name)? <ClientAccount/> : <div className="bg-gray-900 h-96">account not found</div>}
        </div>
    );
};

export default Account;
