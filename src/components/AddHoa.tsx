/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import getError from '@/hooks/getError';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@/components/ui/button';
import Modal from './Modal';
import { useAuth } from '@/contexts/AuthContext';

const AddExpense = ({ show, setShow, setLoading, loading }) => {
	const { user, tokens } = useAuth();
	const apiUrl = import.meta.env.VITE_API_URL;
	const config = {
		headers: {
			Authorization: `Bearer ${tokens?.token}`,
		},
	};
	const queryClient = useQueryClient();
	const [name, setName] = useState('');
	const [adminName, setAdminName] = useState('');
	const [adminEmail, setAdminEmail] = useState('');
	const [totalMembers, setTotalMembers] = useState(0);
	const [logo, setLogo] = useState('');

	const handleAddExpense = () => {
		if (!name.trim()) {
			return toast.error('Hoa name is required!');
		}
		if (!adminEmail.trim()) {
			return toast.error('Admin email is required!');
		}
		if (!adminName.trim()) {
			return toast.error('Admin name is required!');
		}
		setLoading(true);
		setShow(false);

		const data = {
			name,
			totalMembers,
			userId: user._id,
			totalMembers,
			AdminName,
			AdminEmail,
			logo,
		};
		try {
			axios
				.post(`${apiUrl}/admin/new-hoa`, data, config)
				.then((res) => {
					if (res.data) {
						toast.success('Hoa added successfully');
					}
					console.log(res.data);
					queryClient.invalidateQueries({ querykey: [`hoas`, 'dashboard'] });
					setName('');
					setTotalMembers(0);
					setLogo('');
					setAdminName('');
				})
				.catch((error) => {
					const message = getError(error);
					toast.error(message);
					setShow(true);
				})
				.finally(() => {
					setLoading(false);
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Modal show={show}>
			<div className="transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all font-josefin">
				<div className="space-y-2 p-4 px-6">
					<div className="flex justify-between items-center ">
						<div>
							<h2 className="mt-3 font-semibold text-lg md:text-xl text-primary">
								Add New Hoa
							</h2>
						</div>
						<button
							onClick={() => setShow(false)}
							className="m-1 p-2 py-1 shadow rounded-full hover:bg-red-300 duration-150 ease-in-out"
						>
							<i className="fa-solid fa-xmark text-xl text-red-300 hover:text-red-500" />
						</button>
					</div>
					<div className="">
						<div className="md:flex gap-4 p-2 ">
							<div className="mb-5">
								<label
									id="hoa_name"
									htmlFor="hoa_name"
									className="mb-0 text-base text-black"
								>
									Name<span className="text-red">*</span>
								</label>
								<input
									className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
									id="hoa_name"
									name="hoa_name"
									type="text"
									placeholder="hoa name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<span className="text-tiny leading-4">Set the Hoa Name.</span>
							</div>

							<div className="mb-1">
								<label className="text-black">AdminName</label>
								<input
									value={adminName}
									onChange={(e) => setAdminName(e.target.value)}
									className="input py-4 rounded-md h-[200px] resize-none w-full border border-gray6  text-black"
								/>
								<span className="text-tiny leading-4">
									Add the expense AdminName.
								</span>
							</div>

							<div className="mb-1">
								<label className="text-black">AdminName</label>
								<input
									value={adminEmail}
									onChange={(e) => setAdminEmail(e.target.value)}
									className="input py-4 rounded-md h-[200px] resize-none w-full border border-gray6  text-black"
								/>
								<span className="text-tiny leading-4">
									Add the Admin Email.
								</span>
							</div>
							{/* <!-- input --> */}
							<div className="mb-5">
								<label className="mb-0 text-base text-black">
									total Members <span className="text-red">*</span>
								</label>
								<input
									className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
									type="number"
									placeholder="totalMembers"
									value={totalMembers}
									onChange={(e) => set / totalMembers(e.target.value)}
								/>
								<span className="text-tiny leading-4">
									Set the totalMembers.
								</span>
							</div>
						</div>
						<div className="md:flex gap-4 p-2 w-full">
							{/* <!-- input --> */}
							<div className="mb-5 w-full">
								<p className="mb-0 text-base text-black">Upload logo</p>
								<input
									className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
									type="file"
									placeholder="add your logo file"
									value={logo}
									onChange={(e) => setLogo(e.target.value)}
								/>
								<span className="text-tiny leading-4">
									Add the expense type.
								</span>
							</div>
						</div>
					</div>
					<div className="product-add-btn flex justify-center pb-1">
						<Button
							onClick={handleAddExpense}
							className="w-full"
							type="button"
							disabled={loading}
						>
							{loading ? 'Loading..' : 'Add Hoa'}
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default AddExpense;
