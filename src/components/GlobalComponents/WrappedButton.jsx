import React from 'react';
import withHotkey from '../contexts/withHotkey';

const Button = ({ className, onClick, children }) => (
	<button className={className} onClick={onClick}>
		{children}
	</button>
);

const WrappedButton = ({ hotkey, type = 'button', ...props }) => {
	const EnhancedButton = withHotkey(Button, hotkey);
	return <EnhancedButton {...props} />;
};

export default WrappedButton;
