import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchHoaDetails } from '@/api';
import { useNavigate, useParams } from 'react-router-dom';

const HoaDetails = () => {
	const { tokens } = useAuth();
	const { id } = useParams();
	const navigate = useNavigate();
	const { data } = useQuery({
		queryKey: ['hoas', id],
		queryFn: async () => fetchHoaDetails(tokens?.token, id),
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
			<div>HoaDetails</div>
		</main>
	);
};

export default HoaDetails;
