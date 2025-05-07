import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchIssueDetails } from '@/api';
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
import ChatModal from '@/components/ChatModal';
import { format } from 'date-fns';

const Details = () => {
	const { tokens } = useAuth();
	const { id } = useParams();
	const [isModal, setIsModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: ['issues', id],
		queryFn: async () => fetchIssueDetails(tokens?.token, id),
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
				<ChatModal
					closeModal={() => setIsModal(false)}
					isOpen={isModal}
					hoaId={id}
				/>
				<div className="max-w-4xl mx-auto px-4 py-12">
					<img
						src={data?.user?.profileImage?.url}
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
								<CardTitle>Chats</CardTitle>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setIsModal(true)}
								>
									<Plus />
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<div className="p-2 md:p-6">{}</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
};

export default Details;
