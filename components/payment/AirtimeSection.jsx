import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProviderSelector from "./ProviderSelector";
import ConfirmModal from "./ConfirmModal";
import { useAuth } from "../../contexts/AuthContext";
import { serviceProviders } from "../../data/dataPlans";
import ServiceBanner from "./ServiceBanner";
import PhoneSelector from "./PhoneSelector";

const AirtimeSection = () => {
	const { user } = useAuth();
	const [phoneNumber, setPhoneNumber] = useState(user?.phone || "08012345678");
	const [selectedProvider, setSelectedProvider] = useState(
		serviceProviders.mtn
	);
	const [amount, setAmount] = useState("");
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const amounts = [100, 200, 500, 1000, 2000, 5000];

	const handleConfirm = () => {
		// Handle confirmation logic
		setShowConfirmModal(false);
	};

	const renderAmountItem = ({ item }) => (
		<TouchableOpacity
			className="bg-slate-50 pb-4 rounded-lg m-2 flex-1 min-w-[30%]"
			onPress={() => {
				setAmount(item.toString());
				setShowConfirmModal(true);
			}}
		>
			<View className="mb-2 bg-teal-50 w-full rounded-t-lg p-1">
				<Text className="text-center text-xs text-primary">
					₦{Math.floor(item * 0.02).toLocaleString()} Cashback
				</Text>
			</View>
			<Text className="text-center font-bold">
				₦{Number(item).toLocaleString()}
			</Text>
		</TouchableOpacity>
	);

	const handleAmountChange = (value) => {
		const numericValue = parseInt(value.replace(/,/g, ""), 10); // Convert to number, ignoring commas
		if (!isNaN(numericValue)) {
			if (numericValue <= 500000) {
				setAmount(numericValue.toString()); // Only update if within range
			} else if (numericValue > 500000) {
				setAmount("500000"); // Cap at 500,000 if input exceeds limit
			} else {
				setAmount(""); // Clear if below minimum
			}
		} else {
			setAmount(""); // Clear if input is invalid
		}
	};

	return (
		<View className="space-y-4">
			<ServiceBanner selectedProvider={selectedProvider.id} />

			<PhoneSelector
				onSelectProvider={setSelectedProvider}
				onChangePhoneNumber={setPhoneNumber}
				initialPhoneNumber={phoneNumber}
				initialProvider={selectedProvider}
			/>

			<FlatList
				data={amounts}
				renderItem={renderAmountItem}
				keyExtractor={(item) => item.toString()}
				numColumns={3}
				scrollEnabled={false}
			/>

			<View className="flex-row items-center bg-slate-50 pl-4 rounded-xl">
				<Text className="mr-2">₦</Text>
				<TextInput
					className="flex-1 bg-transparent py-2"
					value={amount ? Number(amount).toLocaleString() : ""}
					onChangeText={handleAmountChange}
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
				<TouchableOpacity
					className={`p-4 rounded-xl ml-2 ${
						amount ? "bg-primary" : "bg-gray-400"
					}`}
					onPress={() => amount && setShowConfirmModal(true)} // only allow pressing if amount is set
					disabled={!amount} // disable button when amount is empty
				>
					<Text
						className={
							amount ? "text-white font-bold" : "text-gray-200 font-bold"
						}
					>
						{amount ? `Pay ₦${Number(amount).toLocaleString()}` : "Pay"}
					</Text>
				</TouchableOpacity>
			</View>

			<ConfirmModal
				visible={showConfirmModal}
				onClose={() => setShowConfirmModal(false)}
				onConfirm={handleConfirm}
				details={{
					type: "Airtime",
					provider: selectedProvider,
					amount: Number(amount), // Format amount for ConfirmModal
					phoneNumber: phoneNumber,
				}}
			/>
		</View>
	);
};

export default AirtimeSection;
