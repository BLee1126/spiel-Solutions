import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const ScriptInputModal = (props) => {
  const { add, setAdd } = props;
  const initialFormState = {
    scriptName: "",
    element: "Page",
    name: "Start script",
    isHead: true,
  };
  const [scriptForm, setScriptForm] = useState(initialFormState);

  const onChangeHandler = (e) => {
    setScriptForm({
      ...scriptForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/spiels/create", scriptForm)
      .then((res) => {
        if (res.data.error) {
          console.log("There was an error creating a spiel");
        } else {
          console.log("A spiel was created");
          setAdd(!add);
          document.getElementById("modalX").click();
        }
      })
      .then(setScriptForm(initialFormState))
      .catch((err) => console.log("There was an error creating a spiel", err));
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-sm shadow-none"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        {" "}
        <i
          className="bi bi-plus-square-dotted"
          style={{ fontSize: "2em", color: "#0E6EFC" }}
        ></i>
      </button>
      <div>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{ borderRadius: "25px" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Create A New Script
                </h5>
                <span
                  id="modalX"
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{
                    color: "red",
                    fontSize: "1.25em",
                  }}
                  onClick={(e) => console.log(e)}
                >
                  <i className="bi bi-x-square"></i>
                </span>
              </div>
              <div className="modal-body">
                {" "}
                <form onSubmit={handleSubmit}>
                  <TextField
                    className="w-100"
                    id="filled-basic"
                    label="Script Name"
                    variant="filled"
                    name="scriptName"
                    value={scriptForm.scriptName}
                    onChange={onChangeHandler}
                  />
                  <TextField
                    className="w-100"
                    id="filled-basic"
                    label="Name"
                    variant="filled"
                    name="name"
                    value={scriptForm.name}
                    onChange={onChangeHandler}
                  />
                  <button type="submit" className="btn btn-primary w-100 mt-2">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptInputModal;
