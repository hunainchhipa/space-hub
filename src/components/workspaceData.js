const workspaceData = [
	{
		id: 1,
		name: 'Workspace A',
		location: 'Downtown',
		city: 'Cityville',
		street: 'Main Street',
		street2: 'Building 1',
		state: 'Stateville',
		zip: '12345',
		country: 'Countryland',
		opening_time: '09:00 AM',
		closing_time: '06:00 PM',
		facilities: ['Wi-Fi', 'Projector'],
		meeting_rooms: [
			{ id: 1, name: 'Meeting Room 1', capacity: 10 },
			{ id: 2, name: 'Meeting Room 2', capacity: 8 },
		],
	},
	{
		id: 2,
		name: 'Workspace B',
		location: 'Uptown',
		city: 'Townsville',
		street: 'Park Avenue',
		street2: 'Suite 200',
		state: 'Stateland',
		zip: '54321',
		country: 'Countryville',
		opening_time: '08:30 AM',
		closing_time: '07:00 PM',
		facilities: ['Coffee Machine', 'Printer'],
		meeting_rooms: [
			{ id: 3, name: 'Boardroom', capacity: 15 },
			{ id: 4, name: 'Conference Room', capacity: 20 },
		],
	},
];

export default workspaceData;
