import React, { useState } from "react";
import axios from "axios";

const Reg = () => {
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const regChangeHandler = (e) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/register", registerInfo, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("response from registering", res)
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          console.log("success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="reg">
      <h2>Register Here</h2>
      <form method="POST" onSubmit={register}>
        <div class="form-group">
          <label>First Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            name="firstName"
            onChange={regChangeHandler}
          />
          {errors.firstName ? (
            <p className="text-danger">{errors.firstName.message}</p>
          ) : (
            ""
          )}
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Last Name"
            name="lastName"
            onChange={regChangeHandler}
          />
          {errors.lastName ? (
            <p className="text-danger">{errors.lastName.message}</p>
          ) : (
            ""
          )}
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input
            type="text"
            class="form-control"
            placeholder="Email Address"
            name="email"
            onChange={regChangeHandler}
          />
          {errors.email ? (
            <p className="text-danger">{errors.email.message}</p>
          ) : (
            ""
          )}
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            name="password"
            onChange={regChangeHandler}
          />
          {errors.password ? (
            <p className="text-danger">{errors.password.message}</p>
          ) : (
            ""
          )}
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={regChangeHandler}
          />
          {errors.confirmPassword ? (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          ) : (
            ""
          )}
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};
export default Reg;
