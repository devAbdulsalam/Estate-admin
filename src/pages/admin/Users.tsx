import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { fetchUsers } from '@/api';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { avatarImage } from '@/data';
import { EllipsisVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Users = () => {
	const { tokens } = useAuth();
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: ['users'],
		queryFn: async () => fetchUsers(tokens?.token),
	});
	useEffect(() => {
		setUsers(null);
	}, []);
	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-2xl font-bold mb-8">Users</h1>
				<div>
					<Card>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="whitespace-nowrap">S/N</TableHead>
									<TableHead className="w-[300px] whitespace-nowrap">
										Name
									</TableHead>
									<TableHead className="w-[300px] whitespace-nowrap">
										Email
									</TableHead>
									<TableHead>Role</TableHead>
									<TableHead className="w-[300px] whitespace-nowrap">
										Status
									</TableHead>
									<TableHead>Date</TableHead>
									<TableHead className="text-center">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.length > 0 &&
									data?.map((item, index) => (
										<TableRow key={item?._id}>
											<TableCell className="px-6">{index + 1}</TableCell>
											<TableCell
												className="cursor-pointer capitalize"
												onClick={() => navigate(`/users/${item?._id}`)}
											>
												{item?.name}
											</TableCell>
											<TableCell>{item?.email}</TableCell>
											<TableCell>{item?.role}</TableCell>
											<TableCell className="whitespace-nowrap">
												{item?.isVerified ? 'Verified' : 'Not Verified'}
											</TableCell>
											<TableCell>
												{format(item?.updatedAt, 'MM/dd/yyyy')}
											</TableCell>
											<TableCell className="text-right">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => navigate(`/users/${item?._id}`)}
												>
													<EllipsisVertical className="h-4 w-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Users;
