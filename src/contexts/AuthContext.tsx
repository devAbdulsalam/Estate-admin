import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextType {
	isAuthenticated: boolean;
	user: any | null;
	login: (tokens: AuthTokens, userData: any) => void;
	logout: () => void;
	tokens: AuthTokens | null;
	notifications: any;
	setNotifications: (notifications: any) => void;
}

interface AuthTokens {
	token: string;
	refreshToken: string;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AUTH_STORAGE_KEY = 'auth_tokens';
const USER_STORAGE_KEY = 'user_data';
const ACCESS_TOKEN_EXPIRES_TIME = 14000 * 60 * 1000; // 14 minutes
const apiUrl = import.meta.env.VITE_API_URL;

// Helper functions for token management
const getStoredTokens = (): AuthTokens | null => {
	const stored = localStorage.getItem(AUTH_STORAGE_KEY);
	return stored ? JSON.parse(stored) : null;
};

const getStoredUser = (): any | null => {
	const stored = localStorage.getItem(USER_STORAGE_KEY);
	return stored ? JSON.parse(stored) : null;
};

const storeTokens = (tokens: AuthTokens) => {
	localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
};

const storeUser = (user: any) => {
	localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

const clearStorage = () => {
	localStorage.removeItem(AUTH_STORAGE_KEY);
	localStorage.removeItem(USER_STORAGE_KEY);
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [notifications, setNotifications] = useState<any | null>([
		{ name: 'notifications', type: 'Payment alert' },
	]);
	const [user, setUser] = useState<any | null>(() => getStoredUser());
	const [tokens, setTokens] = useState<AuthTokens | null>(() =>
		getStoredTokens()
	);
	const [isFirstMount, setIsFirstMount] = useState(true);
	const navigate = useNavigate();

	const updateTokens = (newTokens: AuthTokens) => {
		setTokens(newTokens);
		storeTokens(newTokens);
	};

	const login = (tokens: AuthTokens, userData: any) => {
		setTokens(tokens);
		setUser(userData);
		storeTokens(tokens);
		storeUser(userData);
		navigate('/dashboard');
	};

	const logout = () => {
		setTokens(null);
		setUser(null);
		clearStorage();
		navigate('/login');
	};

	const refreshToken = async () => {
		if (!tokens?.refreshToken) return;

		try {
			const response = await axios.post(`${apiUrl}/auth/refresh-token`, {
				refreshToken: tokens.refreshToken,
			});
			if (response.status === 200 && response.data.accessToken) {
				updateTokens({
					token: response.data.accessToken,
					refreshToken: tokens.refreshToken, // Keep existing refresh token
				});
			} else {
				logout();
			}
		} catch (error) {
			console.error('Token refresh failed:', error);
			logout();
		}
	};

	useEffect(() => {
		if (tokens) {
			// Initial token refresh
			if (isFirstMount) {
				refreshToken();
				setIsFirstMount(false);
			}

			// Set up periodic token refresh
			const intervalId = setInterval(refreshToken, ACCESS_TOKEN_EXPIRES_TIME);
			return () => clearInterval(intervalId);
		}
	}, [tokens, isFirstMount]);

	// Set up axios interceptor for token
	useEffect(() => {
		const interceptor = axios.interceptors.request.use(
			(config) => {
				if (tokens?.token) {
					config.headers.Authorization = `Bearer ${tokens.token}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		return () => {
			axios.interceptors.request.eject(interceptor);
		};
	}, [tokens]);

	const value = useMemo(
		() => ({
			isAuthenticated: !!tokens,
			user,
			login,
			logout,
			tokens,
			notifications,
			setNotifications,
		}),
		[tokens, user]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
