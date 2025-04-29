import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
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
import bgImage from '@/assets/login.png';
import icon from '@/assets/logo.png';
import Loader from '@/components/Loader';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(5, 'Password must be at least 6 characters'),
});

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();
	const { toast } = useToast();
	const apiUrl = import.meta.env.VITE_API_URL;

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			navigate('/dashboard');
			return;
		}
	}, [user, navigate]);
	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		try {
			setIsLoading(true);
			const response = await axios.post(`${apiUrl}/auth/login`, values);
			const { accessToken, refreshToken, user } = response.data;
			console.log(response.data);
			login({ token: accessToken, refreshToken }, user);
			toast({
				title: 'Success',
				description: 'Logged in successfully',
			});
			// navigate('/dashboard');
		} catch (error) {
			console.error(error);
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Invalid credentials',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div
				className="relative hidden h-full flex-col p-10 bg-image text-white lg:flex dark:border-r"
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
				</Link>
				<div className="flex h-full flex-col justify-end">
					<div className="my-32">
						<h2 className="text-2xl font-bold">Stay Connected</h2>
						<p className="text-sm mt-5">
							Easily communicate with neighbors and your HOA board. Get
							real-time updates on community announcements and events
						</p>
					</div>
				</div>
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-4xl font-semibold tracking-tight font-hepta mb-10">
							Login
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
											<div className="relative">
												<Input
													type={showPassword ? 'text' : 'password'}
													placeholder="••••••"
													{...field}
												/>
												<button
													type="button"
													onClick={togglePasswordVisibility}
													className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
												>
													{showPassword ? (
														<EyeOff className="h-4 w-4" />
													) : (
														<Eye className="h-4 w-4" />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button className="w-full" type="submit" disabled={isLoading}>
								{isLoading ? 'Logging in...' : 'Login'}
							</Button>
						</form>
					</Form>

					<div className="flex flex-col space-y-2 text-center">
						<Link
							to="/forgot-password"
							className="text-sm text-muted-foreground hover:underline"
						>
							Forgot your password?
						</Link>
						{/* <p className="text-sm text-muted-foreground">
							Don't have an account? {}
							<Link
								to="/register"
								className="text-sm text-muted-foreground hover:underline cursor-pointer"
							>
								Sign up
							</Link>
						</p> */}
					</div>
				</div>
			</div>
			{isLoading && <Loader />}
		</div>
	);
};

export default Login;
