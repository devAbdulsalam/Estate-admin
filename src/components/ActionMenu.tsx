import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { TableCell } from './ui/table';

interface ActionMenuProps {
	editText: string;
	deleteText: string;
	onEdit: () => void;
	onDelete: () => void;
}

const ActionMenuCell: React.FC<ActionMenuProps> = ({
	onEdit,
	onDelete,
	editText,
	deleteText,
}) => {
	return (
		<TableCell className="text-right">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon">
						<MoreVertical size={16} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-32">
					<DropdownMenuItem onClick={onEdit}>
						{editText ? editText : 'Edit'}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={onDelete} className="text-red-600">
						{deleteText ? deleteText : 'Delete'}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	);
};

export default ActionMenuCell;
