import axios from "axios";
import React from "react";

const Card = (props) => {
  const { spiel } = props;

  return (
    <div className="text-center mt-3">

      <h4>{spiel.scriptName}</h4>
    </div>
  );
};
export default Card;
