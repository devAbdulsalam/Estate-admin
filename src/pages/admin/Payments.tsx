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
import { userRoles } from '../../../../server/Enum/index';
import PaymentModal from '@/components/PaymentModal';

const Payments = () => {
	const { tokens } = useAuth();
	const [payments, setPayments] = useState([]);
	const [details, setDetails] = useState(null);
	const [paymentModal, setPaymentModal] = useState(false);
	const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: ['payments'],
		queryFn: async () => fetchPayments(tokens?.token),
	});
	useEffect(() => {
		setPayments(null);
	}, []);
	const handlePaymentDetails = (item : any) => {
		setDetails(item);
		setPaymentModal(true);
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-2xl font-bold mb-8">Recent Payments</h1>
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
			<PaymentModal
				isModal={paymentModal}
				setIsModal={setPaymentModal}
				handelClick={() => {}}
				data={details}
			/>
		</div>
	);
};

export default Payments;
