import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import workspaceData from './workspaceData';

import SearchBar from './GlobalComponents/SearchBar';
import WrappedButton from './GlobalComponents/WrappedButton';

const WorkspaceList = () => {
	const navigate = useNavigate();
	const [data, setData] = useState(workspaceData);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchColumn, setSearchColumn] = useState('name');

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleColumnChange = (e) => {
		setSearchColumn(e.target.value);
		setSearchTerm('');
	};

	const filteredData = data.filter(
		(item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.location.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const columns = [
		{ name: 'ID', selector: (row) => row.id, sortable: true },
		{ name: 'Name', selector: (row) => row.name, sortable: true },
		{ name: 'Location', selector: (row) => row.location, sortable: true },
		{ name: 'City', selector: (row) => row.city, sortable: true },
		{ name: 'State', selector: (row) => row.state, sortable: true },
		{ name: 'Zip Code', selector: (row) => row.zip, sortable: true },
		{ name: 'Country', selector: (row) => row.country, sortable: true },
	];

	const handleRowClicked = (row) => {
		navigate(`/workspace/${row.id}`);
	};

	return (
		<div className='container my-5'>
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<h1 className='text-secondary fw-bold mb-0'>Workspaces</h1>
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
					{ name: 'Location', searchKey: 'location' },
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
				onClick={() => navigate(`/workspace/new`)}
				hotkey='a'>
				Add Workspace
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

export default WorkspaceList;
