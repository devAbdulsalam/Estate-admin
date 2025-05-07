import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchHoaDetails } from '@/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, EllipsisVertical, MoreHorizontal, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { avatarImage } from '@/data';
import { AvatarGroup } from '@/components/ui/avatar-group';
import Modal from '@/components/CreateEstateModal';
import { format } from 'date-fns';
import ActionMenuCell from '@/components/ActionMenu';

const HoaDetails = () => {
	const { tokens } = useAuth();
	const { id } = useParams();
	const [isModal, setIsModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: ['hoas', id],
		queryFn: async () => fetchHoaDetails(tokens?.token, id),
	});

	useEffect(() => {
		if (!id) {
			navigate(-1);
		}
	}, [id, navigate]);
	useEffect(() => {
		if (data) {
			console.log('data', data);
		}
	}, [data]);
	return (
		<main className="min-h-screen bg-white">
			<div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Modal
					closeModal={() => setIsModal(false)}
					isOpen={isModal}
					hoaId={id}
				/>
				<div className="max-w-4xl mx-auto px-4 py-12">
					<img
						src={data?.logo?.url}
						alt={data?.name}
						className="w-full h-[400px] object-cover rounded-xl mb-8"
					/>
					<div className="flex items-center gap-4 mb-4 text-gray-600">
						<div className="flex items-center gap-2">
							<Calendar className="w-4 h-4" />
							<span>{format(data?.createdAt || new Date(), 'dd/MM/yyyy')}</span>
						</div>
						<span>•</span>
						<span>{data?.adminId?.name}</span>
						<span>•</span>
						<span className="text-ffms-primary">{data?.adminId?.email}</span>
					</div>
					<h1 className="text-4xl font-bold mb-6">{data?.name}</h1>
				</div>
				{/* Table Section */}
				<div>
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<CardTitle>Estates</CardTitle>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setIsModal(true)}
								>
									<Plus className="text-ffms-primary" />
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<div className="p-2 md:p-6">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-[300px] whitespace-nowrap">
												Name
											</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Members</TableHead>
											<TableHead className="text-right"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data?.estates?.map((estate) => (
											<TableRow key={estate._id}>
												<TableCell className="font-medium">
													{estate?.name}
												</TableCell>
												<TableCell>
													<span
														className={`px-2 py-1 rounded-full text-xs ${
															estate.status === 'active'
																? 'bg-green-100 text-green-600'
																: estate.status === 'deleted'
																? 'bg-red-100 text-red-600'
																: 'bg-gray-100 text-gray-600'
														}`}
													>
														{estate.status}
													</span>
												</TableCell>
												<TableCell>
													<div
														className={`flex items-center gap-2 relative ${
															estate?.members?.length > 0 ? 'w-full' : 'w-fit'
														}`}
													>
														{estate?.members?.length > 0 ? (
															<AvatarGroup>
																{estate?.members?.map((user, index) => (
																	<Avatar key={index}>
																		<AvatarImage
																			src={user.image || avatarImage}
																		/>
																		<AvatarFallback>U</AvatarFallback>
																	</Avatar>
																))}
															</AvatarGroup>
														) : (
															<Avatar>
																<AvatarImage src={avatarImage} />
																<AvatarFallback>U</AvatarFallback>
															</Avatar>
														)}
														<p className="absolute top-0 right-0 rounded-full w-10 h-10 flex justify-center items-center text-sm bg-gray-100 text-primary">
															{estate?.members?.length > 0
																? `+${estate?.members?.length}`
																: '0'}
														</p>
													</div>
												</TableCell>
												<TableCell className="text-right">
													<ActionMenuCell
														onEdit={() => {}}
														onDelete={() => {}}
														editText="Update"
														deleteText="Delete"
													/>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
};

export default HoaDetails;
