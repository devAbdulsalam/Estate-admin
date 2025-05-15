import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { fetchTransactions } from '@/api';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
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
import {
	EllipsisVertical,
	TrendingUp,
	MoreHorizontal,
	Plus,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { userRoles } from '../../../../server/Enum/index';
import CommissionModal from '@/components/CommissionModal';

const Commission = () => {
	const { tokens } = useAuth();
	const [payments, setPayments] = useState([]);
	const [details, setDetails] = useState(null);
	const [paymentModal, setPaymentModal] = useState(false);
	const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: ['transactions'],
		queryFn: async () => fetchTransactions(tokens?.token),
	});
	useEffect(() => {
		setPayments(null);
	}, []);
	const handlePaymentDetails = (item: any) => {
		setDetails(item);
		setPaymentModal(true);
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex my-2 p-1">
					<div className="flex-1 w-full"></div>
					<Button
						className="w-fit"
						type="button"
						onClick={() => setPaymentModal(true)}
					>
						<Plus /> Set Commission
					</Button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<Card className="py-0">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-gray-500">
								Total Commission Earned
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex justify-between">
								<div className="text-2xl font-bold">60000</div>
								<div className="flex bg-green-50 rounded-md items-center gap-2 px-2 py-1">
									<TrendingUp className="h-4 w-4 text-green-500" />
									<div className="text-green-500 text-sm mt-2">10%</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="text-xs bg-gray-200 text-center py-2 text-gray-500 mt-4">
							{format(data?.commission?.updatedAt || new Date(), 'MM/dd/yyyy')}
						</CardFooter>
					</Card>

					<Card className="py-0">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-gray-500">
								Commission this month
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex justify-between">
								<div className="text-2xl font-bold">
									{data?.commission?.amount}
								</div>
								<div className="flex bg-green-50 rounded-md items-center gap-2 px-2 py-1">
									<TrendingUp className="h-4 w-4 text-green-500" />
									<div className="text-green-500 text-sm mt-2">5%</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="text-xs bg-gray-200 text-center py-2 text-gray-500 mt-4">
							{format(data?.commission?.updatedAt || new Date(), 'MM/dd/yyyy')}
						</CardFooter>
					</Card>
					<Card className="py-0">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-gray-500">
								Current Rate
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex justify-between">
								<div className="text-2xl font-bold">
									{data?.commission?.mode === 'flat' ? '₦' : '%'}
									{data?.commission?.amount}
								</div>
								<div className="flex bg-green-50 rounded-md items-center gap-2 px-2 py-1">
									<TrendingUp className="h-4 w-4 text-green-500" />
									<div className="text-green-500 text-sm mt-2 capitalize">
										{data?.commission?.mode === 'flat' ? '₦' : '%'}
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="text-xs bg-gray-200 text-center py-2 text-gray-500 mt-4 capitalize">
							{format(data?.commission?.updatedAt || new Date(), 'MM/dd/yyyy')}
						</CardFooter>
					</Card>
				</div>
				<h1 className="text-2xl font-bold mb-8">Recent Commission</h1>
				<div>
					<Card>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[300px] whitespace-nowrap">
										OrderId
									</TableHead>
									<TableHead className="w-[300px] whitespace-nowrap">
										Amount
									</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Date</TableHead>
									<TableHead className="text-center">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.length > 0 &&
									data?.map((item) => (
										<TableRow key={item?._id}>
											<TableCell className="cursor-pointer">
												{item?.user?.name}
											</TableCell>
											<TableCell
												className=""
												onClick={() => navigate(`/payments/${item?._id}`)}
											>
												{item?.amount}
											</TableCell>
											<TableCell>
												<span
													className={`p-1 px-2 text-xs rounded-full capitalize ${
														item.status === 'paid'
															? 'bg-green-100 text-green-800'
															: item.status === 'pending'
															? 'bg-red-50 text-red-500'
															: 'bg-gray-100 text-gray-800'
													}`}
												>
													{item?.status}
												</span>
											</TableCell>
											<TableCell>{format(item?.date, 'MM/dd/yyyy')}</TableCell>
											<TableCell className="text-right">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handlePaymentDetails(item)}
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
			<CommissionModal
				isOpen={paymentModal}
				closeModal={() => setPaymentModal(false)}
				handelClick={() => {}}
				data={details}
			/>
		</div>
	);
};

export default Commission;
