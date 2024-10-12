import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // Expo Icons
import { useAuth } from "../contexts/AuthContext";
import TransactionCard, {
	getStatusCategory,
} from "../components/transactions/TransactionCard";
import transactions from "../data/transactions"; // Imported transactions
import { useRouter } from "expo-router";
import TransDetails from "../components/transactions/TransDetails";

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
			justifyContent: "space-between",
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
	const router = useRouter();

	const [modalVisible, setModalVisible] = useState(false);
	const [selectedTransactionId, setSelectedTransactionId] = useState(null);

	const handleViewDetails = (id) => {
		setSelectedTransactionId(id);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
		setSelectedTransactionId(null);
	};

	// State for dynamic balance and hide/show functionality
	const [balanceVisible, setBalanceVisible] = useState(true);
	const [balance, setBalance] = useState(12350.0); // Dynamic balance

	// Get status category
	const statusCategory = getStatusCategory(transactions.payment_response_code);
	// Limit the number of transactions to show on the home page
	const displayedTransactions = transactions.slice(0, 4); // Only show first 3

	// Calculate total debit and credit from the transactions data
	const totalDebit = transactions
		.filter((txn) => txn.direction === "Debit")
		.reduce((acc, txn) => acc + txn.amount, 0);
	const totalCredit = transactions
		.filter((txn) => txn.direction === "Credit")
		.reduce((acc, txn) => acc + txn.amount, 0);

	const toggleBalanceVisibility = () => {
		setBalanceVisible((prev) => !prev);
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
					<View className="flex-row justify-between">
						<Text style={{ fontSize: 14, color: "#fff" }}>Your Balance</Text>
						<TouchableOpacity onPress={toggleBalanceVisibility}>
							<Ionicons
								name={balanceVisible ? "eye-off" : "eye"}
								size={24}
								color="#fff"
							/>
						</TouchableOpacity>
					</View>
					<Text
						style={{
							fontSize: 32,
							fontWeight: "bold",
							color: "#fff",
							marginTop: 8,
						}}
					>
						{balanceVisible ? `$${balance.toFixed(2)}` : "****"}
					</Text>
					<Text style={{ fontSize: 14, color: "#fff", marginTop: 4 }}>
						Available Balance
					</Text>

					{/* Mini dataset of Debit vs Credit */}
					<View className="flex-row justify-between mt-4">
						<View className="flex-row items-center">
							<StatusIcon
								iconName="arrow-down"
								iconColor="red"
								status={statusCategory} // Pass dynamic status
							/>
							<Text style={{ color: "#fff", marginLeft: 4 }}>
								Debit: ${totalDebit.toFixed(2)}
							</Text>
						</View>
						<View className="flex-row items-center">
							<StatusIcon
								iconName="arrow-up"
								iconColor="#00dfc0"
								status={statusCategory} // Pass dynamic status
							/>
							<Text style={{ color: "#fff", marginLeft: 4 }}>
								Credit: ${totalCredit.toFixed(2)}
							</Text>
						</View>
					</View>
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

				{/* Display a limited number of transactions */}
				{displayedTransactions.map((transaction) => (
					<TransactionCard
						key={transaction.id}
						transaction={transaction}
						onViewDetails={handleViewDetails}
					/>
				))}

				{/* Optional: Add a "View More" button to navigate to full transaction history */}
				<TouchableOpacity onPress={() => router.push("transactions")}>
					<Text
						style={{ textAlign: "center", color: "#1E90FF", marginTop: 20 }}
					>
						View More Transactions
					</Text>
				</TouchableOpacity>
			</ScrollView>
			{/* Modal for Transaction Details */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={closeModal}
			>
				<View className="flex-1 justify-center">
					<TransDetails
						setModalIsOpen={closeModal}
						selectedTransactionId={selectedTransactionId}
					/>
				</View>
			</Modal>
		</LinearGradient>
	);
}

// Modular StatusIcon Component
const StatusIcon = ({ iconName, iconColor, status }) => {
	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
				padding: 5,
				borderRadius: 999, // Fully rounded
				backgroundColor: "rgba(255, 255, 255, 0.1)",
			}}
		>
			<Ionicons name={iconName} size={20} color={iconColor} />
		</View>
	);
};
