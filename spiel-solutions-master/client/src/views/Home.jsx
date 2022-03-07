import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { navigate } from "@reach/router";
import "./Home.css";
import ScriptInputModal from "../components/ScriptInputModal";

const Home = (props) => {
  const [spiels, setSpiels] = useState(null);
  const [add, setAdd] = useState(false);

  const handleScriptDelete = (spiel) => {
    console.log(spiel);
    axios
      .delete(
        `http://localhost:8000/api/spiels/script/delete/${spiel.scriptName}`
      )
      .then((res) => setAdd(!add))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/spiels/find/heads")
      .then((res) => setSpiels(res.data))
      .catch((err) => console.log(err));
  }, [add]);

  const handleCardLink = (spielID) => {
    navigate(`/view/${spielID}`);
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <>
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
            style={{ fontSize: "30px", cursor: "pointer", color: "ghostwhite" }}
            onClick={navigateHome}
          ></i>
          {/* <h4 style={{ color: "indianred", textDecoration: "underline" }}>
            Speil Solutions
          </h4> */}
          <ScriptInputModal add={add} setAdd={setAdd} />
        </div>
        {/* <div className="col-3"></div> */}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: ".2em",
          // height: "100vh",
          paddingTop: "3em",
          alignContent: "flex-start",
        }}
      >
        {spiels
          ? spiels.map((spiel, i) => {
              return (
                <>
                  <div className="scriptCard">
                    <i
                      class="bi bi-trash "
                      style={{
                        fontSize: "30px",
                        cursor: "pointer",
                        color: "#DC3545",
                      }}
                      onClick={(e) => handleScriptDelete(spiel)}
                    ></i>
                    <div
                      style={{
                        border: "1px solid lightgrey",
                        borderRadius: "35px 35px 35px 35px",
                        // height: "30%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        width: "100%",
                        backgroundColor: "aliceblue",
                      }}
                      className="script-card"
                      onClick={() => handleCardLink(spiel._id)}
                    >
                      <Card add={add} setAdd={setAdd} key={i} spiel={spiel} />
                    </div>
                  </div>
                </>
              );
            })
          : ""}
      </div>
    </>
  );
};
export default Home;