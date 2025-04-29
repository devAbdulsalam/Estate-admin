import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import bgImage from '@/assets/register.png';
import icon from '@/assets/logo.png';

const registerSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { toast } = useToast();
	const apiUrl = import.meta.env.VITE_API_URL;

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		try {
			setIsLoading(true);
			await axios.post(`${apiUrl}/auth/register`, values);
			toast({
				title: 'Success',
				description: 'Registration successful. Please login.',
			});
			navigate('/login');
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Registration failed. Please try again.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div
				className="relative hidden h-full flex-col bg-image p-10 text-white lg:flex dark:border-r"
				style={{
					backgroundImage: `url(${bgImage})`,
				}}
			>
				<div className="absolute inset-0" />
				<Link
					to="/"
					className="relative z-20 flex items-center text-lg font-medium text-white"
				>
					<img src={icon} alt="" className="mr-2 h-12 w-12" />
					GHPM
				</Link>
				<div className="flex h-full flex-col justify-end">
					<div className="my-32">
						<h2 className="text-2xl font-bold">Convenient Issue Reporting</h2>
						<p className="text-sm mt-5">
							Report maintenance requests or concerns directly through the app
							and track progress effortlessly.
						</p>
					</div>
				</div>
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Create an account
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your details below to create your account
						</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="John Doe" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="name@example.com"
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
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="••••••" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button className="w-full" type="submit" disabled={isLoading}>
								{isLoading ? 'Creating account...' : 'Create account'}
							</Button>
						</form>
					</Form>

					<div className="text-center">
						<Link
							to="/login"
							className="text-sm text-muted-foreground hover:underline"
						>
							Already have an account? Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
