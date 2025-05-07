import { useEffect, useRef } from 'react';
import index from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			if (user) {
				navigate('/dashboard');
				return;
			} else {
				navigate('/login');
			}
		}, 2000); // Show the page after 2 seconds
	}, [user, navigate]);

	return (
		<div className="min-h-screen bg-white relative w-full">
			<div className="flex items-center justify-center h-screen">
				<img className="object-contain w-64 h-64" src={index} alt="Gate" />
			</div>
		</div>
	);
};

export default Index;
