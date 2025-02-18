import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';

const LogoutModal = ({
	isModal,
	setIsModal,
	handelLogOut,
}: {
	isModal: boolean;
	setIsModal: (isModal: boolean) => void;
	handelLogOut: () => void;
}) => {
	return (
		<Transition appear show={isModal} as={Fragment}>
			<Dialog as="div" className="relative" onClose={() => setIsModal(false)}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/70 bg-opacity-25 z-50" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto flex place-content-center z-50">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md md:max-w-lg transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all font-josefin">
								<div className="flex justify-between px-5 pt-4">
									<div>
										<p className="font-light text-primary"></p>
									</div>
									<button
										onClick={() => setIsModal(false)}
										className=" shadow rounded-full bg-red-100 hover:bg-red-300 duration-150 ease-in-out"
									>
										<X className="p-1 text-xl text-red-300 hover:text-red-500" />
									</button>
								</div>
								<div className="container mx-auto my-auto flex items-center justify-center">
									<div className="w-[500px] mx-auto my-auto  pt-[20px] pb-[20px] px-[20px]">
										<div className="text-center">
											<h4 className="text-[24px] mb-1">Log out</h4>
											<p className="mt-3 text-lg md:text-xl">
												Are you sure you want to log out?
											</p>
										</div>
										<div className="pt-[10px]">
											<button
												className="bg-red-400 hover:bg-red-600 text-white h-10 w-full flex items-center justify-center rounded-md"
												onClick={handelLogOut}
											>
												<span className="text-lg">Log out</span>
											</button>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default LogoutModal;
