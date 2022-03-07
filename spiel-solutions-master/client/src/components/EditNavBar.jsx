import axios from "axios";
import React, { useEffect, useState } from "react";
import NavCard from "./NavCard";

const EditNavbar = (props) => {
  const [links, setLinks] = useState(null);

  // console.log(links);
  // const [error,setError]=useState({})
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/spiels/scriptName/${props.spiel.scriptName}`
      )
      .then((res) => setLinks(res.data))
      .catch((err) => console.log(err));
  }, [props.spiel.scriptName, props.spiel.pageArr, props.spiel.modalArr]);
  return (
    <>
      <nav className="nav flex-column">
        Pages:
        {links
          ? links
              .filter((link) => link.element === "Page")
              .map((link, i) => {
                return <NavCard link={link} />;
              })
          : ""}
      </nav>
      <nav className="nav flex-column">
        Modals:
        {links
          ? links
              .filter((link) => link.element === "Modal")
              .map((link, i) => {
                return <NavCard link={link} />;
              })
          : ""}
      </nav>
    </>
  );
};
export default EditNavbar;

// (([{id:1,name:"page 1",element:"Page"},{id:2,name:"page 2",element:"Page"},{id:3,name:"page 3",element:"Page"},{id:4,name:"Modal 1",element:"Modal"},{id:5,name:"Modal 2",element:"Modal"},{id:6,name:"page 4",element:"Page"}]))
