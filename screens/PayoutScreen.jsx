import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Modal,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import transactions from "../data/transactions"; // Imported transactions
import TransactionCard from "../components/transactions/TransactionCard";
import TransDetails from "../components/transactions/TransDetails";
import Banner from "../components/payment/Banner";

// Mock data for accounts
const accounts = [
	{ id: 1, name: "Main Checking", number: "**** 1234", icon: "business" },
	{ id: 2, name: "Savings Account", number: "**** 5678", icon: "wallet" },
	{
		id: 3,
		name: "Business Account",
		number: "**** 9012",
		icon: "briefcase",
	},
];

const quickAmounts = [10000, 25000, 50000, 100000];

export default function PayoutScreen() {
	const [step, setStep] = useState(1);
	const [selectedAccount, setSelectedAccount] = useState(null);
	const [amount, setAmount] = useState("");
	const [remark, setRemark] = useState("");
	const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [filteredTransactions, setFilteredTransactions] = useState([]);

	useEffect(() => {
		// Filter transactions by service_type
		const filtered = transactions
			.filter((t) => t.service_type === "Payout to Profiled Account")
			.slice(-3); // Get the last 3 transactions

		setFilteredTransactions(filtered);
	}, [transactions]);

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

	const handleAccountSelect = (account) => {
		setSelectedAccount(account);
		setIsAccountModalOpen(false);
	};

	const handleAmountSelect = (quickAmount) => {
		setAmount(quickAmount.toString());
	};

	const handleNext = () => {
		if (step === 1 && selectedAccount) {
			setStep(2);
		} else if (step === 2 && amount) {
			setIsConfirmModalOpen(true);
		}
	};

	const handlePayout = () => {
		console.log(
			`Payout of ₦${amount} from ${selectedAccount.name} with remark: ${remark}`
		);
		// Reset the form and close the modal
		setStep(1);
		setSelectedAccount(null);
		setAmount("");
		setRemark("");
		setIsConfirmModalOpen(false);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View className="mb-6">
					<Banner />
				</View>
				<View>
					{step === 1 && (
						<View>
							<Text style={styles.subtitle}>Recipient Account</Text>
							<TouchableOpacity
								style={styles.accountSelector}
								onPress={() => setIsAccountModalOpen(true)}
							>
								{selectedAccount ? (
									<View style={styles.selectedAccount}>
										<View style={styles.accountIcon}>
											<Ionicons
												name={selectedAccount.icon}
												size={24}
												color="#0D9488"
											/>
										</View>
										<View>
											<Text style={styles.accountName}>
												{selectedAccount.name}
											</Text>
											<Text style={styles.accountNumber}>
												{selectedAccount.number}
											</Text>
										</View>
									</View>
								) : (
									<Text style={styles.placeholderText}>Select an account</Text>
								)}
							</TouchableOpacity>
						</View>
					)}

					{step === 2 && (
						<View>
							<Text style={styles.subtitle}>Enter Amount</Text>
							<TextInput
								style={styles.input}
								value={amount}
								onChangeText={setAmount}
								placeholder="Enter amount"
								keyboardType="numeric"
							/>
							<View style={styles.quickAmounts}>
								{quickAmounts.map((quickAmount) => (
									<TouchableOpacity
										key={quickAmount}
										onPress={() => handleAmountSelect(quickAmount)}
										style={styles.quickAmountButton}
									>
										<Text style={styles.quickAmountText}>
											₦{quickAmount.toLocaleString()}
										</Text>
									</TouchableOpacity>
								))}
							</View>
							<TextInput
								style={styles.input}
								value={remark}
								onChangeText={setRemark}
								placeholder="Add a remark (optional)"
							/>
						</View>
					)}

					<TouchableOpacity
						onPress={handleNext}
						disabled={step === 1 ? !selectedAccount : !amount}
						style={[
							styles.nextButton,
							(step === 1 && !selectedAccount) || (step === 2 && !amount)
								? styles.disabledButton
								: null,
						]}
					>
						<Text style={styles.nextButtonText}>
							{step === 1 ? "Next" : "Confirm Payout"}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.recentPayouts}>
					<Text style={styles.recentPayoutsTitle}>Recent Payouts</Text>
					{filteredTransactions && filteredTransactions.length > 0 ? (
						filteredTransactions.map((transaction) => (
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

				<Modal
					visible={isAccountModalOpen}
					animationType="slide"
					transparent={true}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>Select Account</Text>
							{accounts.map((account) => (
								<TouchableOpacity
									key={account.id}
									style={styles.accountOption}
									onPress={() => handleAccountSelect(account)}
								>
									<View style={styles.accountIcon}>
										<Ionicons name={account.icon} size={24} color="#0D9488" />
									</View>
									<View style={styles.accountInfo}>
										<Text style={styles.accountName}>{account.name}</Text>
										<Text style={styles.accountNumber}>{account.number}</Text>
									</View>
									<Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
								</TouchableOpacity>
							))}
							<TouchableOpacity
								onPress={() => setIsAccountModalOpen(false)}
								style={styles.cancelButton}
							>
								<Text style={styles.cancelButtonText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>

				<Modal
					visible={isConfirmModalOpen}
					animationType="slide"
					transparent={true}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>Confirm Payout</Text>
							<View style={styles.confirmationItem}>
								<Text style={styles.confirmationLabel}>Amount</Text>
								<Text style={styles.confirmationAmount}>
									₦{parseInt(amount).toLocaleString()}
								</Text>
							</View>
							<View style={styles.confirmationItem}>
								<Text style={styles.confirmationLabel}>To Account</Text>
								<Text style={styles.confirmationAccountName}>
									{selectedAccount?.name}
								</Text>
								<Text style={styles.confirmationAccountNumber}>
									{selectedAccount?.number}
								</Text>
							</View>
							{remark && (
								<View style={styles.confirmationItem}>
									<Text style={styles.confirmationLabel}>Remark</Text>
									<Text style={styles.confirmationRemark}>{remark}</Text>
								</View>
							)}
							<TouchableOpacity
								onPress={handlePayout}
								style={styles.confirmButton}
							>
								<Text style={styles.confirmButtonText}>Confirm Payout</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => setIsConfirmModalOpen(false)}
								style={styles.cancelButton}
							>
								<Text style={styles.cancelButtonText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
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
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	scrollContent: {
		flexGrow: 1,
		padding: 16,
		justifyContent: "space-between",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#0D9488",
		marginBottom: 24,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1F2937",
		marginBottom: 16,
	},
	accountSelector: {
		backgroundColor: "#F8FAFC",
		padding: 16,
		borderRadius: 8,
		marginBottom: 24,
	},
	selectedAccount: {
		flexDirection: "row",
		alignItems: "center",
	},
	accountIcon: {
		backgroundColor: "#99F6E4",
		padding: 8,
		borderRadius: 20,
		marginRight: 12,
	},
	accountName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1F2937",
	},
	accountNumber: {
		fontSize: 14,
		color: "#6B7280",
	},
	placeholderText: {
		color: "#9CA3AF",
	},
	input: {
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		marginBottom: 16,
	},
	quickAmounts: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	quickAmountButton: {
		backgroundColor: "#E6FFFA",
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 16,
	},
	quickAmountText: {
		color: "#0D9488",
		fontWeight: "500",
	},
	nextButton: {
		backgroundColor: "#0D9488",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 24,
	},
	nextButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	disabledButton: {
		backgroundColor: "#D1D5DB",
	},
	recentPayouts: {
		marginTop: 32,
	},
	recentPayoutsTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1F2937",
		marginBottom: 16,
	},
	transactionCard: {
		backgroundColor: "#F8FAFC",
		padding: 16,
		borderRadius: 8,
		marginBottom: 12,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	transactionAmount: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1F2937",
	},
	transactionAccount: {
		fontSize: 14,
		color: "#6B7280",
	},
	transactionDate: {
		fontSize: 14,
		color: "#9CA3AF",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "white",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		padding: 24,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: "#1F2937",
		marginBottom: 16,
	},
	accountOption: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E7EB",
	},
	accountInfo: {
		flex: 1,
		marginLeft: 12,
	},
	cancelButton: {
		marginTop: 16,
		padding: 16,
		backgroundColor: "#F3F4F6",
		borderRadius: 8,
		alignItems: "center",
	},
	cancelButtonText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1F2937",
	},
	confirmationItem: {
		backgroundColor: "#F8FAFC",
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
	},
	confirmationLabel: {
		fontSize: 14,
		color: "#6B7280",
		marginBottom: 4,
	},
	confirmationAmount: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1F2937",
	},
	confirmationAccountName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1F2937",
	},
	confirmationAccountNumber: {
		fontSize: 14,
		color: "#6B7280",
	},
	confirmationRemark: {
		fontSize: 16,
		color: "#1F2937",
	},
	confirmButton: {
		backgroundColor: "#0D9488",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 12,
	},
	confirmButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});
