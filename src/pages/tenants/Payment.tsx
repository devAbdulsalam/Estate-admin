import { fetchIndex } from '@/api';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Index = () => {
	const { tokens } = useAuth();
	const { data } = useQuery({
		queryKey: ['payments'],
		queryFn: async () => fetchIndex(tokens?.token),
	});
	return (
		<main className="min-h-screen bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div>Payment</div>
		</main>
	);
};

export default Index;
