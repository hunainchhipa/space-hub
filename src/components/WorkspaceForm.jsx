import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import workspaceData from './workspaceData';
import WrappedButton from './GlobalComponents/WrappedButton';

const WorkspaceForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		id: '',
		name: '',
		location: '',
		city: '',
		street: '',
		street2: '',
		state: '',
		zip: '',
		country: '',
		opening_time: '',
		closing_time: '',
		facilities: [],
		meeting_rooms: [],
	});

	useEffect(() => {
		if (id !== 'new') {
			const workspace = workspaceData.find((w) => w.id === parseInt(id));
			if (workspace) setFormData({ ...formData, ...workspace });
		}
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (id === 'new') {
			const newWorkspace = { ...formData, id: workspaceData.length + 1 };
			workspaceData.push(newWorkspace);
		} else {
			const workspaceIndex = workspaceData.findIndex(
				(w) => w.id === parseInt(id)
			);
			workspaceData[workspaceIndex] = formData;
		}
		navigate('/workspaces');
	};

	return (
		<div className='container my-5'>
			<WrappedButton
				className='btn btn-outline-secondary mb-3'
				onClick={() => navigate('/workspaces')}
				hotkey='b'>
				Back
			</WrappedButton>
			<form onSubmit={handleSubmit}>
				{Object.keys(formData).map((field) => (
					<div className='mb-3' key={field}>
						<label className='form-label'>
							{field.replace(/_/g, ' ').toUpperCase()}
						</label>
						<input
							type='text'
							className='form-control'
							name={field}
							value={formData[field]}
							onChange={handleChange}
						/>
					</div>
				))}
				<button type='submit' className='btn btn-primary'>
					Save
				</button>
			</form>
		</div>
	);
};

export default WorkspaceForm;
