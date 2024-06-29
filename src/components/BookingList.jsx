import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import bookingData from './bookingData'; // Replace with actual data source

import SearchBar from './GlobalComponents/SearchBar';
import WrappedButton from './GlobalComponents/WrappedButton';

const BookingList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(bookingData);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState('customerName');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleColumnChange = (e) => {
        setSearchColumn(e.target.value);
        setSearchTerm('');
    };

    const filteredData = data.filter(
        (item) =>
            item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.workspaceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { name: 'Customer Name', selector: (row) => row.customerName, sortable: true },
        { name: 'Workspace Name', selector: (row) => row.workspaceName, sortable: true },
        { name: 'Start Time', selector: (row) => row.startTime, sortable: true },
        { name: 'End Time', selector: (row) => row.endTime, sortable: true },
        { name: 'Booking Date', selector: (row) => row.bookingDate, sortable: true },
        { name: 'Amount', selector: (row) => row.amount, sortable: true },
        { name: 'Payment State', selector: (row) => row.paymentState, sortable: true },
        { name: 'Conference Room', selector: (row) => row.conferenceRoom, sortable: true },
        { name: 'Number of Persons', selector: (row) => row.numberOfPersons, sortable: true },
    ];

    const handleRowClicked = (row) => {
        navigate(`/booking/${row.id}`);
    };

    return (
        <div className='container my-5'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h1 className='text-secondary fw-bold mb-0'>Bookings</h1>
                <WrappedButton
                    className='btn btn-outline-secondary'
                    onClick={() => navigate('/')}
                    hotkey='b'>
                    Back
                </WrappedButton>
            </div>
            <SearchBar
                columns={[
                    { name: 'Customer Name', searchKey: 'customerName' },
                    { name: 'Workspace Name', searchKey: 'workspaceName' },
                ]}
                onSearchChange={handleSearchChange}
                onColumnChange={handleColumnChange}
                searchTerm={searchTerm}
                searchColumn={searchColumn}
                suggestions={[]}
                onSuggestionClick={(suggestion) => {}}
            />
            <WrappedButton
                className='btn btn-primary'
                onClick={() => navigate(`/booking/new`)}
                hotkey='a'>
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
