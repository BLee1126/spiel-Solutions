import { Link } from "@reach/router";
import React, { useEffect, useState } from "react";
const NavCard = (props) => {
  // const [color, setColor] = useState("");
  // useEffect(() => {
  //   if (props.link.element === "Modal") {
  //     setColor("blue");
  //   }
  //   if (props.link.element === "Page") {
  //     setColor("green");
  //   }
  // }, [props.link.element]);
  return (
    <div className="NavCard">
      <Link to={`/edit/${props.link._id}`} className="NavCardLink">
        {props.link.name}
      </Link>
    </div>
  );
};
export default NavCard;
// onClick={() => window.location.reload()}
