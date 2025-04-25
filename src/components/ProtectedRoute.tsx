import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = () => {
	const { user } = useAuth();
	const location = useLocation();
	if (user) {
		return <Outlet />;
	}
	return <Navigate to="/login" state={{ path: location.pathname }} replace />;
};

export default ProtectedRoute;
