import axios from "axios";
import React from "react";
import { Link } from "@reach/router";

const LinkCard = (props) => {
  const { add, setAdd } = props;
  const handleDelete = (e) => {
    axios
      .put(
        `http://localhost:8000/api/spiels/delete/array/${props.parent._id}`,
        {
          child_id: props.link.child_id,
          element: props.element,
        }
      )
      .then((res) => setAdd(!add))

      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-between align-items-center m-2">
      <Link to={`/edit/${props.link.child_id}`} className="NavCardLink">
        {props.link.child_name}
      </Link>
      <button
        className="btn btn-sm btn-warning"
        onClick={(e) => handleDelete()}
      >
        Unlink
      </button>
    </div>
  );
};
export default LinkCard;
