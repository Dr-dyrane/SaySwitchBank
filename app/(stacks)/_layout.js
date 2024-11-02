import { Stack } from "expo-router";

export default function StacksLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="payout" // The only screen in this stack
				options={{
					title: "Payouts", // Title for the payout screen
					headerShown: true, // Show the header
				}}
			/>
		</Stack>
	);
}
