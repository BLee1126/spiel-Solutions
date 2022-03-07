import axios from "axios";
import { navigate } from "@reach/router";

const Delete = (props) => {
  const onDelete = (e) =>
    axios
      .delete(`http://localhost:8000/api/spiels/delete/${props.id}`)
      .then(navigate(`/edit/${props.redirect}`))
      .catch((err) => console.log(err));

  return (
    <i
      class="bi bi-trash "
      style={{ fontSize: "1.5em", cursor: "pointer", color: "crimson" }}
      onClick={(e) => onDelete()}
      value="delete"
    ></i>
  );
};
export default Delete;
