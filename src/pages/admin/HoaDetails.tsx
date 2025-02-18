import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchIndex } from '@/api';

const HoaDetails = () => {
	const { tokens, setNotifications } = useAuth();
	const { data } = useQuery({
		queryKey: ['dashboard'],
		queryFn: async () => fetchIndex(tokens?.token),
	});
	useEffect(() => {
		if (data?.notifications) {
			setNotifications(data?.notifications);
		}
	}, [data]);
	return (
		<main className="min-h-screen bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div>HoaDetails</div>
		</main>
	);
};

export default HoaDetails;
