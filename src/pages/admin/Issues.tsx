import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { fetchIssues } from '@/api';
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
import { format } from 'date-fns';
import { EllipsisVertical } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Notifications = () => {
	const { tokens } = useAuth();
	const { data } = useQuery({
		queryKey: ['issues'],
		queryFn: async () => fetchIssues(tokens?.token),
	});
	const navigate = useNavigate();
	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-2xl font-bold  mb-8">Issues</h1>
				<div>
					<Card>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="whitespace-nowrap">S/N</TableHead>
									<TableHead>Category</TableHead>
									<TableHead className="whitespace-nowrap">Date</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-center">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.length > 0 &&
									data?.map((item, index) => (
										<TableRow key={item?._id}>
											<TableCell className="font-medium">{index + 1}</TableCell>
											<TableCell className="font-medium capitalize">
												{item.category}
											</TableCell>
											<TableCell className="font-medium">
												{format(item?.createdAt, 'MM/dd/yyyy')}
											</TableCell>
											<TableCell className="font-medium">
												<span
													className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
														item.status === 'completed'
															? 'bg-green-100 text-green-800'
															: item.status === 'pending'
															? 'bg-red-50 text-red-500'
															: 'bg-gray-100 text-gray-800'
													}`}
												>
													{item.status}
												</span>
											</TableCell>
											<TableCell className="text-right">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => navigate(`/issues/${item?._id}`)}
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

export default Notifications;
