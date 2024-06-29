import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import SignUp from '../components/auth/Signup';
import SignIn from '../components/auth/Signin';

const Login = () => {
	const [createAccount, setCreateAccount] = useState(false);

	return (
		<>
			<Container fluid className='login-container'>
				<Container>
					<Row className='align-items-center justify-content-center min-vh-100'>
						<Col md={6} className='login-info text-center p-5'>
							<div className='login-info-text'>
								<h1>SHARED WORKSPACE</h1>
								<p>
									Shared workspace is a collaborative platform that enables
									teams to work together on projects, share resources, and
									communicate effectively in a centralized digital environment.
								</p>
							</div>
						</Col>
						<Col md={6} className='login-form p-5 my-3'>
							<div className='text-center mb-4'>
								<h2>SHARED WORKSPACE</h2>
							</div>

							{createAccount ? (
								<SignUp setCreateAccount={setCreateAccount} />
							) : (
								<SignIn setCreateAccount={setCreateAccount} />
							)}
						</Col>
					</Row>
				</Container>
			</Container>
		</>
	);
};

export default Login;
