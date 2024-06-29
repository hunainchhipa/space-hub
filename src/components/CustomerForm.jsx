import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WrappedButton from './GlobalComponents/WrappedButton';

const CustomerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        city: '',
        street: '',
        street2: '',
        state: '',
        postal_code: '',
        country: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id !== 'new') {
            const token = localStorage.getItem('access_token');
            axios.get(`http://localhost:8000/api/customers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    const customer = response.data.data;
                    setFormData(customer);
                })
                .catch(error => {
                    console.error('Error fetching customer:', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');

        if (id === 'new') {
            axios.post('http://localhost:8000/api/customers', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    navigate('/customers');
                })
                .catch(error => {
                    setError(error.response.data.message || 'An error occurred while creating customer.');
                });
        } else {
            axios.put(`http://localhost:8000/api/customers/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    navigate('/customers');
                })
                .catch(error => {
                    setError(error.response.data.message || 'An error occurred while updating customer.');
                });
        }
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
                    field !== 'id' && (
                        <div className='mb-3' key={field}>
                            <label className='form-label'>
                                {field.replace(/_/g, ' ').toUpperCase()}
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                name={field}
                                value={formData[field] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    )
                ))}
                <WrappedButton type='submit' className='btn btn-primary' hotkey='s'>
                    Save
                </WrappedButton>
            </form>
        </div>
    );
};

export default CustomerForm;
