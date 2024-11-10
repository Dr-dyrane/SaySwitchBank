import React, { useState } from "react";
import { View, Text, TextInput,TouchableOpacity, FlatList } from "react-native";
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
			className="bg-white p-4 rounded-xl m-1 flex-1 min-w-[30%]"
			onPress={() => {
				setAmount(item.toString());
				setShowConfirmModal(true);
			}}
		>
			<Text className="text-center font-bold">₦{item}</Text>
			<Text className="text-center text-xs text-teal-500">
				Cashback: ₦{Math.floor(item * 0.02)}
			</Text>
		</TouchableOpacity>
	);

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

			<View className="flex-row items-center bg-white rounded-xl p-2">
				<TextInput
					className="flex-1 text-base"
					placeholder="Enter custom amount"
					value={amount}
					onChangeText={setAmount}
					keyboardType="numeric"
				/>
				<TouchableOpacity
					className="bg-[#008773] py-2 px-4 rounded-xl"
					onPress={() => setShowConfirmModal(true)}
				>
					<Text className="text-white font-bold">Pay ₦{amount || "0"}</Text>
				</TouchableOpacity>
			</View>

			<ConfirmModal
				visible={showConfirmModal}
				onClose={() => setShowConfirmModal(false)}
				onConfirm={handleConfirm}
				details={{
					type: "Airtime",
					provider: selectedProvider,
					amount: amount,
					phoneNumber: phoneNumber,
				}}
			/>
		</View>
	);
};

export default AirtimeSection;
