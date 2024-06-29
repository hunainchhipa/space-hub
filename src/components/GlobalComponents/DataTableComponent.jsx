import React, { useState, useEffect } from 'react';
import useSearch from '../hooks/useSearch';
import SearchBar from './SearchBar';
import DataTableWrapper from './DataTableWrapper';
import FormView from './FormView';
import EditableCell from './EditableCell';
import ActionCell from './ActionCell';
import WrappedButton from './WrappedButton';
import './DataTableComponent.css';

const DataTableComponent = ({ data, handleDelete, actions }) => {
	const [dataState, setDataState] = useState(data);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setDataState(data);
	}, [data]);

	const handleCellSave = (id, field, value) => {
		const updatedData = dataState.map((item) => {
			if (item.id === id) {
				return { ...item, [field]: value };
			}
			return item;
		});
		setDataState(updatedData);
	};

	const keys = Object.keys(data[0]);
	const generatedColumns = keys.map((key) => ({
		name: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
		selector: (row) => row[key],
		searchKey: key,
		sortable: true,
		cell: (row) => (
			<EditableCell
				value={row[key]}
				onSave={(newValue) => handleCellSave(row.id, key, newValue)}
			/>
		),
	}));

	const {
		filteredData,
		searchTerm,
		searchColumn,
		suggestions,
		setSearchTerm,
		setSearchColumn,
		clearSuggestions,
		setIsSuggestionClicked,
	} = useSearch(dataState, generatedColumns);

	const onSearchChange = (e) => {
		setIsSuggestionClicked(false);
		setSearchTerm(e.target.value);
	};

	const onSuggestionClick = (suggestion) => {
		setIsSuggestionClicked(true);
		clearSuggestions();
		setSearchTerm(suggestion[searchColumn]);
	};

	const onColumnChange = (e) => {
		setSearchColumn(e.target.value);
		setSearchTerm('');
	};

	const handleRowClick = (record) => {
		setSelectedRecord(record);
		setIsFormOpen(true);
	};

	const handleNewClick = () => {
		setSelectedRecord({});
		setIsFormOpen(true);
	};

	const handleSave = (formData) => {
		let updatedData;
		if (selectedRecord && Object.keys(selectedRecord).length === 0) {
			updatedData = [...dataState, formData];
		} else {
			updatedData = dataState.map((item) =>
				item.id === formData.id ? formData : item
			);
		}
		setDataState(updatedData);
		setIsFormOpen(false);
		setCurrentPage(Math.ceil(updatedData.length / 5));
	};

	const handleCancel = () => {
		setIsFormOpen(false);
	};

	if (actions) {
		generatedColumns.push({
			name: 'Action',
			searchKey: 'action',
			cell: (row) => (
				<ActionCell
					onEdit={() => handleRowClick(row)}
					onDelete={() => handleDelete(row.id)}
				/>
			),
			invisible: true,
		});
	}

	return (
		<>
			{isFormOpen ? (
				<FormView
					columns={generatedColumns}
					record={selectedRecord}
					onSave={handleSave}
					onCancel={handleCancel}
				/>
			) : (
				<>
					<SearchBar
						columns={generatedColumns}
						onSearchChange={onSearchChange}
						onColumnChange={onColumnChange}
						searchTerm={searchTerm}
						searchColumn={searchColumn}
						suggestions={suggestions}
						onSuggestionClick={onSuggestionClick}
					/>
					<WrappedButton
						className='btn btn-primary mb-3'
						onClick={handleNewClick}
						hotkey='n'>
						New Record
					</WrappedButton>
					<DataTableWrapper
						columns={generatedColumns}
						data={filteredData}
						onRowClicked={handleRowClick}
						currentPage={currentPage}
						onPageChange={setCurrentPage}
					/>
				</>
			)}
		</>
	);
};

export default DataTableComponent;
