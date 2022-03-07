import React from "react";
import LinkCard from "./LinkCard";
import LinkForm from "./LinkForm";
import InputPage from "./InputPage";
import InputModal from "./InputModal";

const LinkedFrom = (props) => {
  const { add, setAdd } = props;

  return (
    <div className="linked-from">
      <div className="LinkForm">
        <div className="d-flex align-items-center justify-content-between">
          <u>Pages</u>
          <InputPage
            add={add}
            setAdd={setAdd}
            element={"Page"}
            spiel={props.spiel}
          />
        </div>
        {props.spiel.pageArr.map((link, i) => {
          return (
            <LinkCard
              key={link._id}
              add={add}
              setAdd={setAdd}
              element={"Page"}
              parent={props.spiel}
              link={link}
            />
          );
        })}

        <LinkForm
          add={add}
          setAdd={setAdd}
          className="LinkForm"
          element={"Page"}
          spiel={props.spiel}
        />

        <br />
        <br />
        {props.spiel.element === "Modal" ? (
          ""
        ) : (
          <div className="LinkForm">
            <div className="d-flex align-items-center justify-content-between">
              <u>Modals</u>
              <InputModal
                element={"Modal"}
                spiel={props.spiel}
                add={add}
                setAdd={setAdd}
              />
            </div>
            {props.spiel.modalArr.map((link, i) => {
              return (
                <LinkCard
                  key={link._id}
                  add={add}
                  setAdd={setAdd}
                  element={"Modal"}
                  parent={props.spiel}
                  link={link}
                />
              );
            })}

            <LinkForm
              add={add}
              setAdd={setAdd}
              className="LinkForm"
              element={"Modal"}
              spiel={props.spiel}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default LinkedFrom;
