import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchEstateDetails } from '@/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const HoaDetails = () => {
	const { tokens } = useAuth();
	const { id } = useParams();
	const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: ['estates', id],
		queryFn: async () => fetchEstateDetails(tokens?.token, id),
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
		<main className="min-h-screen bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="max-w-4xl mx-auto px-4 py-12">
				<img
					src={data?.image}
					alt={data?.title}
					className="w-full h-[400px] object-cover rounded-xl mb-8"
				/>
				<div className="flex items-center gap-4 mb-4 text-gray-600">
					<div className="flex items-center gap-2">
						<Calendar className="w-4 h-4" />
						<span>{data?.date}</span>
					</div>
					<span>•</span>
					<span>{data?.author}</span>
					<span>•</span>
					<span className="text-ffms-primary">{data?.category}</span>
				</div>
				<h1 className="text-4xl font-bold mb-6">{data?.title}</h1>
				<div className="prose max-w-none">
					{data?.content.split('\n\n').map((paragraph, index) => (
						<p key={index} className="mb-4 text-gray-700 leading-relaxed">
							{paragraph}
						</p>
					))}
				</div>
			</div>
		</main>
	);
};

export default HoaDetails;
