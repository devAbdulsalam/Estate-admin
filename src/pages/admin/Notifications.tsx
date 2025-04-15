import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { fetchNotifications } from '@/api';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { avatarImage } from '@/data';
import { EllipsisVertical } from 'lucide-react';
import { useEffect } from 'react';
const Notifications = () => {
	const { tokens, setNotifications } = useAuth();
	const { data } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => fetchNotifications(tokens?.token),
	});
	useEffect(() => {
		console.log('data', data);
		setNotifications(null);
	}, [data]);
	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-2xl font-bold  mb-8">Notifications</h1>
				<div>
					<Card>
						<Table>
							<TableBody>
								{data?.length > 0 && data?.map((item) => (
									<TableRow key={item?._id}>
										<TableCell className="font-medium">
											<div className="flex items-center gap-3 w-full">
												<Avatar>
													<AvatarImage src={item?.logo?.url} />
													<AvatarFallback>{item?.title[0]}</AvatarFallback>
												</Avatar>
												<div className="w-full text-black">
													<p className="font-medium capitalize">
														{item?.from?.name}
													</p>
													<p className="text-sm text-gray-500">
														{item?.message}
													</p>
												</div>
											</div>
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

export default Notifications;
