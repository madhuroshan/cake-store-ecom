'use server';

import User from '../database/models/user.model';
import bcryptjs from 'bcryptjs';
import { checkCurrentSession, createSession, deleteSession } from '../session';
import { connectToMongoDB } from '../database/mongoose';
import { redirect } from 'next/navigation';
import console from 'console';
import { Schema } from 'mongoose';

// SIGNUP

// LOGIN
export const login = async (email: string, password: string) => {
	let isLoginSuccessful = false;
	try {
		await connectToMongoDB();
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			const isPasswordValid = await bcryptjs.compare(
				password,
				existingUser.password
			);
			if (isPasswordValid) {
				isLoginSuccessful = true;
				await createSession(existingUser._id);
			} else {
				return {
					message: 'Invalid Password, Try Again',
				};
			}
		} else {
			return { message: 'No User found, Please Sign Up First' };
		}
	} catch (error) {
		console.log(error);
		isLoginSuccessful = false;
	}
	if (isLoginSuccessful) redirect('/');
};

// LOGOUT
export const logout = async () => {
	try {
		await deleteSession();
	} catch (error) {
		console.log('could not delete session', error);
	}
	redirect('/login');
};
