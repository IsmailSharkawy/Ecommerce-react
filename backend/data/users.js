import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com'.toLowerCase(),
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Ismail Sharkawy',
		email: 'Ismail@example.com'.toLowerCase(),
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Bedour Hafez',
		email: 'Bedour@example.com'.toLowerCase(),
		password: bcrypt.hashSync('123456', 10),
	},
]

export default users
