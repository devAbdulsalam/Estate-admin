import React from 'react';
import { CloseCircle } from 'iconsax-react';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { useState, useEffect } from 'react';
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
	commission_type: z.string().min(2, 'Commission type is required'),
	amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
		message: 'Amount must be a positive number',
	}),
});

const Modal = ({
	isOpen,
	closeModal,
	hoaId,
	handelClick,
	data,
}: {
	isOpen: boolean;
	hoaId?: string;
	closeModal: () => void;
	handelClick?: () => void;
	data?: any;
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [commission_type, setCommission_type] = useState('flat');
	const [isNotify, setIsNotify] = useState(false);
	const { tokens } = useAuth();
	const apiUrl = import.meta.env.VITE_API_URL;

	const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			commission_type: 'flat', // Set default value
			amount: '',
		},
	});

	// Update commission_type whenever form value changes
	useEffect(() => {
		const subscription = form.watch((value) => {
			if (value.commission_type) {
				setCommission_type(value.commission_type);
			}
		});
		return () => subscription.unsubscribe();
	}, [form.watch]);

	const mutation = useMutation({
		mutationFn: async ({ mode, amount }: { mode: string; amount: number }) => {
			const config = {
				headers: {
					Authorization: `Bearer ${tokens?.token}`,
				},
			};
			return axios.post(
				`${apiUrl}/admins/commission`,
				{ mode, amount, isNotify },
				config
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['hoas', hoaId] });
			queryClient.invalidateQueries({
				queryKey: ['hoas', 'dashboard', 'transactions', 'commissions', hoaId],
			});
			toast.success('Commission updated successfully!', {
				position: 'top-right',
			});
			form.reset(); // Reset form after success
			closeModal(); // Close modal only on success
		},
		onError: (error) => {
			const message = getError(error);
			toast.error(message, {
				position: 'top-right',
			});
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		try {
			const mode = values.commission_type;
			const amount = values.amount;
			// Trigger mutation
			await mutation.mutateAsync({ mode, amount: parseFloat(amount) });
		} catch (error) {
			const message = getError(error);
			toast.error(message, {
				position: 'top-right',
			});
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
								<CardTitle className="">Commission Settings</CardTitle>
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
											name="commission_type"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Commission Type</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger className="bg-white">
																<SelectValue placeholder="Choose commission type" />
															</SelectTrigger>
														</FormControl>
														<SelectContent className="bg-white z-[9999]">
															<SelectItem value="flat">Flat</SelectItem>
															<SelectItem value="percentage">
																Percentage
															</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="amount"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														{commission_type === 'flat'
															? 'Amount'
															: 'Percentage'}
													</FormLabel>
													<FormControl>
														<Input
															placeholder={
																commission_type === 'flat' ? '₦ Amount' : '%'
															}
															{...field}
															className="bg-white"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="flex items-center gap-2">
											<input
												type="checkbox"
												className="h-4 w-4"
												checked={isNotify}
												onChange={() => setIsNotify(!isNotify)}
												id="notify-checkbox"
											/>
											<label htmlFor="notify-checkbox">
												Notify Hoas this update
											</label>
										</div>
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
