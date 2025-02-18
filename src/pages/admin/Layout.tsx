import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LogoutModal from '@/components/LogoutModal';
import { useAuth } from '@/contexts/AuthContext';
const DashboardLayout = () => {
	const [sideMenu, setSideMenu] = useState(null);
	const { logout } = useAuth();
	const [isLogoutModal, setIsLogoutModal] = useState(false);
	return (
		<div className="tp-main-wrapper bg-slate-100 h-screen relative">
			<Sidebar
				sideMenu={sideMenu}
				setSideMenu={setSideMenu}
				setIsLogoutModal={() => setIsLogoutModal(true)}
			/>

			<div
				className={`fixed top-0 left-0 w-full h-full z-40 bg-black/70 transition-all duration-300" ${
					sideMenu ? 'visible opacity-1' : '  invisible opacity-0 '
				}`}
				onClick={() => setSideMenu(!sideMenu)}
			></div>

			<div className="tp-main-content lg:ml-[250px] xl:ml-[300px] w-[calc(100% - 300px)]">
				<Header
					sideMenu={sideMenu}
					setSideMenu={setSideMenu}
					setIsLogoutModal={() => setIsLogoutModal(true)}
				/>
				<Outlet />
			</div>
			<LogoutModal
				isModal={isLogoutModal}
				setIsModal={setIsLogoutModal}
				handelLogOut={() => logout()}
			/>
		</div>
	);
};

export default DashboardLayout;
