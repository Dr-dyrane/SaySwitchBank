import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
    Platform,
	ScrollView,
    Pressable,
	KeyboardAvoidingView,
} from "react-native";
import transactions from "../data/transactions";
import TransactionCard from "../components/transactions/TransactionCard";
import AirtimeSection from "../components/payment/AirtimeSection";
import DataSection from "../components/payment/DataSection";
import { useRouter } from "expo-router";

const AirtimeDataScreen = () => {
	const [activeTab, setActiveTab] = useState("airtime"); // Airtime is the default tab
	const [filteredTransactions, setFilteredTransactions] = useState([]);
    const router = useRouter()

	// Function to get the appropriate service type based on the active tab
	const getServiceType = () => {
		return activeTab === "airtime"
			? "Airtime Recharge"
			: "Internet Subscription";
	};

	useEffect(() => {
		// Filter transactions based on the active tab's service type
		const filtered = transactions
			.filter((t) => t.service_type === getServiceType()) // Filter based on the dynamic service type
			.slice(0, 2); // Optionally adjust how many transactions to display

		setFilteredTransactions(filtered);
	}, [transactions, activeTab]); // Depend on both transactions and activeTab

	const handleViewDetails = (id) => {
		router.push({ pathname: "transDetails", params: { id } });
	};
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1 bg-white px-4 pb-4"
		>
			<ScrollView contentContainerStyle={{
					flexGrow: 1, // Ensures the content stretches to fill available space
					justifyContent: "space-between", // Ensures space is distributed evenly between elements
				}}>
				<View className="">
					<View className="flex-row bg-gray-200 rounded-full p-1 mb-4">
						<TouchableOpacity
							className={`flex-1 py-2 px-4 rounded-full ${
								activeTab === "airtime" ? "bg-white" : ""
							}`}
							onPress={() => setActiveTab("airtime")}
						>
							<Text
								className={`text-center ${
									activeTab === "airtime" ? "text-primary" : "text-gray-600"
								}`}
							>
								Airtime
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className={`flex-1 py-2 px-4 rounded-full ${
								activeTab === "data" ? "bg-white" : ""
							}`}
							onPress={() => setActiveTab("data")}
						>
							<Text
								className={`text-center ${
									activeTab === "data" ? "text-primary" : "text-gray-600"
								}`}
							>
								Data
							</Text>
						</TouchableOpacity>
					</View>
					{activeTab === "airtime" ? <AirtimeSection /> : <DataSection />}
				
				</View>
                <View className="mt-8">
						<View className="flex flex-row items-center justify-between mb-4">
							<Text className="text-gray-500">Recent Top-ups</Text>
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
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default AirtimeDataScreen;