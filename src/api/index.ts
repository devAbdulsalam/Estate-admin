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

export const fetchPayments = async (token: string) => {
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
