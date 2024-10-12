import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Using Ionicons for icons
import transactions from "../../data/transactions";
import { useToast } from "../../contexts/ToastContext";
import { LinearGradient } from "expo-linear-gradient";
import * as NavigationBar from "expo-navigation-bar";
import logo from "./../../assets/icon.png";

// Function to map currency ID to currency name (ISO 4217)
const getCurrencyName = (currencyId) => {
	return currencyId === "NGN" ? "NGN" : "NGN"; // Fallback for other currencies
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

	// Move AuthProvider outside the return statement to ensure useAuth can be used
	useEffect(() => {
		const setNavBar = async () => {
			await NavigationBar.setBackgroundColorAsync("white"); // Set the navigation bar background color to white
			await NavigationBar.setButtonStyleAsync("dark"); // Set button styles to dark
		};

		setNavBar();

		// Cleanup function to reset the styles when unmounted
		return () => {
			NavigationBar.setBackgroundColorAsync("transparent");
			NavigationBar.setButtonStyleAsync("light");
		};
	}, []);

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
		<LinearGradient
			colors={
				statusCategory === "Successful"
					? ["#fff", "#f0fff4", "#fff"] // Greenish shade for success
					: statusCategory === "Pending"
					? ["#fff", "#fffbe0", "#fff"] // Yellowish shade for pending
					: ["#fff", "#ffe0e0", "#fff"] // Reddish shade for failure
			}
			className="flex flex-col w-full h-full p-6 bg-backgroundLight  justify-start items-center"
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
			<View className="w-full flex-row justify-between mt-auto mb-4 p-2">
				<TouchableOpacity
					className="flex-1 mr-2 bg-gray-200 py-3 rounded-3xl flex-row items-center justify-center"
					onPress={() => console.log("CTA 1 Pressed")}
				>
					<Icon
						name="alert-circle-outline"
						size={20}
						color="gray"
						className="mr-2"
					/>
					<Text className="text-center font-bold text-gray-700">
						Report an issue
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="flex-1 ml-2 bg-green-500 py-3 rounded-3xl flex-row items-center justify-center"
					onPress={() => console.log("CTA 2 Pressed")}
				>
					<Icon
						name="share-social-outline"
						size={20}
						color="white"
						className="mr-2"
					/>
					<Text className="text-center font-bold text-white">
						Share Receipt
					</Text>
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);
};

const HeaderSection = ({ handleCloseModal, selectedTransactionId }) => (
	<View className="flex flex-row justify-between items-center mb-10 w-full">
		<TouchableOpacity onPress={handleCloseModal}>
			<Icon name="arrow-back" size={24} color="black" />
		</TouchableOpacity>
		<Text className="text-xl">Transaction Details</Text>
		<Text className="text-lg">ID: {selectedTransactionId || "N/A"}</Text>
	</View>
);

const TitleSection = ({
	transferDescription,
	amount,
	statusCategory,
	isReversed,
}) => (
	<View
		className={`p-6 pt-10 rounded-2xl mb-4 w-full justify-center space-y-4 flex items-center relative ${
			statusCategory === "Successful"
				? "bg-green-100"
				: statusCategory === "Pending"
				? "bg-yellow-100" // Background color for Pending status
				: "bg-red-100"
		}`}
	>
		<View className="absolute -top-6 flex items-center justify-center">
			<View className="border border-gray-400/50 rounded-full bg-green-100">
				<Image
					source={logo}
					resizeMode="fit"
					className="w-12 h-12 rounded-full"
				/>
			</View>

			<Text className="font-bold">SSB</Text>
		</View>
		<Text className="text-lg">{transferDescription}</Text>
		<View className="flex justify-center items-center">
			<Text className="text-3xl font-bold">
				₦
				{amount.toLocaleString("en-US", { minimumFractionDigits: 2 }) || "0.00"}
			</Text>
			{isReversed && (
				<Text className="text-red-600">This transaction was reversed</Text>
			)}
			<View className="flex flex-row items-center justify-center space-x-1">
				<Icon
					name={
						statusCategory === "Successful"
							? "checkmark-circle"
							: statusCategory === "Pending"
							? "time-outline" // Icon for pending status
							: "close-circle"
					}
					className={`text-lg ${
						statusCategory === "Successful"
							? "text-green-800"
							: statusCategory === "Pending"
							? "text-yellow-500" // Styling for pending status
							: "text-red-800"
					}`}
					size={16}
					color="currentColor"
				/>

				<Text
					className={`flex flex-row items-center text-lg ${
						statusCategory === "Successful"
							? "text-green-800"
							: statusCategory === "Pending"
							? "text-yellow-800" // Text color for Pending status
							: "text-red-800"
					}`}
				>
					{statusCategory}
				</Text>
			</View>
		</View>
	</View>
);

const TransactionSummary = ({ amount, fee, currencyName }) => {
	return (
		<View className="mb-4 bg-white p-4 rounded-2xl space-y-2 w-full shadow">
			<Text>
				Amount ({currencyName}): ₦
				{amount.toLocaleString("en-US", { minimumFractionDigits: 2 }) || "0.00"}
			</Text>
			<Text>Fee: ₦{fee || "0.00"}</Text>
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
}) => {
	return (
		<View className="mb-4 bg-white p-6 rounded-2xl shadow w-full">
			{/* Section Header */}
			<Text className="text-lg font-bold mb-4 text-gray-800">
				Transaction Details
			</Text>

			{/* Detail Row: Description */}
			<View className="flex flex-row justify-between mb-2">
				<Text className="text-gray-500 font-medium">Description:</Text>
				<Text className="text-gray-900 font-semibold text-right">
					{description || "N/A"}
				</Text>
			</View>

			{/* Detail Row: Reference */}
			<View className="flex flex-row justify-between mb-2">
				<Text className="text-gray-500 font-medium">Reference:</Text>
				<Text className="text-gray-900 font-semibold text-right">
					{reference || "N/A"}
				</Text>
			</View>

			{/* Detail Row: STAN */}
			<View className="flex flex-row justify-between mb-2">
				<Text className="text-gray-500 font-medium">STAN:</Text>
				<Text className="text-gray-900 font-semibold text-right">
					{stan || "N/A"}
				</Text>
			</View>

			{/* Detail Row: Status */}
			<View className="flex flex-row justify-between mb-2">
				<Text className="text-gray-500 font-medium">Status:</Text>
				<Text
					className={`text-right font-semibold ${
						statusCategory === "Successful"
							? "text-green-600"
							: statusCategory === "Pending"
							? "text-yellow-500"
							: "text-red-600"
					}`}
				>
					{statusCategory}
				</Text>
			</View>

			{/* Detail Row: Date */}
			<View className="flex flex-row justify-between mb-2">
				<Text className="text-gray-500 font-medium">Date:</Text>
				<Text className="text-gray-900 font-semibold text-right">
					{date || "N/A"}
				</Text>
			</View>

			<View
				className={`mt-4 p-3 rounded-xl ${
					statusCategory === "Successful"
						? "bg-green-100 text-green-700"
						: statusCategory === "Pending"
						? "bg-yellow-100 text-yellow-700"
						: "bg-red-100 text-red-700"
				}`}
			>
				<Text className="text-center font-semibold">
					{responseMessage ||
						(statusCategory === "Successful"
							? "Transaction completed successfully"
							: statusCategory === "Pending"
							? "Transaction is pending"
							: "Transaction failed. Please try again.")}
				</Text>
			</View>
		</View>
	);
};

export default TransDetails;
