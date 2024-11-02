import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	StyleSheet,
} from "react-native";

const PayoutScreen = () => {
	const [amount, setAmount] = useState("");
	const [account, setAccount] = useState("");

	const handlePayout = () => {
		if (!amount || !account) {
			alert("Please enter both amount and account details.");
			return;
		}

		// Simulate a payout action (replace with actual payout logic)
		alert(`You have requested a payout of ${amount} to account ${account}.`);
	};

	return (
		<View className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8">
			<Text className="text-2xl font-bold text-teal-600 mb-6">
				Request Payout
			</Text>

			<Text className="w-full max-w-md text-left text-gray-700 font-medium mt-4">
				Amount
			</Text>
			<TextInput
				className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 mt-2 text-lg focus:outline-none focus:border-teal-600"
				keyboardType="numeric"
				value={amount}
				onChangeText={setAmount}
				placeholder="Enter amount"
			/>

			<Text className="w-full max-w-md text-left text-gray-700 font-medium mt-6">
				Account Number
			</Text>
			<TextInput
				className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 mt-2 text-lg focus:outline-none focus:border-teal-600"
				keyboardType="default"
				value={account}
				onChangeText={setAccount}
				placeholder="Enter account number"
			/>

			<TouchableOpacity
				onPress={handlePayout}
				className="w-full max-w-md mt-8 py-3 bg-teal-600 rounded-md"
			>
				<Text className="text-white font-semibold text-center">
					Submit Payout
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default PayoutScreen;
