import React, { Fragment, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Menu, Transition } from '@headlessui/react';
const userImage = 'https://xsgames.co/randomusers/assets/avatars/male/64.jpg';

function Header({
	sideMenu,
	setSideMenu,
	setIsLogoutModal,
}: {
	sideMenu: boolean;
	setSideMenu: (isModal: boolean) => void;
	setIsLogoutModal: () => void;
}) {
	const { user, notifications } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const [searchOverlay, setSearchOverlay] = useState(false);
	return (
		<header className="relative z-10 bg-white border-b border-gray border-solid py-5 px-4 md:px-8 md:pr-8 w-full">
			<div className="flex justify-between">
				<div className="flex items-center space-x-6 lg:space-x-0">
					<button
						type="button"
						className="block lg:hidden text-2xl text-black"
						onClick={() => setSideMenu(!sideMenu)}
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
					<div className="hidden md:block relative w-96">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<Input
							placeholder="Search by name, associations, admins..."
							className="pl-10 bg-white"
						/>
					</div>
				</div>

				<div className="flex items-center justify-end space-x-3 md:space-x-6">
					<div className="relative">
						<Menu as="div" className="relative inline-block text-left ">
							<div>
								<Menu.Button
									disabled={!notifications}
									className="relative w-[40px] h-[40px] leading-[40px] rounded-md text-gray border border-gray hover:bg-themeLight hover:text-theme hover:border-themeLight"
								>
									<div className="flex justify-center">
										<Bell className="h-5 w-5" />
									</div>
									{notifications?.length && (
										<span className="w-[20px] h-[20px] inline-block bg-red-500 rounded-full absolute -top-[4px] -right-[4px] border-[2px] border-white text-xs leading-[18px] font-medium text-white">
											{notifications?.length}
										</span>
									)}
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute w-[280px] sm:w-[350px] h-[285px] overflow-y-scroll overflow-item top-full -right-[60px] sm:right-0 shadow-lg rounded-md bg-white py-5 px-5">
									{notifications?.length > 0 &&
										notifications?.map((notification, index) => {
											console.log('header notification', notification);
											return (
												<div
													key={index}
													className="flex items-center justify-between last:border-0 border-b border-gray pb-4 mb-4 last:pb-0 last:mb-0"
												>
													<div className="flex items-center space-x-3">
														<div className="">
															<img
																className="w-[40px] h-[40px] rounded-md"
																src="assets/img/product/prodcut-1.jpg"
																alt="img"
															/>
														</div>
														<div className="">
															<h5 className="text-base mb-0 leading-none">
																Green shirt for women
															</h5>
															<span className="text-tiny leading-none">
																Jan 21, 2023 08:30 AM
															</span>
														</div>
													</div>
													<div className="">
														<button className="hover:text-danger">
															<svg
																className="-translate-y-[3px]"
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 24 24"
																width="16"
																height="16"
															>
																<path
																	fill="currentColor"
																	d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"
																/>
															</svg>
														</button>
													</div>
												</div>
											);
										})}
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
					<div className="relative w-[70%] flex justify-end items-center">
						<Menu as="div" className="relative inline-block text-left ">
							<div>
								<Menu.Button
									className="relative"
									type="button"
									onClick={() => setIsOpen(!isOpen)}
								>
									<div className="flex items-center md:gap-2">
										<div className="relative">
											<Avatar>
												<AvatarImage
													className="w-10 h-10"
													src="https://xsgames.co/randomusers/assets/avatars/male/6.jpg"
												/>
												<AvatarFallback>NA</AvatarFallback>
											</Avatar>{' '}
											<span className="w-[12px] h-[12px] inline-block bg-green-500 rounded-full absolute -top-[4px] -right-[4px] border-[2px] border-white"></span>
										</div>
										<div className="hidden md:block">
											<p className="text-left font-medium capitalize">
												{user?.name || 'Noami Adams'}
											</p>
											<p className="text-sm text-gray-500">
												{user?.email || 'naomi@gmail.com'}
											</p>
										</div>
										<div className="p-2">
											{isOpen ? (
												<ChevronUp className="h-5 w-5" />
											) : (
												<ChevronDown className="h-5 w-5" />
											)}
										</div>
									</div>
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute w-[280px] top-full right-0 shadow-lg rounded-md bg-white py-5 px-5 z-10">
									<div className="flex items-center space-x-3 border-b border-gray pb-3 mb-2">
										<Link to={'./settings'} className="">
											<img
												className="w-[50px] h-[50px] rounded-md"
												src={user?.image?.url || userImage}
												alt={user?.name}
											/>
										</Link>
										<div className="">
											<h5 className="text-base mb-1 leading-none">
												{user?.name}
											</h5>
											<p className="mb-0 text-tiny leading-none">
												{user?.email}
											</p>
										</div>
									</div>
									<ul>
										<li>
											<Link
												to={'./'}
												className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
											>
												Dashboard
											</Link>
										</li>
										<li>
											<Link
												to={'./settings'}
												className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
											>
												Account Settings
											</Link>
										</li>
										<li>
											<button
												onClick={setIsLogoutModal}
												className="text-left px-5 py-2 w-full block bg-red-300 hover:bg-red-400 rounded-md hover:text-theme text-base"
											>
												Logout
											</button>
										</li>
									</ul>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>
			</div>

			{/* <!-- search --> */}
			<div
				className={`fixed top-0 left-0 w-full bg-white p-10 z-50 transition-transform duration-300 md:hidden flex" ${
					searchOverlay
						? 'translate-y-[0px]'
						: ' -translate-y-[230px] lg:translate-y-[0]'
				}`}
			>
				<div className="relative mb-3">
					<Search />
				</div>
				<div className="">
					<span className="text-tiny mr-2">Keywords :</span>
					<Link
						to={'#'}
						className="inline-block px-3 py-1 border border-gray6 text-tiny leading-none rounded-[4px] hover:text-white hover:bg-theme hover:border-theme"
					>
						Customer
					</Link>
					<Link
						to={'#'}
						className="inline-block px-3 py-1 border border-gray6 text-tiny leading-none rounded-[4px] hover:text-white hover:bg-theme hover:border-theme"
					>
						Product
					</Link>
					<Link
						to={'#'}
						className="inline-block px-3 py-1 border border-gray6 text-tiny leading-none rounded-[4px] hover:text-white hover:bg-theme hover:border-theme"
					>
						Orders
					</Link>
				</div>
			</div>
			<div
				className={`fixed top-0 left-0 w-full h-full z-40 bg-black/70 transition-all duration-300" 
                    ${
											searchOverlay
												? 'visible opacity-1'
												: '  invisible opacity-0 '
										}`}
				onClick={() => setSearchOverlay(!searchOverlay)}
			></div>
		</header>
	);
}

export default Header;
