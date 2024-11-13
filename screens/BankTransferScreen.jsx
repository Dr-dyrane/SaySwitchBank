import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Modal,
	ActivityIndicator,
	Image,
	Pressable,
	TouchableWithoutFeedback,
    Share,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";
import TransferBanner from "../components/transfer/TransferBanner";
import TransactionCard from "../components/transactions/TransactionCard";
import transactions from "../data/transactions";
import logo from "../assets/icon.png";

const quickAmounts = [1000, 2000, 5000, 10000, 20000];

const ConfirmationModal = ({
	isVisible,
	amount,
	accountName,
	accountNumber,
	transactionRef,
	onConfirm,
	onClose,
	loading,
}) => {
	return (
		<Modal visible={isVisible} animationType="slide" transparent={true}>
			<TouchableWithoutFeedback onPress={onClose}>
				<View className="flex-1 justify-end bg-black/50">
					<TouchableWithoutFeedback>
						<View>
							{/* Drag Indicator Bar */}
							<View
								style={{
									height: 4,
									width: 80,
									backgroundColor: "#ccc",
									borderRadius: 2,
									alignSelf: "center",
									marginBottom: 8,
								}}
							/>
							<View className="bg-white rounded-t-3xl p-6">
								<Text className="text-2xl font-semibold text-center mb-4">
									Confirm Payment
								</Text>

								<View className="justify-center items-center mb-6">
									<Text className="text-2xl font-semibold">
										₦{parseFloat(amount).toLocaleString()}
									</Text>
								</View>

								<View className="flex-row items-center justify-between p-3 mb-3 border-gray-200 bg-slate-50 rounded-xl">
									<View className="flex-row items-center space-x-3">
										<View className="flex items-center justify-center">
											<View className="border border-slate-400/20 rounded-full bg-teal-50/50">
												<Image
													source={logo}
													resizeMode="fit"
													className="w-10 h-10 rounded-full"
												/>
											</View>
										</View>
										<View>
											<Text className="text-md text-gray-800">
												{accountName}
											</Text>
											<Text className="text-gray-500">{accountNumber}</Text>
										</View>
									</View>
									<Ionicons
										name="checkmark-done-circle"
										size={24}
										color="teal"
									/>
								</View>

								<View className="flex-row justify-between w-full mb-2 p-2">
									<View className="items-center justify-center">
										<Text className="text-gray-500">Amount</Text>
									</View>
									<View className="items-center justify-center">
										<Text className="font-semibold">
											₦{parseFloat(amount).toLocaleString()}
										</Text>
									</View>
								</View>

								<View className="flex-row justify-between w-full mb-2 p-2">
									<View className="items-center justify-center">
										<Text className="text-gray-500">Transaction Reference</Text>
									</View>
									<View className="items-center justify-center">
										<Text className="font-semibold">{transactionRef}</Text>
									</View>
								</View>

								<TouchableOpacity
									onPress={onConfirm}
									className="bg-primary flex flex-row items-center justify-between p-4 rounded-2xl w-full shadow-md mt-6"
								>
									<Text className="text-white text-center text-lg">
										{loading ? "Processing..." : "Confirm Payment"}
									</Text>
									<View className="w-6 h-6 bg-none border border-white rounded-full justify-center items-center">
										{loading ? (
											<ActivityIndicator size={18} color="white" />
										) : (
											<Ionicons name="checkmark" size={18} color="white" />
										)}
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default function BankTransferScreen() {
	const [amount, setAmount] = useState("");
	const [transactionRef, setTransactionRef] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [recentTransactions, setRecentTransactions] = useState([]);

	const router = useRouter();
	const { showToast } = useToast();
	const { user } = useAuth();

	useEffect(() => {
		const fundReceipts = transactions
			.filter((t) => t.service_type === "Fund Receipt")
			.slice(0, 2);
		setRecentTransactions(fundReceipts);
	}, []);

	const generateTransactionRef = () => {
		setIsLoading(true);
		setTimeout(() => {
			setTransactionRef(
				"TRF" + Math.random().toString(36).substr(2, 9).toUpperCase()
			);
			setIsLoading(false);
			setIsConfirmModalOpen(true);
		}, 1500);
	};

	const handlePaymentConfirmation = () => {
		setIsLoading(true);
		setTimeout(() => {
			showToast("Payment received successfully!", "success");
			router.push({ pathname: "transDetails", params: { id: 19 } });
			setIsLoading(false);
			setIsConfirmModalOpen(false);
		}, 2000);
	};

	const handleViewDetails = (id) => {
		router.push({ pathname: "transDetails", params: { id } });
	};

	const handleAmountChange = (value) => {
		setAmount(value.toString());
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1 bg-white px-4 pb-4"
		>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1, // Ensures the content stretches to fill available space
					justifyContent: "space-between", // Ensures space is distributed evenly between elements
				}}
				className=""
			>
				<TransferBanner type="bank" />

				<View className="">
					<Text className="text-gray-500 mb-2">Account Details</Text>

					<View className="bg-slate-50 p-3 rounded-2xl mb-4">
						<View className="flex-row items-center justify-between">
							<View className="flex-row items-center space-x-3">
								<View className="flex items-center justify-center">
									<View className="border border-slate-400/20 rounded-full bg-teal-50/50">
										<Image
											source={logo}
											resizeMode="fit"
											className="w-10 h-10 rounded-full"
										/>
									</View>
								</View>
								<View>
									<Text className="font-semibold text-lg">
										{user?.fullName || "User Name"}
									</Text>
									<Text className="text-gray-500">
										{user?.phone || "1234567890"}
									</Text>
								</View>
							</View>
							<TouchableOpacity
								onPress={() =>
                                    Share.share({
                                        message: `Account Name: ${user?.fullName || "User Name"}\nAccount Number: ${
                                            user?.phone || "1234567890"
                                        }\nBank: XYZ Bank\nSwitch Pay: Enabled`, // Add your actual bank and Switch Pay details here
                                    })
                                }
							>
								<MaterialCommunityIcons
									name="share-circle"
									size={32}
									color="teal"
								/>
							</TouchableOpacity>
						</View>
					</View>

					<Text className="text-gray-500 mb-2">Amount to Receive</Text>
					<View className="flex-row items-center bg-slate-50 p-3 px-4 rounded-xl mb-4">
						<Text className="mr-2">₦</Text>
						<TextInput
							className="flex-1 bg-transparent"
							value={amount ? Number(amount).toLocaleString() : ""}
							onChangeText={setAmount}
							placeholder="Enter amount"
							keyboardType="numeric"
						/>
						{amount && (
							<TouchableOpacity
								onPress={() => {
									setAmount("");
								}}
								style={{
									padding: 4,
									backgroundColor: "#ff000020",
									borderRadius: 30,
								}}
							>
								<Ionicons name="close" size={10} color="red" />
							</TouchableOpacity>
						)}
					</View>

					<ScrollView
						horizontal
						contentContainerStyle={{
							width: "100%",
							justifyContent: "space-between",
						}}
						className="flex-row space-x-4 mb-4"
					>
						{quickAmounts.map((quickAmount) => (
							<TouchableOpacity
								key={quickAmount}
								onPress={() => handleAmountChange(quickAmount)}
								className="bg-slate-50 p-2 rounded-md"
							>
								<Text className="font-medium">
									₦{quickAmount.toLocaleString()}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>

					<TouchableOpacity
						onPress={generateTransactionRef}
						disabled={!amount || isLoading}
						className={`${
							!amount || isLoading ? "bg-gray-300" : "bg-primary"
						} py-4 px-6 rounded-xl flex-row items-center justify-between mt-6`}
					>
						<>
							<Text className="text-white text-lg font-semibold mr-2">
								Generate Transaction Ref
							</Text>
							<View className="w-6 h-6 bg-none border border-white rounded-full justify-center items-center">
								{isLoading ? (
									<ActivityIndicator size={18} color="white" />
								) : (
									<Ionicons name="arrow-forward" size={18} color="white" />
								)}
							</View>
						</>
					</TouchableOpacity>
				</View>

				<View className="mt-8">
					<View className="flex flex-row items-center justify-between mb-4">
						<Text className="text-gray-500">Recent Transfers</Text>
						<Pressable onPress={() => router.push("transactions")}>
							<Text style={{ textAlign: "center", color: "#008773" }}>
								View More
							</Text>
						</Pressable>
					</View>
					{recentTransactions && recentTransactions.length > 0 ? (
						recentTransactions.map((transaction) => (
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

			<ConfirmationModal
				isVisible={isConfirmModalOpen}
				amount={amount}
				accountName={user?.fullName || "User Name"}
				accountNumber={user?.phone || "1234567890"}
				transactionRef={transactionRef}
				loading={isLoading}
				onConfirm={handlePaymentConfirmation}
				onClose={() => setIsConfirmModalOpen(false)}
			/>
		</KeyboardAvoidingView>
	);
}
