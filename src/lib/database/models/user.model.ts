import mongoose from 'mongoose';

export interface User {
	name: string;
	email: string;
	password: string;
}

export const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name'],
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
	}
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
