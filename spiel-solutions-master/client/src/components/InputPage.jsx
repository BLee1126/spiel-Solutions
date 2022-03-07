import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const InputPage = (props) => {
  const [newspiel, setNew] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { add, setAdd } = props;

  const handleNew = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/spiels/create", {
        element: props.element,
        name: newspiel,
        scriptName: props.spiel.scriptName,
      })
      .then((res) => {
        axios
          .put(
            `http://localhost:8000/api/spiels/update/array/${props.spiel._id}`,
            {
              child_name: res.data.name,
              child_id: res.data._id,
              element: props.element,
            }
          )
          .then((res) => {
            setRefresh(!refresh);
            setAdd(!add);
            document.getElementById("newpageX").click();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-sm shadow-none"
        data-toggle="modal"
        data-target="#pageAdd"
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
          id="pageAdd"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{ borderRadius: "25px" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Create A New Page
                </h5>
                <span
                  id="newpageX"
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
                <form onSubmit={handleNew}>
                  <TextField
                    className="w-100"
                    id="filled-basic"
                    label="Page Name"
                    variant="filled"
                    name="new"
                    onChange={(e) => setNew(e.target.value)}
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

export default InputPage;
