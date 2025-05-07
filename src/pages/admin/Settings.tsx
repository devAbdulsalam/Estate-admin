import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from '@/components/Loader';
const profileSchema = z.object({
	email: z.string().email('Invalid email address'),
	name: z.string().min(2, 'Name must be at least 2 characters'),
});

import { avatarImage } from '@/data';

const Settings = () => {
	const { tokens, user } = useAuth();
	const [currentTab, setCurrentTab] = useState('Profile');
	const [isLoading, setIsLoading] = useState(false);
	const tabs = ['Profile', 'Users Management', 'Notification', 'Report'];
	const apiUrl = import.meta.env.VITE_API_URL;
	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			email: '',
			name: '',
		},
	});
	const onSubmit = async (values: z.infer<typeof profileSchema>) => {
		try {
			setIsLoading(true);
			const response = await axios.post(`${apiUrl}/admin/profile`, values, {
				headers: {
					Authorization: `Bearer ${tokens?.token}`,
				},
			});
			console.log(response.data);
			// login(tokens, user);
			toast.success('Profile updated successfully');
		} catch (error) {
			console.error(error);
			toast.error('Invalid credentials');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<main className="min-h-screen bg-white">
			<div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex justify-center my-5 p-2">
					{tabs.map((tab) => (
						<div
							onClick={() => setCurrentTab(tab)}
							className={`p-2 cursor-pointer border-b-2 ${
								tab === currentTab
									? 'text-primary border-b-primary '
									: 'text-gray-300 border-b-gray-300'
							}`}
						>
							{tab}
						</div>
					))}
				</div>
				{currentTab === 'Profile' && (
					<Card className="py-0">
						<CardHeader className="flex flex-row items-center justify-between pb-5">
							<CardTitle className="text-sm font-bold ">
								Profile Information
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex justify-start items-center gap-4 mb-5">
								<div className="flex justify-start items-center gap-3">
									<Avatar className="w-12 h-12">
										<AvatarImage src={user?.profileImage?.url || avatarImage} />
										<AvatarFallback>{user?.name[0]}</AvatarFallback>
									</Avatar>
								</div>
								<div>
									<Button size="sm" variant="outline" onClick={() => {}}>
										Uplaod photo
									</Button>
								</div>
							</div>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4"
								>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="appfur@gmail.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</form>
							</Form>
						</CardContent>
					</Card>
				)}
				{currentTab === 'Users Management' && (
					<Card className="py-0">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-bold text-gray-500">
								Users Management
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex justify-start items-center gap-4">
								<div className="flex justify-start items-center gap-3">
									<Avatar className="w-14 h-14">
										<AvatarImage src={user?.profileImage?.url} />
										<AvatarFallback>{user?.name[0]}</AvatarFallback>
									</Avatar>
								</div>
								<div>
									<Button size="sm" variant="default" onClick={() => {}}>
										Uplaod photo
									</Button>
								</div>
							</div>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4"
								>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="appfur@gmail.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</form>
							</Form>
						</CardContent>
					</Card>
				)}
				{currentTab === 'Notification' && (
					<Card className="py-0">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-bold text-gray-500">
								Notification
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex justify-start items-center gap-4">
								<div className="flex justify-start items-center gap-3">
									<Avatar className="w-14 h-14">
										<AvatarImage src={user?.profileImage?.url} />
										<AvatarFallback>{user?.name[0]}</AvatarFallback>
									</Avatar>
								</div>
								<div>
									<Button size="sm" variant="default" onClick={() => {}}>
										Uplaod photo
									</Button>
								</div>
							</div>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4"
								>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="appfur@gmail.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</form>
							</Form>
						</CardContent>
					</Card>
				)}
				{currentTab === 'Report' && (
					<Card className="py-0">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-bold text-gray-500">
								Report
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex justify-start items-center gap-4">
								<div className="flex justify-start items-center gap-3">
									<Avatar className="w-14 h-14">
										<AvatarImage src={user?.profileImage?.url} />
										<AvatarFallback>{user?.name[0]}</AvatarFallback>
									</Avatar>
								</div>
								<div>
									<Button size="sm" variant="default" onClick={() => {}}>
										Uplaod photo
									</Button>
								</div>
							</div>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-4"
								>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="appfur@gmail.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</form>
							</Form>
						</CardContent>
					</Card>
				)}
			</div>
			{isLoading && <Loader />}
		</main>
	);
};

export default Settings;
