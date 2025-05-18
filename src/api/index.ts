import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
export const fetchIndex = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/index`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchUserDetails = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/users/${id}`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchHoa = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/hoas`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchHoaDetails = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/hoas/${id}`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchEstates = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/estates`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchEstateDetails = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/estates/${id}`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchReports = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/reports/performance`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchNotifications = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/notifications`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};

export const fetchUsers = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/users`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchUser = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/users/${id}`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchPayments = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/payments`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchPayment = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/payments/${id}`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchInvoices = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/invoices`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchIssues = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/reports`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchCommissions = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		// console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/commissions`, config)
			.then((res) => res.data);
		// console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
export const fetchIssueDetails = async (token: string, id: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/admins/reports/${id}`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error: any) {
		console.log(error.message);
		return error;
	}
};
