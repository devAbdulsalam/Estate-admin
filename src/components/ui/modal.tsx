import React from 'react';
import { CloseCircle } from 'iconsax-react';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
// import CreateHoas from './CreateHoas';
const Modal = ({ isOpen, closeModal }: any) => {
	return (
		<Dialog
			transition
			open={isOpen}
			as="div"
			className="relative z-[9999] transition duration-300 ease-out"
			onClose={closeModal}
		>
			<DialogBackdrop className="fixed inset-0 bg-black/30" />
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4">
					<DialogPanel className="w-full max-w-2xl rounded-xl bg-white p-6 backdrop-blur-2xl md:h-[27rem] h-[90%] overflow-y-auto overflow-hidden">
						<div className="flex items-center justify-between mb-4">
							<p className="font-semibold text-2xl">Add HOA</p>
							<button onClick={closeModal}>
								<CloseCircle size="32" color="#000" variant="TwoTone" />
							</button>
						</div>
						{/* <CreateHoas /> */}
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default Modal;
