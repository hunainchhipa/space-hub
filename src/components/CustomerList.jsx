import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import customerData from './customerData';
import SearchBar from './GlobalComponents/SearchBar';
import WrappedButton from './GlobalComponents/WrappedButton';

const CustomerList = () => {
	const navigate = useNavigate();
	const [data, setData] = useState(customerData);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchColumn, setSearchColumn] = useState('name');

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
				return item.number.includes(searchTerm);
			default:
				return true;
		}
	});

	const columns = [
		{ name: 'ID', selector: (row) => row.id, sortable: true },
		{
			name: 'Name',
			selector: (row) => `${row.first_name} ${row.last_name}`,
			sortable: true,
		},
		{ name: 'Email', selector: (row) => row.email, sortable: true },
		{ name: 'Number', selector: (row) => row.number, sortable: true },
		{ name: 'State', selector: (row) => row.state, sortable: true },
	];

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
					hotkey='b'>
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
				hotkey='a'>
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
