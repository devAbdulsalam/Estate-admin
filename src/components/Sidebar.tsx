import React, { useEffect, useState } from 'react';
import { LogOut, Bell } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { topMenuLinks, bottomMenuLinks } from '@/data';
import { useAuth } from '@/contexts/AuthContext';
const Sidebar = ({
	sideMenu,
	setSideMenu,
	setIsLogoutModal,
}: {
	sideMenu: boolean;
	setSideMenu: (isModal: boolean) => void;
	setIsLogoutModal: () => void;
}) => {
	const navigate = useNavigate();
	const [nav, setNav] = useState<string | null>('/dashboard');
	const { notifications } = useAuth();
	const [isMobile, setIsMobile] = useState(false);
	const handleNav = (link: string) => {
		// console.log('handelLogOutModal link', link);
		if (nav == null) {
			return setNav(null);
		}
		return setNav(link);
	};
	const handelLogOutModal = () => {
		console.log('handelLogOutModal');
		// handle log out modal
	};
	const handleSideBar = () => {
		console.log('handleSideBar');
		// handle log out modal
		if (!isMobile) {
			return;
		}
		setSideMenu(!sideMenu);
	};

	console.log('side notifications', notifications);
	const handleResize = () => {
		const screenWidth = window.innerWidth;
		setIsMobile(screenWidth <= 1024); // Set a threshold for tablet screen size (e.g., 1024 pixels)
		// setIsMobile(screenWidth <= 768); // Set a threshold for mobile screen size (e.g., 768 pixels)
	};
	useEffect(() => {
		// Initial check on component mount
		handleResize();

		// Add event listener to check on window resize
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<aside
			className={`w-[300px] lg:w-[250px] xl:w-[300px] border-r border-gray overflow-y-none sidebar-scrollbar fixed left-0 top-0 h-full bg-white z-50 transition-transform duration-300 ${
				sideMenu
					? 'translate-x-[0px]'
					: ' -translate-x-[300px] lg:translate-x-[0]'
			}`}
		>
			<div className="h-full flex flex-col">
				<div className="py-4 pb-8 px-8 border-b border-gray h-[78px] w-full flex justify-between items-center">
					<NavLink to={'/'} className="w-[140px] flex items-center">
						<img className="mx-auto" src={logo} alt="" />
					</NavLink>
					<button
						type="button"
						className="block lg:hidden text-2xl text-black debug"
						onClick={handleSideBar}
					>
						<svg
							width="20"
							height="12"
							viewBox="0 0 20 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 1H19"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M1 6H19"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M1 11H19"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</div>
				<div className="px-4 py-5 flex-1 flex flex-col">
					<ul className="flex-1">
						{topMenuLinks.map((item, index) => (
							<li key={index} onClick={handleSideBar}>
								<NavLink
									to={item.href}
									onClick={() => handleNav(item.href)}
									className={`${
										nav == item.href
											? 'bg-primary hover:bg-primary-foreground text-white'
											: ''
									} group rounded-md relative text-black text-lg  font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-4 py-[9px] mb-2 hover:bg-gray-100 sidebar-NavLink-active`}
								>
									<item.icon className="inline-block  mr-[10px] text-lg" />
									{item.label}
								</NavLink>
							</li>
						))}
						<li onClick={handleSideBar}>
							<NavLink
								to={'/notifications'}
								onClick={() => handleNav('/notifications')}
								className={`${
									nav == '/notifications'
										? 'bg-primary hover:bg-primary-foreground text-primary-foreground hover:text-primary'
										: ''
								} group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 pl-4 py-[9px] mb-2 hover:bg-gray-100 sidebar-NavLink-active`}
							>
								<div className="flex items-center">
									<Bell className="inline-block  mr-[10px] text-lg" />
									Notifications
								</div>
								{notifications?.length > 0 && (
									<span className="p-2 w-6 h-6 flex items-center justify-center text-sm bg-black rounded-full text-white ml-5">
										{notifications.length}
									</span>
								)}
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="px-4 py-5 border-t border-gray pt-3 mt-3">
					<ul className="flex-1">
						{bottomMenuLinks.map((item, index) => (
							<li key={index} onClick={handleSideBar}>
								<NavLink
									to={item.href}
									onClick={() => handleNav(null)}
									className={`${
										nav == item.href
											? 'bg-primary hover:bg-primary-foreground text-theme'
											: ''
									} group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-4 py-[9px] mb-2 hover:bg-gray-100 sidebar-NavLink-active`}
								>
									<item.icon className="inline-block  mr-[10px] text-lg" />
									{item.label}
								</NavLink>
							</li>
						))}
					</ul>
					<button
						onClick={setIsLogoutModal}
						className="group rounded-md bg-red-200 hover:bg-red-300 relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-3 sidebar-NavLink-active"
					>
						<span className="inline-block translate-y-[1px] mr-[10px] text-xl">
							<LogOut />
						</span>
						Logout
					</button>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
