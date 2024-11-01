import { Tabs } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons"; // Import Ionicons for tab icons
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

export default function TabsLayout() {
	const router = useRouter();
	const { logout, user } = useAuth();
	const { showToast } = useToast();

	const pingAnim = useRef(new Animated.Value(1)).current;

	// Ping animation setup
	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(pingAnim, {
					toValue: 2,
					duration: 800,
					useNativeDriver: true,
				}),
				Animated.timing(pingAnim, {
					toValue: 1,
					duration: 800,
					useNativeDriver: true,
				}),
			])
		).start();
	}, [pingAnim]);

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
				//tabBarLabel: () => null, // Hide label for More tab
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
							style={{ marginRight: 18 }}
							onPress={() => router.push("/notifications")}
						>
							<View style={{ position: "relative" }}>
								<Ionicons name="notifications" size={18} color="slategray" />

								{/* Ping Badge */}
								<View style={{ position: "absolute", top: -4, right: -4 }}>
									<Animated.View
										style={{
											position: "absolute",
											width: 10,
											height: 10,
											borderRadius: 999,
											backgroundColor: "rgba(56, 178, 172, 0.5)", // Teal color with transparency
											transform: [{ scale: pingAnim }],
											opacity: pingAnim.interpolate({
												inputRange: [1, 2],
												outputRange: [1, 0],
											}),
										}}
									/>
									<View
										style={{
											width: 10,
											height: 10,
											borderRadius: 999,
											backgroundColor: "teal",
										}}
									/>
								</View>
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
							name={focused ? "cash" : "cash-outline"}
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

			{/* More Tab */}
			<Tabs.Screen
				name="more"
				options={{
					title: "More",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={
								focused
									? "ellipsis-horizontal-circle-sharp"
									: "ellipsis-horizontal-circle"
							}
							color={color}
							size={24}
						/>
					),
					headerTitle: "More Options",
					headerShown: true,
				}}
			/>
		</Tabs>
	);
}
