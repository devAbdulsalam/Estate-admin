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
import { useAuth } from '@/contexts/AuthContext';
import { X } from 'lucide-react';

const formSchema = z.object({
	hoaName: z.string().min(2, 'Hoa name must be at least 2 characters'),
	adminName: z.string().min(2, 'Admin name must be at least 2 characters'),
	adminEmail: z.string().email('Invalid email address'),
	totalMembers: z
		.string()
		.refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
			message: 'Total members must be a positive number',
		}),
});
const Modal = ({
	isOpen,
	closeModal,
}: {
	isOpen: boolean;
	closeModal: () => void;
}) => {
	const [image, setImage] = useState<File>();
	const [imageUrl, setImageUrl] = useState<string>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { tokens } = useAuth();
	const apiUrl = import.meta.env.VITE_API_URL;

	const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			hoaName: '',
			adminName: '',
			totalMembers: '',
			adminEmail: '',
		},
	});

	const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const droppedFiles = Array.from(e.dataTransfer.files);

		// Filter only image files
		const validImageFiles = droppedFiles.filter((file) =>
			file.type.startsWith('image/')
		);

		if (validImageFiles.length > 0) {
			const selectedFile = validImageFiles[0]; // Process only the first image
			const url = URL.createObjectURL(selectedFile);

			setImageUrl(url); // Assuming setImageUrl is a state setter for previewing the image
			setImage(selectedFile); // Assuming setImage stores the file object
		}
	};

	const mutation = useMutation({
		mutationFn: async (formData: FormData) => {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${tokens?.token}`,
				},
			};
			return axios.post(`${apiUrl}/admins/hoas`, formData, config);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['hoas'] });
			queryClient.invalidateQueries({ queryKey: ['hoas', 'dashboard'] });
			toast.success('HOA added successfully!');
			form.reset(); // Reset form after success
			setImage(null); // Clear the image state
			setImageUrl(null); // Clear the image state
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
			// Create FormData object and append values
			const formData = new FormData();
			Object.entries(values).forEach(([key, value]) => {
				formData.append(key, value as string);
			});

			if (image) {
				formData.append('logo', image);
			}

			// Trigger mutation
			await mutation.mutateAsync(formData);
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
								<CardTitle className="">Add HOA</CardTitle>
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
											name="hoaName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Hoa Name</FormLabel>
													<FormControl>
														<Input placeholder="Enter Hoa name" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="adminName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Admin Name</FormLabel>
													<FormControl>
														<Input placeholder="Enter admin name" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="adminEmail"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Admin email</FormLabel>
													<FormControl>
														<Input
															type="email"
															placeholder="appful@gmail.com"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="totalMembers"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Number of members</FormLabel>
													<FormControl>
														<Input type="number" placeholder="0" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div>
											<FormLabel>Upload Logo</FormLabel>
											<div
												className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition-colors"
												onDragOver={(e) => e.preventDefault()}
												onDrop={handleImageDrop}
												onClick={() =>
													document.getElementById('fileInput')?.click()
												}
											>
												{imageUrl ? (
													<img
														src={imageUrl}
														alt="Preview image"
														className="w-full h-24 object-cover rounded-lg"
													/>
												) : null}
												<input
													type="file"
													id="fileInput"
													accept="image/*"
													className="hidden"
													onChange={(e) => {
														if (e.target.files && e.target.files.length > 0) {
															const file = e.target.files[0]; // Get the first selected file
															setImage(file);
															const url = URL.createObjectURL(file);
															setImageUrl(url);
														}
													}}
												/>

												<div className="text-center">
													<p className="text-gray-600">
														Drop files here to upload...
													</p>
													<p className="text-sm text-gray-500 mt-1">
														or click to browse
													</p>
												</div>
											</div>
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
