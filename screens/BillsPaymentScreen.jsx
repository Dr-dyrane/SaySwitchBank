import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	TextInput,
	TouchableOpacity,
	Image,
} from "react-native";
import { useRouter } from "expo-router";
import DraggableTab from "../components/layout/DraggableTab";
import TransactionCard from "../components/transactions/TransactionCard";
import transactions from "../data/transactions";
import BillProviderSelector from "../components/payment/Bills/BillProviderSelector";
import BillServiceBanner from "../components/payment/Bills/BillServiceBanner";
import { useToast } from "../contexts/ToastContext";
import BillPaymentConfirmModal from "../components/payment/Bills/BillPaymentConfirmModal";

const quickAmounts = [1000, 2000, 5000, 10000, 20000];

const BillsPaymentScreen = () => {
	const [activeTab, setActiveTab] = useState("electricity");
	const [filteredTransactions, setFilteredTransactions] = useState([]);
	const [selectedProvider, setSelectedProvider] = useState(null);
	const [billNumber, setBillNumber] = useState("");
	const [amount, setAmount] = useState("");
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const router = useRouter();
	const { showToast } = useToast();

	useEffect(() => {
		const providers = {
			electricity: {
				id: "eko",
				name: "Eko Electricity",
				logo: "flash",
				type: "electricity",
			},
			TV: { id: "dstv", name: "DSTV", logo: "tv", type: "TV" },
			water: {
				id: "lagos",
				name: "Lagos Water Corporation",
				logo: "water",
				type: "water",
			},
		};
		setSelectedProvider(providers[activeTab]);
	}, [activeTab]);

	useEffect(() => {
		const filtered = transactions
			.filter((t) =>
				t.service_type.toLowerCase().includes(activeTab.toLowerCase())
			)
			.slice(0, 2);
		setFilteredTransactions(filtered);
	}, [activeTab]);

	const handleTabChange = (newTab) => {
		setActiveTab(newTab);
		setBillNumber("");
		setAmount("");
	};

	const handleConfirm = () => {
		setShowConfirmModal(false);
		setBillNumber("");
		setAmount("");
		showToast(
			`${
				activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
			} Bill Payment Successful!`,
			"success"
		);
		router.push({
			pathname: "transDetails",
			params: { id: 11 },
		});
	};

	const handleAmountChange = (value) => {
		const numericValue = parseInt(value.replace(/,/g, ""), 10);
		if (!isNaN(numericValue)) {
			if (numericValue <= 500000) {
				setAmount(numericValue.toString());
			} else {
				setAmount("500000");
			}
		} else {
			setAmount("");
		}
	};

	const handleViewDetails = (id) => {
		router.push({ pathname: "transDetails", params: { id } });
	};

	const handleQuickAmountSelect = (quickAmount) => {
		setAmount(quickAmount.toString());
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1 bg-white px-4 pb-4"
		>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "space-between",
				}}
			>
				<View>
					<DraggableTab
						tabs={["electricity", "TV", "water"]}
						initialTab={activeTab}
						onTabChange={handleTabChange}
					/>

					<View className="space-y-4">
						<BillServiceBanner selectedProvider={selectedProvider} />

						<BillProviderSelector
							billType={activeTab}
							onSelect={setSelectedProvider}
							selectedProvider={selectedProvider}
						/>

						<View className="space-y-2">
							<Text className="text-gray-600">
								{activeTab === "TV" ? "Smart Card Number" : "Meter/Bill Number"}
							</Text>
							<TextInput
								className="bg-slate-50 p-4 rounded-xl"
								value={billNumber}
								onChangeText={setBillNumber}
								placeholder={`Enter ${
									activeTab === "TV" ? "smart card" : "meter/bill"
								} number`}
								keyboardType="numeric"
							/>
						</View>

						<View className="flex-row items-center bg-slate-50 pl-4 rounded-xl">
							<Text className="mr-2">₦</Text>
							<TextInput
								className="flex-1 bg-transparent py-2"
								value={amount ? Number(amount).toLocaleString() : ""}
								onChangeText={handleAmountChange}
								placeholder="Enter amount"
								keyboardType="numeric"
							/>
							<TouchableOpacity
								className={`p-4 rounded-xl ml-2 ${
									amount && billNumber ? "bg-primary" : "bg-gray-400"
								}`}
								onPress={() =>
									amount && billNumber && setShowConfirmModal(true)
								}
								disabled={!amount || !billNumber}
							>
								<Text
									className={
										amount && billNumber
											? "text-white font-bold"
											: "text-gray-200 font-bold"
									}
								>
									{amount && billNumber
										? `Pay ₦${Number(amount).toLocaleString()}`
										: "Pay"}
								</Text>
							</TouchableOpacity>
						</View>
						{billNumber && (
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{
									width: "100%",
									justifyContent: "space-between",
								}}
								className="flex-row space-x-2 w-full"
							>
								{quickAmounts.map((quickAmount) => (
									<TouchableOpacity
										key={quickAmount}
										onPress={() => handleQuickAmountSelect(quickAmount)}
										className="bg-slate-100 px-3 py-2 rounded-md"
									>
										<Text className="font-medium">
											₦{quickAmount.toLocaleString()}
										</Text>
									</TouchableOpacity>
								))}
							</ScrollView>
						)}
					</View>
				</View>

				<View className="mt-4">
					<View className="flex flex-row items-center justify-between mb-4">
						<Text className="text-gray-500">Recent Bills</Text>
						<Pressable onPress={() => router.push("transactions")}>
							<Text style={{ textAlign: "center", color: "#008773" }}>
								View More
							</Text>
						</Pressable>
					</View>
					{filteredTransactions.length > 0 ? (
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
			</ScrollView>

			<BillPaymentConfirmModal
				visible={showConfirmModal}
				onClose={() => setShowConfirmModal(false)}
				onConfirm={handleConfirm}
				details={{
					type: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
					provider: selectedProvider,
					amount: Number(amount),
					billNumber: billNumber,
				}}
			/>
		</KeyboardAvoidingView>
	);
};

export default BillsPaymentScreen;
