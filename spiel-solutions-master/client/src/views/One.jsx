import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Modal from "../components/Modal";

const titleStyle = {
  border: "1px solid lightgrey",
  height: "20%",
  borderRadius: "35px 35px 35px 35px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "ghostwhite",
};

const snippetStyle = {
  border: "1px solid lightgrey",
  height: "50%",
  borderRadius: "35px 35px 35px 35px",
  display: "flex",
  // justifyContent: "center"
  fontSize: "21px",
  padding: "2.25em",
  backgroundColor: "aliceblue",
};
const pagesStyle = {
  height: "20%",
  display: "flex",
  justifyContent: "space-between",
  padding: "0em 5em",
  backgroundColor: "darkgray",
};

const One = (props) => {
  const [spiel, setSpiel] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/spiels/${props.id}`)
      .then((res) => setSpiel(res.data))
      .catch((err) => console.log(err));
  }, [props.id]);

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <>
      {spiel ? (
        <>
          {" "}
          <div className="container">
            <div
              className="col-12 pt-4"
              style={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
                padding: "0em 2em",
              }}
            >
              <i
                class="bi bi-house-fill"
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "crimson",
                }}
                onClick={navigateHome}
              ></i>
              {/* <h4 style={{ color: "indianred", textDecoration: "underline" }}>
                Speil Solutions
              </h4> */}
              <Link to={`/edit/${spiel._id}`}>
                <i className="bi bi-pencil" style={{ fontSize: "1.5em" }}></i>
              </Link>
            </div>
          </div>
          <div
            className="container mt-5"
            style={{ display: "flex", height: "80vh", gap: "1em" }}
          >
            <div
              className="col-8 text-center"
              style={{ display: "flex", flexDirection: "column", gap: "1em" }}
            >
              <div style={titleStyle}>
                <h4>{spiel.name}</h4>
              </div>
              <div style={snippetStyle}>
                <p>{spiel.snippet}</p>
              </div>

              <div
                className="col-12 mt-4"
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                  padding: "0em",
                }}
              >
                <div
                  style={{
                    overflowX: "scroll",
                    display: "flex",
                  }}
                >
                  {spiel.pageArr.map((page, i) => {
                    return (
                      <div
                        key={i}
                        className="my-auto mx-auto"
                        style={{
                          minWidth: "100px",
                          maxWidth: "15%",
                          textOverflow: "ellipsis",
                          overflowY: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Link
                          style={{
                            textDecoration: "none",
                          }}
                          to={`/view/${page.child_id}`}
                        >
                          {page.child_name.toUpperCase()}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className="col-3 text-center mt-2"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1em",
              }}
            >
              {spiel.modalArr.map((modal, i) => (
                <Modal key={modal.child_id} modals={modal} />
              ))}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default One;
