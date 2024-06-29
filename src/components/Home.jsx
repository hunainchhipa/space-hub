import React from 'react';
import { useNavigate } from 'react-router-dom';
import WrappedButton from './GlobalComponents/WrappedButton';

const Home = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className='d-flex justify-content-center align-items-center gap-2 vh-100'>
				{/* <WrappedButton
					className='btn btn-outline-secondary'
					onClick={() => navigate('/data-table')}
					hotkey={'d'}>
					Data Table
				</WrappedButton> */}
				<WrappedButton
					className='btn btn-outline-secondary'
					onClick={() => navigate('/customers')}
					hotkey={'p'}>
					Customer
				</WrappedButton>
				<WrappedButton
					className='btn btn-outline-secondary'
					onClick={() => navigate('/bookings')}
					hotkey={'b'}>
					Bookings
				</WrappedButton>
				<WrappedButton
					className='btn btn-outline-secondary'
					onClick={() => navigate('/workspaces')}
					hotkey={'p'}>
					WorkSpace
				</WrappedButton>
				<WrappedButton
					className='btn btn-outline-secondary'
					onClick={() => navigate('/charts')}
					hotkey={'c'}>
					Charts
				</WrappedButton>
			</div>
		</>
	);
};

export default Home;
