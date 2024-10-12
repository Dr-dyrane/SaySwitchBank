import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Using Ionicons for icons
import transactions from "../../data/transactions";
import { useToast } from "../../contexts/ToastContext";

// Function to map currency ID to currency name (ISO 4217)
const getCurrencyName = (currencyId) => {
	return currencyId === "NGN" ? "Naira" : "USD"; // Fallback for other currencies
};

// Helper function to get status category
const getStatusCategory = (payment_response_code) => {
	const approvedCodes = ["00"];
	const pendingCodes = ["01", "02"];
	if (approvedCodes.includes(payment_response_code)) {
		return "Successful";
	} else if (pendingCodes.includes(payment_response_code)) {
		return "Pending";
	} else {
		return "Failed";
	}
};

// Format date utility
const formatDate = (date) => {
	if (!date) return "No date available"; // Fallback for undefined date
	return new Date(date).toLocaleString("en-GB", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
};

// Main Transaction Details Component
const TransDetails = ({ setModalIsOpen, selectedTransactionId }) => {
	const { showToast } = useToast();

	// Function to get a single transaction's details
	const getSingleTrans = () => {
		const transaction = transactions.find(
			(trans) => trans.id === selectedTransactionId
		);
		if (!transaction) {
			showToast("Transaction not found", "error");
			return null; // Return null if not found
		}

		return transaction; // Return the found transaction
	};

	const selectedTransaction = getSingleTrans();

	// Fallback values
	const data = selectedTransaction || {
		narration: "No description available",
		amount: 0,
		fee: 0,
		currency_id: "NGN",
		transaction_reference: "N/A",
		stan: "N/A",
		payment_response_code: "00",
		payment_response_message: "No response message available",
		transaction_date: new Date().toISOString(),
		is_reversed: false,
	};

	const currencyName = getCurrencyName(data.currency_id);
	const statusCategory = getStatusCategory(data.payment_response_code);

	return (
		<View className="flex flex-col items-center justify-center">
			<View
				style={{ backgroundColor: "#f5f5f5" }}
				className="flex flex-col w-full max-w-[80vw] p-6 rounded-3xl border border-accent/10 shadow-lg justify-between items-center"
			>
				<HeaderSection
					handleCloseModal={() => setModalIsOpen(false)}
					selectedTransactionId={selectedTransactionId}
				/>
				<TitleSection
					transferDescription={data.narration}
					amount={data.amount}
					statusCategory={statusCategory}
					isReversed={data.is_reversed}
				/>
				<TransactionSummary
					amount={data.amount}
					fee={data.fee}
					currencyName={currencyName}
				/>
				<TransactionDetails
					description={data.narration}
					reference={data.transaction_reference}
					stan={data.stan}
					statusCategory={statusCategory}
					date={formatDate(data.transaction_date)}
					responseMessage={data.payment_response_message}
				/>
			</View>
		</View>
	);
};

const HeaderSection = ({ handleCloseModal, selectedTransactionId }) => (
	<View className="flex flex-row justify-between items-center mb-4 w-full">
		<Text className="text-2xl">Transaction Details</Text>
		<Text className="text-lg">ID: {selectedTransactionId || "N/A"}</Text>
		<TouchableOpacity onPress={handleCloseModal}>
			<Icon name="close" size={24} color="black" />
		</TouchableOpacity>
	</View>
);

const TitleSection = ({
	transferDescription,
	amount,
	statusCategory,
	isReversed,
}) => (
	<View
		className={`p-4 rounded-lg mb-4 w-full justify-center flex items-center ${
			statusCategory === "Successful" ? "bg-green-100" : "bg-red-100"
		}`}
	>
		<Text className="text-lg">{transferDescription}</Text>
		<Text className="text-xl font-bold">
			₦{amount.toLocaleString("en-US", { minimumFractionDigits: 2 }) || "0.00"}
		</Text>
		{isReversed && (
			<Text className="text-red-600">This transaction was reversed</Text>
		)}
		<View className="flex flex-row items-center justify-center space-x-1">
			<Icon
				name={
					statusCategory === "Successful" ? "checkmark-circle" : "close-circle"
				}
				className={`text-lg ${
					statusCategory === "Successful" ? "text-green-800" : "text-red-800"
				}`}
				size={16}
				color="currentColor"
			/>
			<Text
				className={`flex flex-row items-center text-lg ${
					statusCategory === "Successful" ? "text-green-800" : "text-red-800"
				}`}
			>
				{statusCategory}
			</Text>
		</View>
	</View>
);

const TransactionSummary = ({ amount, fee, currencyName }) => {
	return (
		<View className="mb-4 bg-white p-4 rounded-lg w-full shadow">
			<Text>
				Amount ({currencyName}): ₦
				{amount.toLocaleString("en-US", { minimumFractionDigits: 2 }) || "0.00"}
			</Text>
			<Text>
				Fee: ₦
				{fee || "0.00"}
			</Text>
		</View>
	);
};

const TransactionDetails = ({
	description,
	reference,
	stan,
	statusCategory,
	date,
	responseMessage,
}) => (
	<View className="mb-4 bg-white p-4 rounded-lg shadow w-full">
		<Text>Description: {description}</Text>
		<Text>Reference: {reference || "N/A"}</Text>
		<Text>STAN: {stan || "N/A"}</Text>
		<Text>Status: {statusCategory}</Text>
		<Text>Date: {date}</Text>
		<Text>Response Message: {responseMessage || "No response"}</Text>
	</View>
);

export default TransDetails;
