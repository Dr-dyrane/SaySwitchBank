// app/(stacks)/_layout.js

import { Stack } from "expo-router";
import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for navigation

// Define common stack options
const commonStackOptions = {
	headerStyle: { backgroundColor: "#fff" }, // Header background color
	headerTitleAlign: "left", // Center the title on all screens
	gestureEnabled: true, // Enable gestures for swiping between tabs
	gestureDirection: "horizontal", // Swipe gesture direction
	headerTitleStyle: {
		fontWeight: "bold", // Bold font for the title
		fontSize: 18, // Adjust the size if needed
	},
	headerShadowVisible: false, // Hide the shadow under the header
};

export default function StacksLayout() {
	const router = useRouter(); // Initialize the router for navigation

	return (
		<Stack>
			<Stack.Screen
				name="payout" // The only screen in this stack
				options={{
					title: "Withdraw Funds", // Title for the payout screen
					headerShown: true, // Show the header
					headerRight: () => (
						<Pressable
							onPress={() => router.push("transactions")} // Navigate to transactions
							style={{ marginRight: 0 }} // Optional styling for spacing
						>
							<Text style={{ color: "#008773", fontSize: 16 }}>History</Text>
							{/* Title for the button */}
						</Pressable>
					),
					...commonStackOptions,
				}}
			/>
			<Stack.Screen
				name="transDetails"
				options={{
					title: "Transaction Details",
					headerShown: false,
					...commonStackOptions,
				}}
			/>
		</Stack>
	);
}