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
import SpendingTrend from "../components/home/SpendingTrend";
import AccountBalanceCard from "../components/home/AccountBalanceCard";

// Modular Quick Action Component
const QuickAction = ({ title, iconName, onPress }) => (
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
		className="bg-slate-50"
	>
		<View
			className="p-1.5 bg-slate-200 mb-1 rounded-lg"
			style={{ backgroundColor: "#E5F5F1" }} // Set background color using inline style
		>
			<Ionicons name={iconName} size={20} color={"#008773" || "#000"} />
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

const renderQuickActions = (actions) => (
	<View
		style={{
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "space-between",
			marginBottom: 8,
		}}
	>
		{actions.map((action, index) => (
			<View
				key={index}
				style={{
					width: "48%",
					marginBottom: 6,
				}}
			>
				<QuickAction
					title={action.title}
					iconName={action.iconName}
					onPress={action.onPress}
				/>
			</View>
		))}
	</View>
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
	const [commissionVisible, setCommissionVisible] = useState(true); // Default is visible

	const commissionData = {
		total: 125000, // The total commission amount in naira
		progress: 65, // Represents 65% progress toward a target or milestone
		trend: 15,
	};

	// Get status category
	const statusCategory = getStatusCategory(transactions.payment_response_code);

	// Limit the number of transactions to show based on commission visibility
	const displayedTransactions = commissionVisible
		? transactions.slice(0, 2) // Show 3 transactions when commission is visible
		: transactions.slice(0, 3); // Show 2 transactions when commission is hidden

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

	const withdraw = () => router.push("payout");

	// Array of quick actions data
	const makeTransfer = [
		{
			title: "Bank Transfer",
			iconName: "arrow-down-circle", // Represents financial transactions like bank transfer
			onPress: () => console.log("Initiate Bank Transfer"),
		},
		{
			title: "Fund Agent",
			iconName: "card", // Suitable for card transactions like NFC tap
			onPress: () => console.log("Fund Agent via NFC Tap"),
		},
	];

	const makePayment = [
		{
			title: "Airtime & Data",
			iconName: "cellular", // Represents cellular activity, fitting for Airtime & Data
			onPress: () => console.log("Top up Airtime & Data"),
		},
		{
			title: "Bills Payment",
			iconName: "receipt", // Represents bills and receipts, fitting for Bill Payments
			onPress: () => console.log("Pay Bills"),
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
				<AccountBalanceCard
					balance={balance}
					balanceVisible={balanceVisible}
					toggleBalanceVisibility={toggleBalanceVisibility}
					commissionData={commissionData}
					withdraw={withdraw}
					commissionVisible={commissionVisible}
					setCommissionVisible={setCommissionVisible}
				/>

				<SpendingTrend
					totalCredit={totalCredit}
					totalDebit={totalDebit}
					statusCategory={statusCategory}
				/>

				<View>
					<Text className="text-gray-500 mb-4">Make Transfer</Text>
					{renderQuickActions(makeTransfer)}
				</View>
				<View>
					<Text className="text-gray-500 mb-4">Make Payment</Text>
					{renderQuickActions(makePayment)}
				</View>

				<View className="flex flex-row items-center justify-between mb-4">
					<Text className="text-gray-500 ">Latest Transactions</Text>
					<Pressable onPress={() => router.push("transactions")}>
						<Text style={{ textAlign: "center", color: "#008773" }}>
							View More
						</Text>
					</Pressable>
				</View>

				{/* Display a limited number of transactions */}
				<View className="px-1">
					{displayedTransactions && displayedTransactions.length > 0 ? (
						displayedTransactions.map((transaction) => (
							<TransactionCard
								key={transaction.id}
								transaction={transaction}
								onViewDetails={handleViewDetails}
							/>
						))
					) : (
						<Text className="text-gray-500 text-center">
							No transactions found.
						</Text>
					)}
				</View>
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
