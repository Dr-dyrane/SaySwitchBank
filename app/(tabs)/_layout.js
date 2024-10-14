import { Tabs } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons"; // Import Ionicons for tab icons
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

export default function TabsLayout() {
	const router = useRouter();
	const { logout, user } = useAuth();
	const { showToast } = useToast();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#008773", // Active tab color
				tabBarInactiveTintColor: "gray", // Inactive tab color
				tabBarStyle: { backgroundColor: "#fff" }, // Tab bar background color
				headerStyle: { backgroundColor: "#fff" }, // Header background color
				headerTitleAlign: "center", // Center the title on all screens
				gestureEnabled: true, // Enable gestures for swiping between tabs
				gestureDirection: "horizontal", // Swipe gesture direction
				headerTitleStyle: {
					fontWeight: "bold", // Bold font for the title
					fontSize: 18, // Adjust the size if needed
				},
				headerShadowVisible: false,
				headerLeft: () => (
					<Ionicons
						name="arrow-back"
						size={24}
						color="black"
						onPress={() => router.back()} // Go back to the previous screen
						style={{ marginLeft: 20 }} // Adjust styling as needed
					/>
				),
			}}
		>
			{/* Home Tab */}
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "home" : "home-outline"}
							color={color}
							size={24}
						/>
					), // Add Ionicons for Home tab
					headerShown: true,
					headerTitle: () => null,
					headerLeft: () => (
						<View
							style={{ marginLeft: 16 }}
							className="flex flex-row items-center justify-between space-x-2"
						>
							{/* User Profile Picture */}
							<Image
								source={
									user.imageUri
										? { uri: user.imageUri }
										: require("../../assets/profile.jpg")
								}
								resizeMode="fit"
								style={{
									width: 32,
									height: 32,
									borderRadius: 20, // Rounded profile picture
									borderWidth: 1,
									borderColor: "#ccc",
								}}
							/>
							<View>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 16,
									}}
								>
									Hi {user.fullName || user.username}
								</Text>
								{/* <Text className="text-sm text-gray-500">{user.email}</Text> */}
							</View>
						</View>
					),
					headerRight: () => (
						<TouchableOpacity
							style={{ marginRight: 16 }}
							onPress={async () => {
								const result = await logout(); // Call the logout function
								if (result.success) {
									// Show success toast if logout is successful
									showToast(result.message, "success");
									router.replace("/(auth)"); // Redirect to the auth stack (login/signup screen)
								} else {
									// Show error toast if logout fails
									showToast(result.message, "error");
								}
							}}
						>
							{/* Logo with text */}
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<AntDesign name="logout" size={14} color="red" />
								<Text
									style={{ fontWeight: "bold", fontSize: 16 }}
									className="text-red-500 ml-2"
								>
									Logout
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
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "wallet" : "wallet-outline"}
							color={color}
							size={24}
						/>
					), // Add Ionicons for Transactions tab
					headerShown: true,
				}}
			/>

			{/* Profile Tab */}
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "person" : "person-outline"}
							color={color}
							size={24}
						/>
					), // Add Ionicons for Profile tab
					headerShown: true,
				}}
			/>
		</Tabs>
	);
}
