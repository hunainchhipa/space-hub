import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WrappedButton from './GlobalComponents/WrappedButton';

const BookingForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		customerName: '',
		workspaceName: '',
		startTime: '',
		endTime: '',
		bookingDate: '',
		amount: '',
		paymentState: '',
		conferenceRoom: '',
		numberOfPersons: '',
	});
	const token = localStorage.getItem('access_token');

	useEffect(() => {
		if (id !== 'new') {
			const fetchBooking = async () => {
				try {
					const response = await axios.get(
						`http://192.168.1.2:8000/api/bookings/${id}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setFormData(response.data.data);
				} catch (error) {
					console.error('Error fetching booking data:', error);
				}
			};

			fetchBooking();
		}
	}, [id, token]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (id === 'new') {
				await axios.post('http://192.168.1.2:8000/api/bookings', formData, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			} else {
				await axios.put(
					`http://192.168.1.2:8000/api/bookings/${id}`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
			}
			navigate('/bookings');
		} catch (error) {
			console.error('Error saving booking data:', error);
		}
	};

	return (
		<div className='container my-5'>
			<WrappedButton
				className='btn btn-outline-secondary mb-3'
				onClick={() => navigate('/bookings')}
				hotkey='b'>
				Back
			</WrappedButton>
			<form onSubmit={handleSubmit}>
				{Object.keys(formData).map((field) => (
					<div className='mb-3' key={field}>
						<label className='form-label'>
							{field.replace(/([A-Z])/g, ' $1').toUpperCase()}
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

export default BookingForm;
