import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookingData from './bookingData'; // Replace with actual data source
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

    useEffect(() => {
        if (id !== 'new') {
            const booking = bookingData.find((b) => b.id === parseInt(id));
            if (booking) setFormData({ ...formData, ...booking });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id === 'new') {
            const newBooking = { ...formData, id: bookingData.length + 1 };
            bookingData.push(newBooking);
        } else {
            const bookingIndex = bookingData.findIndex(
                (b) => b.id === parseInt(id)
            );
            bookingData[bookingIndex] = formData;
        }
        navigate('/bookings');
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

export default BookingForm;
