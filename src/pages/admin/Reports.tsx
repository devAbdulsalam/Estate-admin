import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from 'recharts';
import { MoreHorizontal, TrendingUp, Ellipsis, FileDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchReports } from '@/api';
import toast from 'react-hot-toast';
const Reports = () => {
	const { tokens, setNotifications } = useAuth();
	const [userHoaData, setUserHoaData] = useState([
		{ name: 'LandLord', value: 400 },
		{ name: 'Tenant', value: 3000 },
	]);
	const { data } = useQuery({
		queryKey: ['reports'],
		queryFn: async () => fetchReports(tokens?.token),
	});
	useEffect(() => {
		if (data) {
			if (data?.notifications) {
				setNotifications(data?.notifications);
			}
			setUserHoaData([
				{ name: 'LandLord', value: data.totalLandlords },
				{ name: 'Tenant', value: data.totalTenants },
			]);
		}
	}, [data]);
	// Mock data for the line chart
	const commissionData = [
		{ name: 'Jan', series1: 400, series2: 500, series3: 600 },
		{ name: 'Mar', series1: 450, series2: 520, series3: 620 },
		{ name: 'May', series1: 460, series2: 530, series3: 640 },
		{ name: 'Jul', series1: 470, series2: 540, series3: 630 },
		{ name: 'Sep', series1: 480, series2: 550, series3: 650 },
		{ name: 'Nov', series1: 490, series2: 560, series3: 670 },
		{ name: 'Dec', series1: 500, series2: 570, series3: 680 },
	];
	const COLORS = ['#0675FF', '#D6EEFF'];

	const handelReport = () => {
		// Download the report
		toast.success('Report successfully downloaded');
	};
	return (
		<main className="min-h-screen bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex my-2 p-1">
				<div className="flex-1 w-full"></div>
				<Button onClick={handelReport} className="w-fit" type="button">
					<FileDown /> Download Report
				</Button>
			</div>
			{/* Statistics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card className="py-0">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-500">
							Total Revenue Collected
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between">
							<div className="text-2xl font-bold">₦{data?.totalRevenue}</div>
							<div className="flex bg-green-50 rounded-md items-center gap-2 px-2 py-1">
								<TrendingUp className="h-4 w-4 text-green-500" />
								<div className="text-green-500 text-sm mt-2">+2.5%</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="text-xs bg-gray-200 text-center py-2 text-gray-500 mt-4">
						Last updated on 1st January, 2024
					</CardFooter>
				</Card>
				<Card className="py-0">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-500">
							This month Revenue
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between">
							<div className="text-2xl font-bold">
								₦{data?.currentMonthRevenue}
							</div>
							<div className="flex bg-green-50 rounded-md items-center gap-2 px-2 py-1">
								<TrendingUp className="h-4 w-4 text-green-500" />
								<div className="text-green-500 text-sm mt-2">+2.5%</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="text-xs bg-gray-200 text-center py-2 text-gray-500 mt-4">
						Last updated on 1st January, 2024
					</CardFooter>
				</Card>
				<Card className="py-0">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-500">
							Total Active Users
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between">
							<div className="text-2xl font-bold">{data?.totalUsers}</div>
							<div className="flex bg-green-50 rounded-md items-center gap-2 px-2 py-1">
								<TrendingUp className="h-4 w-4 text-green-500" />
								<div className="text-green-500 text-sm mt-2">+2.5%</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="text-xs bg-gray-200 text-center py-2 text-gray-500 mt-4">
						Last updated on 1st January, 2024
					</CardFooter>
				</Card>
			</div>

			{/* Charts Section */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card className="md:col-span-2">
					<CardHeader>
						<div className="flex justify-between items-center">
							<CardTitle>Commission</CardTitle>
							<Button variant="ghost" size="icon">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</div>
					</CardHeader>
					<CardContent className="w-full overflow-x-scroll">
						<div className="h-[300px] w-[450px] md:w-full">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={commissionData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Line type="monotone" dataKey="series1" stroke="#8884d8" />
									<Line type="monotone" dataKey="series2" stroke="#82ca9d" />
									<Line type="monotone" dataKey="series3" stroke="#ffc658" />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-500">
							Users across HOAs
						</CardTitle>
						<Ellipsis className="h-4 w-4 text-green-500" />
					</CardHeader>
					<CardContent>
						<div className="h-[300px] relative flex items-center flex-row-reverse">
							<div className="absolute top-10">
								{userHoaData.map((item, index) => {
									// Get the color from the COLORS array
									const color = COLORS[index % COLORS.length];

									return (
										<p key={index} className="text-xs text-right">
											{/* Inline style for dynamic background color */}
											<span
												className=" rounded-full w-2 h-2 inline-block"
												style={{ backgroundColor: color }}
											></span>
											<span className="ml-2">{item.name}</span>
										</p>
									);
								})}
							</div>

							<ResponsiveContainer width="100%" height="100%">
								<PieChart width={800} height={400}>
									<Tooltip />
									<Pie
										data={userHoaData}
										cx={120}
										cy={200}
										innerRadius={40}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
									>
										{userHoaData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
									</Pie>
								</PieChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

export default Reports;
