import React, {
	createContext,
	useState,
	useEffect,
	useMemo,
	useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

// Create AuthContext
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null); // Initialize user state
	const [loading, setLoading] = useState(true); // Loading state

	// Authentication status derived from user state
	const authStatus = useMemo(
		() => ({
			isAuthenticated: !!user, // true if user exists
			isLoggedIn: !!user, // alias for isAuthenticated
			email: user?.email || null, // return email or null if not logged in
		}),
		[user]
	);

	// Check if a user is stored on mount and set loading state accordingly
	useEffect(() => {
		const checkUser = async () => {
			try {
				const storedUser = await AsyncStorage.getItem("user");
				if (storedUser) {
					setUser(JSON.parse(storedUser));
				}
			} catch (error) {
				console.error("Error loading user data from storage:", error);
			} finally {
				setLoading(false);
			}
		};
		checkUser();
	}, []);

	// Login function to set user and store in AsyncStorage
	const login = async (userData) => {
		try {
			setUser(userData);
			await AsyncStorage.setItem("user", JSON.stringify(userData));
		} catch (error) {
			console.error("Error saving user data:", error);
		}
	};

	// Logout function to clear user data
	const logout = async () => {
		try {
			setUser(null);
			await AsyncStorage.removeItem("user");
		} catch (error) {
			console.error("Error clearing user data:", error);
		}
	};

	// Memoize context value to avoid unnecessary re-renders
	const authContextValue = useMemo(
		() => ({
			user: {
				email: authStatus.email,
				isAuthenticated: authStatus.isAuthenticated,
				isLoggedIn: authStatus.isLoggedIn,
			},
			login,
			logout,
			loading,
		}),
		[authStatus, loading] // Only depend on user, authStatus, and loading
	);

	// Spinner component when loading is true
	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#00ff00" />
			</View>
		);
	}

	// Render the context provider with the memoized value
	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
