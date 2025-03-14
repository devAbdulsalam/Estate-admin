import {
	House,
	Building2,
	ChartPie,
	LifeBuoy,
	Settings,
	Banknote,
	User,
} from 'lucide-react';

export const avatarImage = 'https://xsgames.co/randomusers/assets/avatars/male/64.jpg';

export const topMenuLinks = [
	{ label: 'Home', href: '/dashboard', icon: House },
	{ label: 'Hoa management', href: '/hoas', icon: Building2 },
	{ label: 'Invoices', href: '/invoices', icon: Banknote },
	{ label: 'Payments', href: '/payments', icon: Banknote },
	{ label: 'Report', href: '/reports', icon: ChartPie },
	{ label: 'Users', href: '/users', icon: User },
];

export const bottomMenuLinks = [
	{ label: 'Support', href: '/support', icon: LifeBuoy },
	{ label: 'Setting', href: '/settings', icon: Settings },
];
