import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Index from './pages/Index';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AdminDashboard from './pages/admin/Dashboard';
import Notifications from './pages/admin/Notifications';
import Hoas from './pages/admin/Hoas';
import HoaDetails from './pages/admin/HoaDetails';
import Reports from './pages/admin/Reports';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './pages/admin/Layout';
import NotFound from './NotFound';
import Support from './pages/admin/Support';
import Settings from './pages/admin/Settings';
import Payments from './pages/admin/Payments';
import Payment from './pages/admin/Payment';
import Users from './pages/admin/Users';
import UserDetails from './pages/admin/UserDetails';
import Invoices from './pages/admin/Invoices';
import Issues from './pages/admin/Issues';
import IssueDetails from './pages/admin/IssueDetails';
import Commission from './pages/admin/Commission';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<AuthProvider>
				<TooltipProvider>
					<Toaster />
					<Sonner />
					<Routes>
						<Route path="/" element={<Index />} />
						{/* <Route path="/home" element={<Home />} /> */}
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/reset-password" element={<ResetPassword />} />
						<Route path="/" element={<ProtectedRoute />}>
							<Route path="/" element={<DashboardLayout />}>
								<Route path="/dashboard" element={<AdminDashboard />} />
								<Route path="/users" element={<Users />} />
								<Route path="/commission" element={<Commission />} />
								<Route path="/users/:id" element={<UserDetails />} />
								<Route path="/hoas" element={<Hoas />} />
								<Route path="/hoas/:id" element={<HoaDetails />} />
								<Route path="/payments" element={<Payments />} />
								<Route path="/payments/:id" element={<Payment />} />
								<Route path="/invoices" element={<Invoices />} />
								<Route path="/issues" element={<Issues />} />
								<Route path="/issues/:id" element={<IssueDetails />} />
								<Route path="/reports" element={<Reports />} />
								<Route path="/notifications" element={<Notifications />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="/support" element={<Support />} />
							</Route>
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</TooltipProvider>
			</AuthProvider>
		</BrowserRouter>
	</QueryClientProvider>
);

export default App;
