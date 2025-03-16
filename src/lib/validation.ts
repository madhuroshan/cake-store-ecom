import { z } from 'zod';

export const LoginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(50),
});

// Form state can be either object (with error or message) or undefined
export type FormState =
	| {
			errors?: {
				name?: string[];
				email?: string[];
				password?: string[];
				passwordConfirmation?: string[];
			};
			message?: string;
	  }
	| undefined;
