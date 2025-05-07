import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { format } from 'date-fns';

const InvoiceModal = ({
	isModal,
	setIsModal,
	handelClick,
	data,
}: {
	isModal: boolean;
	setIsModal: (isModal: boolean) => void;
	handelClick: () => void;
	data: any;
}) => {
	console.log('data dadkl;lklkl,', data);
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
											<h4 className="text-lg mb-1">Invoice info</h4>
										</div>

										<div className="pt-[10px] md:flex justify-between gap-2">
											<div className="pt-3 text-sm">
												<p className="">
													<span className="font-semibold mb-1">Amount: </span>
													{data?.user?.name}
												</p>
												<p className="">
													<span className="font-semibold mb-1">Date: </span>
													{format(data?.date || new Date(), 'MM/dd/yyyy')}
												</p>
												<p className="">
													<span className="font-semibold mb-1">Status: </span>
													<span
														className={`p-1 px-2 rounded-md capitalize text-xs ${
															data?.status === 'paid'
																? 'bg-green-100 text-green-800'
																: data?.status === 'pending'
																? 'bg-red-50 text-red-500'
																: 'bg-gray-100 text-gray-800'
														}`}
													>
														{data?.status}
													</span>
												</p>
											</div>
											<div className="">
												<h4 className="text-lg font-bold">Due Info</h4>
												<div className="text-sm">
													<p className="">
														<span className="mb-1 font-semibold">
															Due Name:{' '}
														</span>
														{data?.user?.name}
													</p>
													<p className="">
														<span className="mb-1 font-semibold">Date: </span>
														{format(data?.date || new Date(), 'MM/dd/yyyy')}
													</p>
													<p className="">
														<span className="mb-1 font-semibold">Status: </span>
														{data?.status}
													</p>
												</div>
											</div>
										</div>
										<div className="pt-[10px] md:flex justify-between gap-2">
											<div className="pt-[10px]">
												<h4 className="text-lg font-bold">User Info</h4>
												<div className="pt-[10px] flex justify-between gap-2">
													<img
														src={data?.user?.profileImage?.url}
														alt={data?.user?.name}
														className="size-6"
													/>
													<p className="mt-3 text-sm">
														<span className="mb-1">Name: </span>
														{data?.user?.name}
													</p>
												</div>
												<h4 className="text-lg font-bold mb-1">Hoa Info</h4>
												<div className="text-sm">
													<p className="">
														<span className="font-semibold mb-1">
															Hoa Name:{' '}
														</span>
														{data?.user?.name}
													</p>
													<p className="">
														<span className="font-semibold mb-1">
															Admin Email:{' '}
														</span>
														{data?.user?.name}
													</p>
												</div>
											</div>
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

export default InvoiceModal;
