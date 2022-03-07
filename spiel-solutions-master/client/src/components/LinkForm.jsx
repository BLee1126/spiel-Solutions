import axios from "axios";
import React, { useEffect, useState } from "react";

const LinkForm = (props) => {
  const { add, setAdd } = props;
  const [options, setOptions] = useState([]);
  const [chosen, setChosen] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/spiels/scriptName/${props.spiel.scriptName}`
      )
      .then((res) => {
        if (props.element === "Page") {
          let pagesArr = res.data;
          for (let i = 0; i < pagesArr.length; i++) {
            for (let k = 0; k < props.spiel.pageArr.length; k++) {
              if (props.spiel.pageArr[k].child_id === pagesArr[i]._id) {
                pagesArr.splice(i, 1);
              }
            }
          }
          setOptions(
            pagesArr
              .filter((element) => element.element === "Page")
              .filter((element) => props.spiel._id !== element._id)
          );
        } else if (props.element === "Modal") {
          let modalsArr = res.data;
          for (let i = 0; i < modalsArr.length; i++) {
            for (let k = 0; k < props.spiel.modalArr.length; k++) {
              if (props.spiel.modalArr[k].child_id === modalsArr[i]._id) {
                modalsArr.splice(i, 1);
              }
            }
          }
          setOptions(
            modalsArr
              .filter((element) => element.element === "Modal")
              .filter((element) => props.spiel._id !== element._id)
          );
        }
      })
      .catch((err) => console.log(err));
    setLoaded(true);
  }, [props.spiel.scriptName, refresh, add, options]);

  const handleAdd = (e) => {
    if (chosen.name.length < 1 || chosen.id.length < 1) {
      return;
    }
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/spiels/update/array/${props.spiel._id}`, {
        child_name: chosen.name,
        child_id: chosen.id,
        element: props.element,
      })
      .then((res) => {
        setRefresh(!refresh);
        setAdd(!add);
      })
      .catch((err) => console.log(err));
  };
  const onselectHandler = (e) => {
    setChosen({
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    });
  };
  return (
    <div>
      {!props.isHidden ? (
        <div>
          {options && loaded ? (
            <form onSubmit={handleAdd}>
              <select onChange={onselectHandler} className="w-100">
                <option />
                {options.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>{" "}
              <div className="w-100">
                <input
                  type="submit"
                  value="Link"
                  className="btn btn-primary btn-sm w-100 my-1"
                />
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default LinkForm;
