import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import customerData from './customerData';
import WrappedButton from './GlobalComponents/WrappedButton';

const CustomerForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		id: '',
		first_name: '',
		last_name: '',
		email: '',
		number: '',
		city: '',
		street: '',
		street2: '',
		state: '',
		zip: '',
		country: '',
	});

	useEffect(() => {
		if (id !== 'new') {
			const customer = customerData.find((c) => c.id === parseInt(id));
			if (customer) setFormData({ ...formData, ...customer });
		}
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (id === 'new') {
			const newCustomer = { ...formData, id: customerData.length + 1 };
			customerData.push(newCustomer);
		} else {
			const customerIndex = customerData.findIndex(
				(c) => c.id === parseInt(id)
			);
			customerData[customerIndex] = formData;
		}
		navigate('/customers');
	};

	return (
		<div className='container my-5'>
			<WrappedButton
				className='btn btn-outline-secondary mb-3'
				onClick={() => navigate('/customers')}
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
				<WrappedButton type='submit' className='btn btn-primary' hotkey='s'>
					Save
				</WrappedButton>
			</form>
		</div>
	);
};

export default CustomerForm;
