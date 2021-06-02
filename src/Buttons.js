import React from "react";
import "./Buttons.css";

function Buttons(props) {
  const { id, value } = props.item;

  let classNames = "btns";

  if (["clear", "delete"].includes(id)) {
    classNames += " grey-btn";
  }
  if (id === "equals") classNames += " red-btn";

  return (
    <>
      <button
        type="button"
        className={classNames}
        id={id}
        data-value={value}
        onClick={props.handleClick}
      >
        {value}
      </button>
    </>
  );
}

export default Buttons;
