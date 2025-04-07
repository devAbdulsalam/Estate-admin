import { useState } from 'react';
import { cn } from '@/lib/utils';
import Section from '@/components/Section';

const sections = [
	{ id: 'subscriptions', title: 'Subscriptions' },
	{ id: 'checkout-ai', title: 'Checkout AI' },
	{ id: 'payment-links', title: 'Payment Links' },
	{ id: 'payment-api', title: 'Payment API' },
];

const decks = [
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

const Home = () => {
	const [active, setActive] = useState('payment-api');

	return (
		<>
			<div className="sticky top-0">
				<Section />
			</div>
			<div className="flex flex-col items-center w-full h-screen p-8 space-y-8 relative">
				{/* Stepper */}
				<div className="flex space-x-4 bg-gray-100 p-2 rounded-full shadow-md">
					{sections.map((section) => (
						<button
							key={section.id}
							onClick={() => setActive(section.id)}
							className={cn(
								'px-4 py-2 rounded-full text-sm font-medium',
								active === section.id ? 'bg-black text-white' : 'text-gray-600'
							)}
						>
							{section.title}
						</button>
					))}
				</div>

				{/* Deck Section */}
				<div className="relative w-full max-w-4xl">
					{decks.map((deck, index) => (
						<div
							key={deck.id}
							className={cn(
								'absolute inset-0 transition-all duration-500 p-6 rounded-xl shadow-lg flex flex-col space-y-4 text-white',
								deck.bg,
								active === deck.id
									? 'opacity-100 scale-100 z-10'
									: 'opacity-0 scale-90 z-0'
							)}
						>
							<h2 className="text-2xl font-bold">{deck.title}</h2>
							<p>{deck.description}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Home;
