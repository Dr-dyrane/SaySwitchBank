import React, {
	createContext,
	useState,
	useEffect,
	useMemo,
	useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null); // Initialize user as null
	const [loading, setLoading] = useState(true);

	// Define the authentication object derived from the user state
	const authStatus = {
		isAuthenticated: !!user, // true if user is not null
		isLoggedIn: !!user, // true if user is not null
		email: user ? user.email : null, // user email, or null if not authenticated
	};

	useEffect(() => {
		const checkUser = async () => {
			try {
				const storedUser = await AsyncStorage.getItem("user");
				if (storedUser) {
					setUser(JSON.parse(storedUser));
				}
			} catch (error) {
				console.error("Failed to load user from storage:", error);
			} finally {
				setLoading(false);
			}
		};
		checkUser();
	}, []);

	const login = async (userData) => {
		setUser(userData);
		await AsyncStorage.setItem("user", JSON.stringify(userData));
	};

	const logout = async () => {
		setUser(null); // Set user to null on logout
		await AsyncStorage.removeItem("user");
	};

	// Memoize the context value to prevent unnecessary re-renders
	const value = useMemo(
		() => ({
			user: {
				email: authStatus.email, // Only include email in the value
				isAuthenticated: authStatus.isAuthenticated,
				isLoggedIn: authStatus.isLoggedIn,
			},
			loading,
			login,
			logout,
		}),
		[loading, authStatus, user] // Only depend on loading and authStatus
	);

	if (loading) {
		// Render the spinner while loading
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#00ff00" />
			</View>
		);
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
