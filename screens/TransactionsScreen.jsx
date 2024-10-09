import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useToast } from "../contexts/ToastContext";

const TransactionsScreen = () => {
	const { showToast } = useToast();

	const handleSuccess = () => {
		showToast("Operation was successful!", "success");
	};

	const handleError = () => {
		showToast("Something went wrong.", "error");
	};

	const handleWarning = () => {
		showToast("Be cautious!", "warning");
	};

	const tryCatchFunction = async () => {
		try {
			// Simulate successful API call
			handleSuccess();
		} catch (error) {
			handleError();
		}
	};
	return (
		<LinearGradient
			colors={["#fff", "#f0fff4", "#fff"]}
			className="flex-1 justify-center items-center p-4"
		>
			<Text className="text-2xl font-bold mb-2">Transactions</Text>
			<Text className="text-lg text-center">
				This is the Transactions page. Here you can view and manage your
				transactions.
			</Text>
			{/* You can add more components here as needed */}
			<Button title="Show Success Toast" onPress={handleSuccess} />
			<Button title="Show Error Toast" onPress={handleError} />
			<Button title="Show Warning Toast" onPress={handleWarning} />
			<Button title="Simulate API Call" onPress={tryCatchFunction} />
		</LinearGradient>
	);
};

export default TransactionsScreen;
