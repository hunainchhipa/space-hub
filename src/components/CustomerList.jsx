import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './GlobalComponents/SearchBar';
import WrappedButton from './GlobalComponents/WrappedButton';

const CustomerList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState('name');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        
        axios.get('http://localhost:8000/api/customers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleColumnChange = (e) => {
        setSearchColumn(e.target.value);
        setSearchTerm('');
    };

    const filteredData = data.filter((item) => {
        switch (searchColumn) {
            case 'name':
                return `${item.first_name} ${item.last_name}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            case 'email':
                return item.email.toLowerCase().includes(searchTerm.toLowerCase());
            case 'number':
                return item.mobile_number.includes(searchTerm);
            default:
                return true;
        }
    });

    const columns = [
        // { name: 'ID', selector: (row) => row.id, sortable: true },
        {
            name: 'Name',
            selector: (row) => `${row.first_name} ${row.last_name}`,
            sortable: true,
        },
        { name: 'Email', selector: (row) => row.email, sortable: true },
        { name: 'Number', selector: (row) => row.mobile_number, sortable: true },
        { name: 'State', selector: (row) => row.state, sortable: true },
        {
            name: 'Actions',
            cell: (row) => (
                <WrappedButton
                    className='btn btn-danger'
                    onClick={() => handleDelete(row.id)}
                >
                    Delete
                </WrappedButton>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const handleDelete = (id) => {
        const token = localStorage.getItem('access_token');
        axios.delete(`http://localhost:8000/api/customers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setData(data.filter(item => item.id !== id));
        })
        .catch(error => {
            console.error('Error deleting customer:', error);
        });
    };

    const handleRowClicked = (row) => {
        navigate(`/customer/${row.id}`);
    };

    return (
        <div className='container my-5'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h1 className='text-secondary fw-bold mb-0'>Customers!</h1>
                <WrappedButton
                    className='btn btn-outline-secondary'
                    onClick={() => navigate('/')}
                >
                    Back
                </WrappedButton>
            </div>
            <SearchBar
                columns={[
                    { name: 'Name', searchKey: 'name' },
                    { name: 'Email', searchKey: 'email' },
                    { name: 'Number', searchKey: 'number' },
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
                onClick={() => navigate(`/customer/new`)}
            >
                Add Customer
            </WrappedButton>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
                striped
                highlightOnHover
                onRowClicked={handleRowClicked} // Handle row click event
            />
        </div>
    );
};

export default CustomerList;
