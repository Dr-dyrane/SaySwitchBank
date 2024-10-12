import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // Expo Icons
import { useAuth } from "../contexts/AuthContext";
import TransactionCard from "../components/transactions/TransactionCard";
import transactions from "../data/transactions";

// Modular Quick Action Component
const QuickAction = ({
	title,
	iconName,
	iconColor,
	backgroundColor,
	onPress,
}) => (
	<TouchableOpacity
		style={{
			backgroundColor: backgroundColor || "#f0f0f0",
			borderColor: iconColor,
			flex: 1,
			flexDirection: "row",
			padding: 16,
			borderRadius: 10,
			alignItems: "center",
			justifyContent: "between",
			marginBottom: 10,
			marginHorizontal: 5,
		}}
		onPress={onPress}
		className="border-l-4"
	>
		<View
			style={{
				backgroundColor: "#ffffff", // Background for icon
				borderRadius: 30,
				padding: 10,
				marginBottom: 0,
			}}
		>
			<Ionicons name={iconName} size={24} color={iconColor || "#000"} />
		</View>
		<View className="flex-1">
			<Text style={{ fontWeight: "bold", color: "#333", textAlign: "center" }}>
				{title}
			</Text>
		</View>
	</TouchableOpacity>
);

export default function HomeScreen() {
	const { user } = useAuth(); // Use the AuthContext to access user info

	const handleViewDetails = (id) => {
		console.log("Transaction ID: ", id);
		// Add your detail viewing logic here
	};

	// Array of quick actions data
	const quickActions = [
		{
			title: "Transfer",
			iconName: "swap-horizontal",
			iconColor: "#1E90FF",
			backgroundColor: "#e6f7ff",
			onPress: () => console.log("Transfer Money"),
		},
		{
			title: "Pay Bills",
			iconName: "cash",
			iconColor: "#32CD32",
			backgroundColor: "#e6ffe6",
			onPress: () => console.log("Pay Bills"),
		},
		{
			title: "History",
			iconName: "receipt",
			iconColor: "#8A2BE2",
			backgroundColor: "#f3e6ff",
			onPress: () => console.log("Transaction History"),
		},
		{
			title: "Account",
			iconName: "add-circle",
			iconColor: "#FFD700",
			backgroundColor: "#fff9e6",
			onPress: () => console.log("Add New Account"),
		},
	];

	return (
		<LinearGradient
			colors={["#fff", "#f0fff4", "#fff"]}
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
			}}
		>
			<ScrollView style={{ flex: 1, width: "100%", padding: 16 }}>
				{/* Account Balance Card */}
				<View className="bg-primary mb-6 p-4 rounded-xl border-l-4 border-accent/50">
					<Text style={{ fontSize: 14, color: "#fff" }}>Your Balance</Text>
					<Text
						style={{
							fontSize: 32,
							fontWeight: "bold",
							color: "#fff",
							marginTop: 8,
						}}
					>
						$12,350.00 {/* Replace with dynamic balance from API */}
					</Text>
					<Text style={{ fontSize: 14, color: "#fff", marginTop: 4 }}>
						Available Balance
					</Text>
				</View>

				{/* Quick Actions Grid (2 Rows, 2 Columns) */}
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "space-between",
					}}
					className="mb-6"
				>
					{quickActions.map((action, index) => (
						<View
							key={index} // Use index as key (consider using a unique identifier if available)
							style={{
								width: "48%", // Set width to 48% to create two columns
								marginBottom: 10, // Space between rows
							}}
						>
							<QuickAction
								title={action.title}
								iconName={action.iconName}
								iconColor={action.iconColor}
								backgroundColor={action.backgroundColor}
								onPress={action.onPress}
							/>
						</View>
					))}
				</View>

				{transactions.map((transaction) => (
					<TransactionCard
						key={transaction.id}
						transaction={transaction}
						onViewDetails={handleViewDetails}
					/>
				))}
			</ScrollView>
		</LinearGradient>
	);
}
