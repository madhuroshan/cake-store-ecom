'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { LoginFormSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { login } from '@/lib/actions/auth.action';
import { useState } from 'react';

const LoginPage = () => {
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
		const response = await login(values.email, values.password);
		console.log('Response on submit ' + response);
		if (response?.message) {
			setError(response.message);
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold text-center text-gray-800">
					Welcome to Delicakes
				</h2>
				<p className="text-center text-gray-600">Sign in to your account</p>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email*</FormLabel>
									<FormControl>
										<Input
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
											placeholder="Email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password*</FormLabel>
									<FormControl>
										<Input
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
											placeholder="Password"
											type="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{error && <p className="text-red-500 text-sm">{error}</p>}

						<Button
							type="submit"
							className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
							Login
						</Button>
						<p className="text-center text-gray-600">
							Don't have an account?{' '}
							<Link href="/signup" className="text-indigo-600 hover:underline">
								Sign Up
							</Link>
						</p>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default LoginPage;
