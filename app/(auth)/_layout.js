// app/(auth)/_layout.js

import { Stack } from "expo-router";
import { Alert, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { commonScreenOptions } from "../../utils/navigationOptions";

export default function AuthLayout() {
	const router = useRouter();

	const handleBackPress = () => {
		Alert.alert("Back pressed!", "Navigating to the previous screen.");
		router.back();
	};

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Welcome to Sayswitch",
					headerShown: false,
					headerTitleAlign: "center", // Center the title
					gestureEnabled: true,
					gestureDirection: "horizontal",
                    headerStyle: {
                        backgroundColor: '#fff', // Set the header background color
                      },
				}}
			/>

			<Stack.Screen
				name="login"
				options={commonScreenOptions({
					title: "Login",
					headerRight: () => (
						<Pressable
							onPress={() => router.push("signup")}
							className="rounded-full border border-primary bg-secondary p-2"
						>
							<Ionicons
								name="person-add-outline" // New rounded icon for sign up
								size={16}
								color="green"
							/>
						</Pressable>
					),
				})}
			/>

			<Stack.Screen
				name="onboarding"
				options={commonScreenOptions({
					title: "Onboarding",
					headerRight: () => (
						<Pressable
							onPress={() => router.push("signup")}
							className="rounded-full border border-gray-500 p-2"
						>
							<Ionicons
								name="chevron-forward-outline" // Ionicon for skip
								size={16}
								color="#000"
								onPress={() => router.push("signup")}
							/>
						</Pressable>
					),
				})}
			/>
			<Stack.Screen
				name="signup"
				options={commonScreenOptions({
					title: "Sign Up",
					headerRight: () => (
						<Pressable
							onPress={() => router.push("login")}
							className="rounded-full border border-primary p-2 bg-secondary"
						>
							<AntDesign
								name="login" // Ionicon for login
								size={16}
								color="green"
							/>
						</Pressable>
					),
				})}
			/>
		</Stack>
	);
}
