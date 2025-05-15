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
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
	mode: z.string().min(2, 'Commission type is required'),
	stage_of_plant: z.string().min(2, 'stage_of_plant type is required'),
	amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
		message: 'Amount must be a positive number',
	}),
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
	const [mode, setMode] = useState('flat');
	const [isNotify, setIsNotify] = useState(false);

	const { tokens } = useAuth();
	const apiUrl = import.meta.env.VITE_API_URL;

	const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			mode: '',
			amount: '',
			stage_of_plant: '',
		},
	});

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
				queryKey: ['hoas', 'dashboard', 'transactions', 'commission', hoaId],
			});
			toast.success('Commission updated successfully!');
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
			const mode = values?.mode;
			const amount = values?.amount;
			// Trigger mutation
			await mutation.mutateAsync({ mode, amount: parseFloat(amount) });
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
											name="mode"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Commission Type</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Choose" />
															</SelectTrigger>
														</FormControl>
														<SelectContent className="z-10">
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
														{mode === 'flat' ? 'Amount' : 'Percentage'}
													</FormLabel>
													<FormControl>
														<Input
															placeholder={mode === 'flat' ? '₦ Amount' : '%'}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="flex items-center  gap-2">
											<input
												type="checkbox"
												className="h-4 w-4"
												checked={isNotify}
												onChange={() => setIsNotify(!isNotify)}
											/>
											<p>Notify Hoas this update</p>
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
