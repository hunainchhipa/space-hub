import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WrappedButton from './GlobalComponents/WrappedButton';

const BookingForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		customer: '',
		workspace: '',
		from: '',
		to: '',
		date: '',
		amount: '',
		payment: '',
		room_number: '',
		number_of_people: '',
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
					const bookingData = response.data.data;
					setFormData({
						customer: bookingData.customer_name,
						workspace: bookingData.workspace.name,
						from: bookingData.start_time,
						to: bookingData.end_time,
						date: bookingData.booking_date,
						amount: bookingData.amount,
						payment: bookingData.payment,
						room_number: bookingData.conference_id,
						number_of_people: bookingData.no_of_chair,
					});
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
			const endpoint =
				id === 'new'
					? 'http://192.168.1.2:8000/api/bookings'
					: `http://192.168.1.2:8000/api/bookings/${id}`;
			const method = id === 'new' ? 'post' : 'put';
			await axios[method](endpoint, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
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
				<div className='mb-3'>
					<label className='form-label'>Customer</label>
					<input
						type='text'
						className='form-control'
						name='customer'
						value={formData.customer}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Workspace</label>
					<input
						type='text'
						className='form-control'
						name='workspace'
						value={formData.workspace}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>From</label>
					<input
						type='text'
						className='form-control'
						name='from'
						value={formData.from}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>To</label>
					<input
						type='text'
						className='form-control'
						name='to'
						value={formData.to}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Date</label>
					<input
						type='text'
						className='form-control'
						name='date'
						value={formData.date}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Amount</label>
					<input
						type='text'
						className='form-control'
						name='amount'
						value={formData.amount}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Payment</label>
					<input
						type='text'
						className='form-control'
						name='payment'
						value={formData.payment}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Conference Room</label>
					<input
						type='text'
						className='form-control'
						name='room_number'
						value={formData.room_number}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Number of People</label>
					<input
						type='text'
						className='form-control'
						name='number_of_people'
						value={formData.number_of_people}
						onChange={handleChange}
					/>
				</div>
				<button type='submit' className='btn btn-primary'>
					Save
				</button>
			</form>
		</div>
	);
};

export default BookingForm;