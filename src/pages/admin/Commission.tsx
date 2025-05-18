import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { fetchCommissions } from '@/api';
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
import { EllipsisVertical, TrendingUp, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import CommissionModal from '@/components/CommissionModal';

const Commission = () => {
	const { tokens } = useAuth();
	const [payments, setPayments] = useState([]);
	const [details, setDetails] = useState(null);
	const [paymentModal, setPaymentModal] = useState(false);
	// const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: ['commissions'],
		queryFn: async () => fetchCommissions(tokens?.token),
	});
	useEffect(() => {
		setPayments(null);
	}, []);
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
								<div className="text-2xl font-bold">
									{data?.totalCommission}
								</div>
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
									{data?.thisMonthCommission || '0'}
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
									{data?.commissionSetting?.mode === 'flat'
										? `₦${data?.commissionSetting?.amount}`
										: `${data?.commissionSetting?.amount}%`}
								</div>
								<div className="flex bg-green-50 rounded-md items-center gap-2 px-2 py-1">
									<TrendingUp className="h-4 w-4 text-green-500" />
									<div className="text-green-500 text-sm mt-2 capitalize">
										{data?.commissionSetting?.mode === 'flat' ? '₦' : '%'}
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="text-xs bg-gray-200 text-center py-2 text-gray-500 mt-4 capitalize">
							{format(
								data?.commissionSetting?.updatedAt || new Date(),
								'MM/dd/yyyy'
							)}
						</CardFooter>
					</Card>
				</div>
				<h1 className="text-2xl font-bold mb-8">Recent Commission</h1>
				<div>
					<Card>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="whitespace-nowrap">User</TableHead>
									<TableHead className="whitespace-nowrap">Total</TableHead>
									<TableHead>Commission</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Date</TableHead>
									<TableHead className="text-center">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.commissions?.length > 0 &&
									data?.commissions?.map((item) => (
										<TableRow key={item?._id}>
											<TableCell className="cursor-pointer whitespace-nowrap">
												{item?.user?.name}
											</TableCell>
											<TableCell>{item?.amount}</TableCell>
											<TableCell>{item?.commissionAmount}</TableCell>
											<TableCell>{item?.actualAmount}</TableCell>
											<TableCell>{format(item?.date, 'MM/dd/yyyy')}</TableCell>
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
