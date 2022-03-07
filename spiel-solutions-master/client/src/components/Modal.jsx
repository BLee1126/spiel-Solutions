import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";

const buttonStyle = {
  borderRadius: "35px 35px",
};

const Modals = ({ modals }) => {
  const [spiel, setSpiel] = useState(null);
  const [id, setID] = useState(null);

  const getSpielByModalID = (id) => {
    axios
      .get(`http://localhost:8000/api/spiels/${id}`)
      .then((res) => setSpiel(res.data))
      .then(() => console.log(spiel))
      .catch((err) => console.log(err));
  };

  const handleClick = (modalID) => {
    setID(modalID);
    console.log(modalID);
  };

  useEffect(() => {
    getSpielByModalID(id);
  }, [id]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        style={buttonStyle}
        onClick={() => handleClick(modals.child_id)}
      >
        {modals.child_name}
      </button>
      {spiel && id ? (
        <div>
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
            data-backdrop="false"
            style={{ display: "flex" }}
          >
            <div
              className="modal-dialog modal-dialog-centered container"
              role="document"
              style={{ maxWidth: "100%" }}
            >
              <div
                className="modal-content w-50 mx-auto"
                style={{ borderRadius: "25px" }}
              >
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    {spiel.name}
                  </h5>
                  <span
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    style={{
                      color: "red",
                      fontSize: "1.25em",
                    }}
                    onClick={() => {
                      setSpiel(null);
                      setID(null);
                    }}
                  >
                    <i className="bi bi-x-square"></i>
                  </span>
                </div>
                <div className="modal-body">{spiel.snippet}</div>
                {spiel.pageArr
                  ? spiel.pageArr.map((page, i) => {
                      return (
                        <div
                          key={i}
                          className="my-auto"
                          style={{ width: "33%" }}
                        >
                          <Link to={`/view/${page.child_id}`}>
                            {page.child_name}
                          </Link>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Modals;
