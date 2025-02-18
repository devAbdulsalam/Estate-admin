import { House, Building2, ChartPie, LifeBuoy, Settings } from 'lucide-react';

export const avatarImage = 'https://xsgames.co/randomusers/assets/avatars/male/64.jpg';

export const topMenuLinks = [
	{ label: 'Home', href: '/dashboard', icon: House },
	{ label: 'Hoa management', href: '/hoas', icon: Building2 },
	{ label: 'Report', href: '/reports', icon: ChartPie },
];

export const bottomMenuLinks = [
	{ label: 'Support', href: '/support', icon: LifeBuoy },
	{ label: 'Setting', href: '/settings', icon: Settings },
];
