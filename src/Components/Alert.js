import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    if (word === 'danger'){
      word = 'Error'
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    props.alert && ( // if props.alert is not null then only show the alert
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
      </div>
    )
  );
}

export default Alert;