import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import Reg from "../components/Reg";

const LoginReg = () => {



    return (
        <div className="landingPage">
            <h1><span id="login">Login</span> and <span id= 'registration'>Registration</span></h1>
            <div id = "container">
                <Reg />
                <Login />
            </div>
        </div>

    )
};
export default LoginReg;