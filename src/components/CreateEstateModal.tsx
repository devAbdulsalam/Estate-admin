import React from 'react';
import { CloseCircle } from 'iconsax-react';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import getError from '@/hooks/getError';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
	name: z.string().min(2, 'Estate name must be at least 2 characters'),
	description: z.string().min(2, 'Description must be at least 2 characters'),
	address: z.string().min(2, 'Invalid address'),
});
const Modal = ({
	isOpen,
	closeModal,
	hoaId,
}: {
	isOpen: boolean;
	hoaId: string;
	closeModal: () => void;
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { tokens } = useAuth();
	const apiUrl = import.meta.env.VITE_API_URL;

	const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			address: '',
		},
	});

	const mutation = useMutation({
		mutationFn: async (formData: {
			name: string;
			description: string;
			address: string;
			hoaId: string;
		}) => {
			const config = {
				headers: {
					Authorization: `Bearer ${tokens?.token}`,
				},
			};
			return axios.post(`${apiUrl}/admins/estates`, formData, config);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['hoas', hoaId] });
			queryClient.invalidateQueries({
				queryKey: ['hoas', 'dashboard', 'estates', hoaId],
			});
			toast.success('Estate added successfully!');
			form.reset(); // Reset form after success
			closeModal(); // Close modal only on success
		},
		onError: (error) => {
			const message = getError(error);
			toast.error(message);
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		try {
			// Trigger mutation
			await mutation.mutateAsync({ ...values, hoaId });
		} catch (error) {
			const message = getError(error);
			toast.error(message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog
			transition
			open={isOpen}
			as="div"
			className="relative z-[9999] transition duration-300 ease-out"
			onClose={() => {}}
		>
			<DialogBackdrop className="fixed inset-0 bg-black/30" />
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4">
					<DialogPanel className="w-full max-w-2xl rounded-xl bg-white p-2 md:p-4 backdrop-blur-2xl h-[90%] overflow-y-auto overflow-hidden">
						<Card className="border-0">
							<CardHeader className="flex-row items-center justify-between mb-4">
								<CardTitle className="">Add Estate</CardTitle>
								<Button variant="ghost" size="icon" onClick={closeModal}>
									<CloseCircle size="32" color="#000" variant="TwoTone" />
								</Button>
							</CardHeader>
							<CardContent>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-y-6"
									>
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Estate Name</FormLabel>
													<FormControl>
														<Input placeholder="Enter Estate name" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="description"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Estate Description</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Enter discription"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="address"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Estate Address</FormLabel>
													<FormControl>
														<Input placeholder="Enter address" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button
											disabled={isLoading}
											type="submit"
											className="w-full"
										>
											{!isLoading ? 'Submit' : 'Loading ...'}
										</Button>
									</form>
								</Form>
							</CardContent>
						</Card>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default Modal;
