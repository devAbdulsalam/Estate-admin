import { Plus, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import axios from 'axios';
import getError from '@/hooks/getError';
import { useEffect } from 'react';
import { fetchHoa } from '@/api';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { Trash2, Pencil } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
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
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import Modal from '@/components/CreateHoasModal';
import DeleteHoaModal from '@/components/DeleteHoaModal';

interface Customer {
	id: number;
	name: string;
	status: 'Active' | 'Churned';
	admin: string;
	email: string;
	members: string[];
	totalMenbers: number;
}
import { avatarImage } from '@/data';
import { Navigate, useNavigate } from 'react-router-dom';

const Hoas = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isModal, setIsModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
	const [item, setItem] = useState<string | null>(null);
	const [hoas, setHoas] = useState([]);
	const navigate = useNavigate();
	const { tokens } = useAuth();
	const { data } = useQuery({
		queryKey: ['hoas'],
		queryFn: async () => fetchHoa(tokens?.token),
	});
	useEffect(() => {
		console.log('fetchHoa fetchHoa', data?.hoas);
		if (data?.hoas) {
			setHoas(data?.hoas);
		}
	}, [data]);
	const apiUrl = import.meta.env.VITE_API_URL;

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (itemId: string) => {
			const config = {
				headers: {
					Authorization: `Bearer ${tokens?.token}`,
				},
			};
			return axios.delete(`${apiUrl}/admins/hoas/${itemId}`, config);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['hoas'] });
			queryClient.invalidateQueries({
				queryKey: ['hoas', 'dashboard'],
			});
			toast.success('HOA deleted successfully!');
			setLoading(false);
		},
		onError: (error) => {
			const message = getError(error);
			toast.error(message);
		},
	});

	// Trigger mutation

	const handleDelete = async () => {
		try {
			setIsDeleteModal(false);
			setLoading(true);
			setItem(null);
			console.log(item);
			// Delete hoa from API
			await mutation.mutateAsync(item);
		} catch (error) {
			const message = getError(error);
			toast.error(message);
		} finally {
			setLoading(false);
		}
	};
	const handleConfirmDelete = (id: string) => {
		setIsDeleteModal(true);
		setItem(id);
	};
	const handleConfirmEdit = (id: string) => {
		setItem(id);
		toast.success('Edit HOA is comming soon');
	};
	return (

		<main className="min-h-screen bg-white">
		<div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<Modal closeModal={() => setIsModal(false)} isOpen={isModal} />
			<DeleteHoaModal
				setIsModal={() => setIsDeleteModal(false)}
				isModal={isDeleteModal}
				handelDelete={handleDelete}
			/>
			<div className="flex my-2 p-1">
				<div className="flex-1 w-full"></div>
				<Button
					className="w-fit"
					type="button"
					onClick={() => setIsModal(true)}
				>
					<Plus /> Add new Hoas
				</Button>
			</div>
			{/* Statistics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card className="py-0">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-500">
							Total Hoas
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between">
							<div className="text-2xl font-bold">{data?.totalHoas}</div>
							<div className="flex bg-green-50 rounded-md items-center gap-2 px-2 py-1">
								<TrendingUp className="h-4 w-4 text-green-500" />
								<div className="text-green-500 text-sm mt-2">+2.5%</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="text-xs bg-gray-200 text-center py-2 text-gray-500 mt-4">
						Last updated on 1st January, 2024
					</CardFooter>
				</Card>
				<Card className="py-0">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-500">
							Active Hoas
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between">
							<div className="text-2xl font-bold">{data?.activeHoas}</div>
							<div className="flex bg-green-50 rounded-md items-center gap-2 px-2 py-1">
								<TrendingUp className="h-4 w-4 text-green-500" />
								<div className="text-green-500 text-sm mt-2">+2.5%</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="text-xs bg-gray-200 text-center py-2 text-gray-500 mt-4">
						Last updated on 1st January, 2024
					</CardFooter>
				</Card>
				<Card className="py-0">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-500">
							Total members
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between">
							<div className="text-2xl font-bold">{data?.totalMembers}</div>
							<div className="flex bg-green-50 rounded-md items-center gap-2 px-2 py-1">
								<TrendingUp className="h-4 w-4 text-green-500" />
								<div className="text-green-500 text-sm mt-2">+2.5%</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="text-xs bg-gray-200 text-center py-2 text-gray-500 mt-4">
						Last updated on 1st January, 2024
					</CardFooter>
				</Card>
			</div>
			<div className="bg-white rounded-lg shadow">
				<div className="p-6">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[300px] whitespace-nowrap">
									HOA Associations
								</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Admin</TableHead>
								<TableHead className="whitespace-nowrap">
									Email address
								</TableHead>
								<TableHead>Users</TableHead>
								<TableHead className="text-center">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{hoas?.map((hoa) => (
								<TableRow key={hoa._id}>
									<TableCell
										className="font-medium cursor-pointer"
										onClick={() => navigate(`/hoas/${hoa?._id}`)}
									>
										<div className="flex items-center gap-3">
											<Avatar>
												<AvatarImage src={hoa.logo.url} />
												<AvatarFallback>{hoa.name[0]}</AvatarFallback>
											</Avatar>
											{hoa.name}
										</div>
									</TableCell>
									<TableCell>
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
												hoa.status === 'active'
													? 'bg-green-100 text-green-800'
													: hoa.status === 'deleted'
													? 'bg-red-100 text-red-800'
													: 'bg-gray-100 text-gray-800'
											}`}
										>
											{hoa.status}
										</span>
									</TableCell>
									<TableCell>{hoa.adminId.name}</TableCell>
									<TableCell className="whitespace-nowrap">
										{hoa.adminId.email}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2 relative">
											{hoa?.members?.length > 0 ? (
												<AvatarGroup>
													{hoa?.members?.map((user, index) => (
														<Avatar key={index}>
															<AvatarImage src={user.image || avatarImage} />
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
												{hoa?.members?.length > 0
													? `+${hoa?.members?.length}`
													: '0'}
											</p>
										</div>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-2">
											<Button
												onClick={() => handleConfirmDelete(hoa._id)}
												variant="ghost"
												size="icon"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
											<Button
												onClick={() => handleConfirmEdit(hoa._id)}
												variant="ghost"
												size="icon"
											>
												<Pencil className="h-4 w-4" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				{hoas?.length > 50 ? (
					<div className="border-t p-4">
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious href="#" />
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href="#" isActive>
										1
									</PaginationLink>
								</PaginationItem>
								<PaginationItem className="hidden md:block">
									<PaginationLink href="#">2</PaginationLink>
								</PaginationItem>
								<PaginationItem className="hidden md:block">
									<PaginationLink href="#">3</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
								<PaginationItem className="hidden md:block">
									<PaginationLink href="#">8</PaginationLink>
								</PaginationItem>
								<PaginationItem className="hidden md:block">
									<PaginationLink href="#">9</PaginationLink>
								</PaginationItem>
								<PaginationItem className="hidden md:block">
									<PaginationLink href="#">10</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationNext href="#" />
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				) : null}
			</div>
		</div>
		</main>
	);
};

export default Hoas;
