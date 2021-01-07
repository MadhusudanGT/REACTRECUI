import React from 'react';
import CenteredTab from "../../components/CenteredTabs/ActiveUsers";
import Icons from "../../components/Icons/Icons";
import MenuBar from "../../components/MenuBar/Menu";
import PopUp from "../../components/PopUpBox/PopUp";
import RECTable from "../../components/RECTable/Table";
import User from "../../components/CenteredTabs/User";
import ActiveUser from"../../components/CenteredTabs/ActiveUsers";
import InActiveUser from"../../components/CenteredTabs/inActiveUser";
const UserSettings=()=>{
    return(
        <>
        <MenuBar/>
        <User/>
        </>
    )
}

export default UserSettings;