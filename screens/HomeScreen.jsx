import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Modal,
	Pressable,
} from "react-native";
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
			flex: 1,
			flexDirection: "column",
			padding: 16,
			borderRadius: 10,
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: 10,
			marginHorizontal: 4,
		}}
		onPress={onPress}
		className="bg-slate-50"
	>
		<View
			className="p-1.5 bg-slate-200 mb-1 rounded-lg"
			style={{ backgroundColor: '#E5F5F1' }} // Set background color using inline style
		>
			<Ionicons name={iconName} size={20} color={'#008773' || "#000"} />
		</View>

		<View className="flex-1">
			<Text
				style={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
				className="text-xs"
			>
				{title}
			</Text>
		</View>
	</TouchableOpacity>
);

// Business Card Component
const BusinessCard = ({
	title,
	iconName,
	iconColor,
	backgroundColor,
	onPress,
	number,
}) => (
	<TouchableOpacity
		style={{
			flex: 1,
			flexDirection: "row",
			padding: 16,
			borderRadius: 10,
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: 10,
			marginHorizontal: 4,
		}}
		onPress={onPress}
		className="bg-slate-50 justify-between"
	>
		<View className="flex-row flex items-center justify-center">
			<View
				className="p-1.5 bg-slate-200 rounded-lg"
				style={{ backgroundColor: '#E5F5F1' }} // Set background color using inline style
			>
				<Ionicons name={iconName} size={20} color={'#008773' || "#000"} />
			</View>

			<View className="ml-2">
				<Text
					style={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
					className="text-xs"
				>
					{title}
				</Text>
			</View>
		</View>
		<View className="py-2 rounded-lg px-3 bg-[#fff]">
			<Text className="text-primary">{number}</Text>
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
	const [balanceVisible, setBalanceVisible] = useState(false);
	const [balance, setBalance] = useState(12350.0); // Dynamic balance

	// Get status category
	const statusCategory = getStatusCategory(transactions.payment_response_code);
	// Limit the number of transactions to show on the home page
	const displayedTransactions = transactions.slice(0, 2); // Only show first 3

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
			title: "Payout",
			iconName: "arrow-forward-circle-outline",
			iconColor: "#008773",
			backgroundColor: "#e6f7ff",
			onPress: () => console.log("Payout Money"),
		},
		{
			title: "Pay Bills",
			iconName: "card-outline",
			iconColor: "#32CD32",
			backgroundColor: "#e6ffe6",
			onPress: () => console.log("Pay Bills"),
		},
		{
			title: "Top-Up",
			iconName: "cellular",
			iconColor: "#FF4500",
			backgroundColor: "#ffe6e6",
			onPress: () => console.log("Top up airtime"),
		},
		{
			title: "Data",
			iconName: "wifi",
			iconColor: "#FFD700",
			backgroundColor: "#fff9e6",
			onPress: () => console.log("Load data"),
		},
	];

	// Sample business data array

	const BusinessData = [
		{
			title: "Businesses",
			iconName: "business-outline", // Business icon
			iconColor: "#007BFF", // Bright Blue
			backgroundColor: "#E9F7FF", // Soft Light Blue
			number: 3, // Assume there are 3 active businesses
			onPress: () => console.log("Manage Businesses"),
		},
		{
			title: "Performance",
			iconName: "bar-chart-outline", // Bar chart icon
			iconColor: "#28A745", // Green
			backgroundColor: "#E6F9E6", // Soft Light Green
			number: 10, // Assume 10 performance metrics to review
			onPress: () => console.log("View Performance"),
		},
		{
			title: "Users",
			iconName: "people-outline", // People icon
			iconColor: "#FFC107", // Amber
			backgroundColor: "#FFF3CD", // Soft Light Yellow
			number: 5, // Assume there are 5 users to manage
			onPress: () => console.log("Manage Users"),
		},
		{
			title: "Accounts", // Updated title
			iconName: "wallet-outline", // Wallet icon for accounts
			iconColor: "#17A2B8", // Teal
			backgroundColor: "#E3F2F8", // Soft Light Teal
			number: 4, // Assume there are 4 profiled accounts
			onPress: () => console.log("Manage Payout Accounts"),
		},
	];

	return (
		<LinearGradient
			colors={["#fff", "#fff", "#fff"]}
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
			}}
		>
			<ScrollView
				style={{
					flex: 1,
					width: "100%",
					paddingHorizontal: 16,
				}}
			>
				{/* Account Balance Card */}
				<View className="bg-primary mb-6 p-4 rounded-xl border-l-4 border-accent/50">
					<View className="flex-row justify-between">
						<Text
							style={{
								fontSize: 32,
								fontWeight: "bold",
								color: "#fff",
								marginTop: 8,
							}}
						>
							{balanceVisible ? `₦${balance.toFixed(2)}` : "****"}
						</Text>
						<TouchableOpacity
							onPress={toggleBalanceVisibility}
							className="flex-row items-center justify-center"
						>
							<Text className="mr-2 text-white">
								{balanceVisible ? "Hide Balance" : "Show Balance"}
							</Text>
							<Ionicons
								name={balanceVisible ? "eye-off" : "eye"}
								size={24}
								color="#fff"
							/>
						</TouchableOpacity>
					</View>
				</View>

				<View className="flex flex-col mb-6 gap-4">
					<Text className="text-gray-500">Spending Trend</Text>
					{/* Mini dataset of Debit vs Credit */}
					<View style={{
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "space-between",
							marginBottom: 0, // Space below the grid
						}}>

						<View className="flex-row items-center bg-slate-50 p-4 rounded-xl w-[47%]">
							<StatusIcon
								iconName="arrow-down"
								iconColor="#008773"
								status={statusCategory} // Pass dynamic status
							/>
							<View className="flex ml-2 space-y-.5 flex-col">
								<Text style={{ color: "gray", marginLeft: 4 }}>Money In</Text>
								<Text style={{ color: "#000", marginLeft: 4 }}>
									₦{totalCredit.toFixed(2)}
								</Text>
							</View>
						</View>

						<View  className="flex-row items-center bg-slate-50 p-4 rounded-xl w-[47%]">
							<StatusIcon
								iconName="arrow-up"
								iconColor="red"
								status={statusCategory} // Pass dynamic status
							/>
							<View className="flex ml-2 space-y-.5 flex-col">
								<Text style={{ color: "gray", marginLeft: 4 }}>Money Out</Text>
								<Text style={{ color: "#000", marginLeft: 4 }}>
									₦{totalDebit.toFixed(2)}
								</Text>
							</View>
						</View>
					</View>
				</View>

				<View>
					<Text className="text-gray-500 mb-4">Make Payment</Text>
					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "space-between",
							marginBottom: 8, // Space below the grid
						}}
					>
						{quickActions.map((action, index) => (
							<View
								key={index} // Use index as key (consider using a unique identifier if available)
								style={{
									width: "22%", // Each action takes about 22% of the width to fit four in a row
									marginBottom: 6, // Space between rows
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
				</View>

				<View>
					<View className="flex flex-row items-center justify-between mb-4">
						<Text className="text-gray-500">Manage Your Business</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "space-between",
							marginBottom: 6, // Space below the grid
						}}
					>
						{BusinessData.map((action, index) => (
							<View
								key={index} // Use index as key (consider using a unique identifier if available)
								style={{
									width: "48%", // Each action takes about 22% of the width to fit four in a row
									marginBottom: 10, // Space between rows
								}}
							>
								<BusinessCard
									title={action.title}
									iconName={action.iconName}
									iconColor={action.iconColor}
									backgroundColor={action.backgroundColor}
									onPress={action.onPress}
									number={action.number}
								/>
							</View>
						))}
					</View>
				</View>

				<View className="flex flex-row items-center justify-between mb-6">
					<Text className="text-gray-500 ">Latest Transactions</Text>
					<Pressable onPress={() => router.push("transactions")}>
						<Text style={{ textAlign: "center", color: "#1E90FF" }}>
							View More
						</Text>
					</Pressable>
				</View>
				{/* Display a limited number of transactions */}
				{displayedTransactions.map((transaction) => (
					<TransactionCard
						key={transaction.id}
						transaction={transaction}
						onViewDetails={handleViewDetails}
					/>
				))}
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
				backgroundColor: "white",
			}}
		>
			<Ionicons name={iconName} size={20} color={iconColor} />
		</View>
	);
};
