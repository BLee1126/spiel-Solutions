import React, {useState} from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password:""
    })

    const [errors, setErrors] = useState({
        msg:""
    })

    const loginChangeHandler = (e) => {
        setLoginInfo({
            ...loginInfo,[e.target.name]:e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", loginInfo, {withCredentials:true})
            .then(res => {
                console.log("Login response", res)
                if(res.data.msg === "success!") {
                    navigate("/home");
                }
                else {
                    setErrors({msg: res.data.msg});
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div id="login" >
            <h2>Login Here</h2>
            <form method = 'POST' onSubmit={login}>
                <div class="form-group">
                    <label>Email Address:</label>
                    <input type="text" class="form-control" placeholder="email here!" name='email' onChange={loginChangeHandler}/>
                </div>
                <div class="form-group">
                    <label>Password:</label>
                    <input type="password" class="form-control" placeholder="password" name='password' onChange={loginChangeHandler}/>
                </div>
                <input type="submit" value = 'Log in'/>
            </form>
            {errors.msg? <p className="text-danger">{errors.msg}</p> :""}
        </div>
    );
};
export default Login;