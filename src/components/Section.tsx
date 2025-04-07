import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const sections = [
	{
		id: 'subscriptions',
		title: 'Subscriptions',
		description:
			'lorerm ipsum lorerm ipsum lorerm ipsum lorerm ipsum Create a one-off payment link for a unique transaction.',
		bg: 'bg-purple-500',
	},
	{
		id: 'checkout-ai',
		title: 'Checkout AI',
		description:
			'ipsum lorerm ipsum lorerm ipsum Create a one-off sCreate a one-off payment link for a unique transaction.',
		bg: 'bg-red-500',
	},
	{
		id: 'payment-links',
		title: 'Payment Links',
		description: 'Create a one-off payment link for a unique transaction.',
		bg: 'bg-blue-500',
	},
	{
		id: 'payment-api',
		title: 'Payment API',
		description:
			'Get access to global payment options from one central dashboard.',
		bg: 'bg-yellow-500',
	},
];

export default function Home() {
	const [active, setActive] = useState('subscriptions');

	useEffect(() => {
		const handleScroll = () => {
			const sectionElements = sections.map(({ id }) =>
				document.getElementById(id)
			);
			const visibleSection = sectionElements.find(
				(section) =>
					section &&
					section.getBoundingClientRect().top >= 0 &&
					section.getBoundingClientRect().top < window.innerHeight / 2
			);
			if (visibleSection) setActive(visibleSection.id);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="flex flex-col items-center w-full h-screen p-8 space-y-8">
			{/* Stepper */}
			<div className="fixed top-4 bg-gray-100 p-2 rounded-full shadow-md flex space-x-4 z-50">
				{sections.map((section) => (
					<button
						key={section.id}
						onClick={() =>
							document
								.getElementById(section.id)
								?.scrollIntoView({ behavior: 'smooth' })
						}
						className={cn(
							'px-4 py-2 rounded-full text-sm font-medium',
							active === section.id ? 'bg-black text-white' : 'text-gray-600'
						)}
					>
						{section.title}
					</button>
				))}
			</div>

			{/* Sections */}
			<div className="relative w-full max-w-4xl space-y-16 mt-16">
				{sections.map((section, index) => (
					<div
						key={section.id}
						id={section.id}
						className={cn(
							'w-full p-6 rounded-xl shadow-lg flex flex-col space-y-4 text-white transition-all duration-500',
							section.bg,
							// active === section.id
							// 	? 'opacity-100 scale-100 z-10'
							// 	: 'opacity-0 scale-90 z-0'
						)}
					>
						<h2 className="text-2xl font-bold">{section.title}</h2>
						<p>Content for {section.description} section.</p>
					</div>
				))}
			</div>
		</div>
	);
}
