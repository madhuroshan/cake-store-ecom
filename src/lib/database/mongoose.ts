import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectToMongoDB = async () => {
	try {
		console.log('Connecting to MongoDB... ' + process.env.MONGODB_URI);
		const connection = await mongoose.connect(
			process.env.MONGODB_URI as string
		);

		console.log(`MongoDB connected: ${connection.connection.host}`);
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error: ${error.message}`);
		} else {
			console.error('An unknown error occurred');
		}
	}
};
