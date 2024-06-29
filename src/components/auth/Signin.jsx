import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setCreateAccount }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				'http://192.168.1.2:8000/api/login',
				data
			);
			console.log('Login successful:', response.data);

			// Save the access token to localStorage
			localStorage.setItem('access_token', response.data.access_token);

			// Redirect to the home page
			navigate('/');
		} catch (error) {
			console.error(
				'Login failed:',
				error.response ? error.response.data : error.message
			);
			// Handle login failure (e.g., display error message)
		}
	};

	return (
		<div>
			<Form noValidate onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className='mb-2' controlId='formBasicEmail'>
					<Form.Label>Username or Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='johnsmith007'
						isInvalid={!!errors.email}
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: 'Invalid email address',
							},
						})}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.email && errors.email.message}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className='mb-2' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='**********'
						isInvalid={!!errors.password}
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 8,
								message: 'Password must be at least 8 characters long',
							},
						})}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.password && errors.password.message}
					</Form.Control.Feedback>
				</Form.Group>
				<div className='d-flex justify-content-between align-items-center mt-3'>
					<span className='text-muted cursor-pointer'>Forgot password?</span>
					<Button variant='primary' type='submit'>
						Sign in
					</Button>
				</div>
				<div className='text-center mt-3'>
					<span
						className='text-muted cursor-pointer'
						onClick={() => setCreateAccount(true)}>
						Are you new? Create an Account
					</span>
				</div>
			</Form>
		</div>
	);
};

export default SignIn;
