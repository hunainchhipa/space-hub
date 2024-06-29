import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SearchBar from "./GlobalComponents/SearchBar";
import WrappedButton from "./GlobalComponents/WrappedButton";

const BookingList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("customerName");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.2:8000/api/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        debugger;
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.1.2:8000/api/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleColumnChange = (e) => {
    setSearchColumn(e.target.value);
    setSearchTerm("");
  };

  const filteredData = data.filter((item) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      (item.workspace?.name &&
        item.workspace.name.toLowerCase().includes(searchValue)) ||
      (item.conference?.room_name &&
        item.conference.room_name.toLowerCase().includes(searchValue))
    );
  });

  const columns = [
    {
      name: "Customer ID",
      selector: (row) => row.customer_id || "",
      sortable: true,
    },
    {
      name: "Workspace Name",
      selector: (row) => row.workspace?.name || "",
      sortable: true,
    },
    {
      name: "Start Time",
      selector: (row) => row.start_time || "",
      sortable: true,
    },
    { name: "End Time", selector: (row) => row.end_time || "", sortable: true },
    {
      name: "Booking Date",
      selector: (row) => row.booking_date || "",
      sortable: true,
    },
    { name: "Amount", selector: (row) => row.amount || "", sortable: true },
    {
      name: "Payment State",
      selector: (row) => row.payment || "",
      sortable: true,
    },
    {
      name: "Conference Room",
      selector: (row) => row.conference?.room_name || "",
      sortable: true,
    },
    {
      name: "Number of Chairs",
      selector: (row) => row.no_of_chair || "",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleRowClicked = (row) => {
    navigate(`/booking/${row.id}`);
  };

  return (
    <div className="container body-otr mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="text-secondary fw-bold mb-0">Bookings</h1>
        <WrappedButton
          className="btn btn-outline-secondary"
          onClick={() => navigate("/")}
          hotkey="b"
        >
          Back
        </WrappedButton>
      </div>
      <SearchBar
        columns={[
          { name: "Workspace Name", searchKey: "workspace.name" },
          { name: "Conference Room", searchKey: "conference.room_name" },
        ]}
        onSearchChange={handleSearchChange}
        onColumnChange={handleColumnChange}
        searchTerm={searchTerm}
        searchColumn={searchColumn}
        suggestions={[]}
        onSuggestionClick={(suggestion) => {}}
      />
      <WrappedButton
        className="btn btn-primary"
        onClick={() => navigate(`/booking/new`)}
        hotkey="a"
      >
        Add Booking
      </WrappedButton>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
        striped
        highlightOnHover
        onRowClicked={handleRowClicked}
      />
    </div>
  );
};

export default BookingList;
