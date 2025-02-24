import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { fetchPayments } from '@/api';
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

const Payments = () => {
	const { tokens } = useAuth();
	const [payments, setPayments] = useState([]);
	const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: ['payments'],
		queryFn: async () => fetchPayments(tokens?.token),
	});
	useEffect(() => {
		setPayments(null);
	}, []);
	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-2xl font-bold text-center mb-8">Recent Payments</h1>
				<div>
					<Card>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[300px] whitespace-nowrap">
										Amount
									</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Date</TableHead>
									<TableHead className="text-center">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.map((item) => (
									<TableRow key={item?._id}>
										<TableCell
											className="cursor-pointer"
											onClick={() => navigate(`/payments/${item?._id}`)}
										>
											{item?.amount}
										</TableCell>
										<TableCell>{item?.status}</TableCell>
										<TableCell>
											{format(item?.date, 'MM/dd/yyyy')}
										</TableCell>
										<TableCell className="text-right">
											<Button variant="ghost" size="icon">
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

export default Payments;
