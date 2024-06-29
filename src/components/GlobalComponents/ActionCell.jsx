import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const ActionCell = ({ onEdit, onDelete }) => {
  return (
    <>
      <FontAwesomeIcon
        icon={faPen}
        className="edit-icon fs-6 me-3 text-secondary"
        onClick={onEdit}
      />
      <FontAwesomeIcon
        icon={faTrash}
        className="edit-icon fs-6 text-danger"
        onClick={onDelete}
      />
    </>
  );
};

export default ActionCell;
