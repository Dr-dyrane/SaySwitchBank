import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for tab icons
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function TabsLayout() {
	const router = useRouter();
	const { logout, user } = useAuth();
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "green", // Active tab color
				tabBarInactiveTintColor: "gray", // Inactive tab color
				tabBarStyle: { backgroundColor: "#fff" }, // Tab bar background color
				headerStyle: { backgroundColor: "#fff" }, // Header background color
				headerTitleAlign: "center", // Center the title on all screens
				gestureEnabled: true, // Enable gestures for swiping between tabs
				gestureDirection: "horizontal", // Swipe gesture direction
			}}
		>
			{/* Home Tab */}
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home-outline" color={color} size={24} />
					), // Add Ionicons for Home tab
					headerShown: true,
					headerTitle: () => null,
					headerLeft: () => (
						<View
							style={{ marginLeft: 16 }}
							className="flex flex-row items-center justify-between space-x-4"
						>
							{/* User Profile Picture */}
							<Image
								source={require("../../assets/profile.jpg")} // User profile icon
								style={{
									width: 32,
									height: 32,
									borderRadius: 20, // Rounded profile picture
									borderWidth: 2,
									borderColor: "#ccc",
								}}
							/>
							<Text
								style={{
									fontWeight: "bold",
									fontSize: 16,
								}}
							>
								Hi {user.username}
							</Text>
						</View>
					),
					headerRight: () => (
						<TouchableOpacity
							style={{ marginRight: 16 }}
							onPress={() => {
								logout();
								router.replace("/(auth)"); // Redirect to the auth stack (login/signup screen)
							}}
						>
							{/* Logo with text */}
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Text
									style={{ fontWeight: "bold", fontSize: 16 }}
									className="text-red-500"
								>
									logout
								</Text>
							</View>
						</TouchableOpacity>
					),
				}}
			/>

			{/* Transactions Tab */}
			<Tabs.Screen
				name="transactions"
				options={{
					title: "Transactions",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="wallet-outline" color={color} size={24} />
					), // Add Ionicons for Transactions tab
					headerShown: true,
				}}
			/>

			{/* Profile Tab */}
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-outline" color={color} size={24} />
					), // Add Ionicons for Profile tab
					headerShown: true,
				}}
			/>
		</Tabs>
	);
}
