import React, { useEffect, useState } from "react";
import DataTableComponent from "./GlobalComponents/DataTableComponent";
import dummyData from "./DB";
import { useNavigate } from "react-router-dom";
import WrappedButton from "./GlobalComponents/WrappedButton";

const TableDemo = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(dummyData);

  const handleDelete = (id) => {
    // TODO: when connect to database need to remove from it
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="text-secondary fw-bold mb-0">Data Table!</h1>
        <WrappedButton
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
            hotkey="b"
          >
            Back
          </WrappedButton>
      </div>
      <DataTableComponent
        data={data}
        handleDelete={handleDelete}
        actions
      />
    </div>
  );
};

export default TableDemo;
