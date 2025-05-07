import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { fetchInvoices } from '@/api';
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
import InvoiceModal from '@/components/InvoiceModal';

const Invoices = () => {
	const { tokens } = useAuth();
	const [invoices, setInvoices] = useState([]);
	const [details, setDetails] = useState(null);
	const [paymentModal, setPaymentModal] = useState(false);
	const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: ['invoices'],
		queryFn: async () => fetchInvoices(tokens?.token),
	});
    useEffect(() => {
        console.log('data', data);
		setInvoices(data);
	}, [data]);
	const handlePaymentDetails = (item: any) => {
		setDetails(item);
		setPaymentModal(true);
	};
	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-2xl font-bold  mb-8">Invoices</h1>
				<div>
					<Card>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[300px] whitespace-nowrap">
										S/N
									</TableHead>
									<TableHead className="w-[300px] whitespace-nowrap">
										User
									</TableHead>
									<TableHead className="w-[300px] whitespace-nowrap">
										Name
									</TableHead>
									<TableHead className="w-[300px] whitespace-nowrap">
										Amount
									</TableHead>
									<TableHead>Duedate</TableHead>
									{/* <TableHead>Description</TableHead> */}
									<TableHead className="w-[300px] whitespace-nowrap">
										Status
									</TableHead>
									<TableHead>Date</TableHead>
									<TableHead className="text-center">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{invoices?.length > 0 &&
									invoices?.map((item, index) => (
										<TableRow key={item?._id}>
											<TableCell>{index + 1}</TableCell>
											<TableCell
												className="cursor-pointer capitalize"
												// onClick={() => navigate(`/users/${item?._id}`)}
											>
												{item?.userId?.name}
											</TableCell>
											<TableCell
												className="cursor-pointer capitalize"
												// onClick={() => navigate(`/users/${item?._id}`)}
											>
												{item?.dueId?.name}
											</TableCell>
											<TableCell>{item?.amount}</TableCell>
											<TableCell>{item?.dueDate}</TableCell>
											{/* <TableCell className="whitespace-nowrap">
												{item?.description}
											</TableCell> */}
											<TableCell className="whitespace-nowrap">
												<span
													className={`p-1 px-2 rounded-md capitalize text-xs ${
														item?.status === 'paid'
															? 'bg-green-100 text-green-800'
															: item?.status === 'pending'
															? 'bg-red-50 text-red-500'
															: 'bg-gray-100 text-gray-800'
													}`}
												>
													{item?.status}
												</span>
											</TableCell>
											<TableCell>
												{format(item?.updatedAt, 'MM/dd/yyyy')}
											</TableCell>
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
			<InvoiceModal
				isModal={paymentModal}
				setIsModal={setPaymentModal}
				handelClick={() => {}}
				data={details}
			/>
		</div>
	);
};

export default Invoices;
