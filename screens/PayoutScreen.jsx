import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Modal,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import transactions from "../data/transactions";
import TransactionCard from "../components/transactions/TransactionCard";
import TransDetails from "../components/transactions/TransDetails";
import Banner from "../components/payment/Banner";
import {
	AccountSelectionModal,
	ConfirmationModal,
} from "../components/payment/PayoutModals";
import { useRouter } from "expo-router";

const accounts = [
	{ id: 1, name: "Main Checking", number: "**** 1234", icon: "business" },
	{ id: 2, name: "Savings Account", number: "**** 5678", icon: "wallet" },
	{ id: 3, name: "Business Account", number: "**** 9012", icon: "briefcase" },
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
	const router = useRouter();

	useEffect(() => {
		const filtered = transactions
			.filter((t) => t.service_type === "Payout to Profiled Account")
			.slice(-3);

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
		setStep(1);
		setSelectedAccount(null);
		setAmount("");
		setRemark("");
		setIsConfirmModalOpen(false);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1 bg-white px-4"
		>
			<ScrollView contentContainerStyle="flex-grow p-4 justify-between">
				<View className="mb-6">
					<Banner />
				</View>
				<View>
					{step === 1 && (
						<View>
							<Text className="text-gray-500 mb-4">Recipient Account</Text>
							<TouchableOpacity
								className="bg-slate-50 p-2 px-4 rounded-xl mb-6"
								onPress={() => setIsAccountModalOpen(true)}
							>
								{selectedAccount ? (
									<View className="flex-row items-center">
										<View className="bg-[#E5F5F1] p-2 rounded-full mr-3">
											<Ionicons
												name={selectedAccount.icon}
												size={24}
												color="#008773"
											/>
										</View>
										<View>
											<Text className="font-semibold text-gray-800">
												{selectedAccount.name}
											</Text>
											<Text className="text-gray-500">
												{selectedAccount.number}
											</Text>
										</View>
									</View>
								) : (
									<Text className="text-gray-400 p-2">Select an account</Text>
								)}
							</TouchableOpacity>
						</View>
					)}

					{step === 2 && (
						<View>
							<View className="flex-row justify-between">
								<Text className="text-lg font-semibold text-gray-800">
									Enter Amount
								</Text>
								<Pressable onPress={() => setStep(1)}>
									<Text className="text-primary">Go Back</Text>
								</Pressable>
							</View>
							<TextInput
								className="border border-gray-300 rounded-lg p-3 text-lg mb-4"
								value={amount}
								onChangeText={setAmount}
								placeholder="Enter amount"
								keyboardType="numeric"
							/>
							<View className="flex-row justify-between mb-4">
								{quickAmounts.map((quickAmount) => (
									<TouchableOpacity
										key={quickAmount}
										onPress={() => handleAmountSelect(quickAmount)}
										className="bg-teal-100 p-2 rounded-lg"
									>
										<Text className="text-teal-600 font-medium">
											₦{quickAmount.toLocaleString()}
										</Text>
									</TouchableOpacity>
								))}
							</View>
							<TextInput
								className="border border-gray-300 rounded-xl p-3 text-lg mb-4"
								value={remark}
								onChangeText={setRemark}
								placeholder="Add a remark (optional)"
							/>
						</View>
					)}

					<TouchableOpacity
						onPress={handleNext}
						disabled={step === 1 ? !selectedAccount : !amount}
						className={`${
							(step === 1 && !selectedAccount) || (step === 2 && !amount)
								? "bg-gray-300"
								: "bg-primary"
						} py-4 px-6 rounded-xl flex-row items-center justify-between mt-6`}
					>
						<Text className="text-white text-lg font-semibold">
							{step === 1 ? "Next" : "Confirm Payout"}
						</Text>
						<View className="w-6 h-6 bg-none border border-white rounded-full justify-center items-center">
							<Ionicons name="arrow-forward" size={18} color="white" />
						</View>
					</TouchableOpacity>
				</View>

				<View className="mt-8">
					<View className="flex flex-row items-center justify-between mb-4">
						<Text className="text-gray-500">Recent Payouts</Text>
						<Pressable onPress={() => router.push("transactions")}>
							<Text style={{ textAlign: "center", color: "#008773" }}>
								View More
							</Text>
						</Pressable>
					</View>
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
				<AccountSelectionModal
					isVisible={isAccountModalOpen}
					accounts={accounts}
					onSelectAccount={handleAccountSelect}
					onClose={() => setIsAccountModalOpen(false)}
				/>

				<ConfirmationModal
					isVisible={isConfirmModalOpen}
					amount={amount}
					selectedAccount={selectedAccount}
					remark={remark}
					onConfirm={handlePayout}
					onClose={() => setIsConfirmModalOpen(false)}
				/>

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={closeModal}
				>
					<TransDetails
						transactionId={selectedTransactionId}
						onClose={closeModal}
					/>
				</Modal>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
