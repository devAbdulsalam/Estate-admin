import * as React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function AvatarGroup({
	children,
	className,
	...props
}: AvatarGroupProps) {
	const avatars = React.Children.toArray(children);

	return (
		<div className={cn('flex -space-x-2', className)} {...props}>
			{avatars.map((avatar, index) => (
				<div key={index} className="relative">
					{avatar}
				</div>
			))}
		</div>
	);
}
