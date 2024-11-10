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
			style={{
				backgroundColor: "#FFFFFF",
				padding: 16,
				borderRadius: 10,
				margin: 4,
				flex: 1,
				minWidth: "30%",
			}}
			onPress={() => {
				setAmount(item.toString());
				setShowConfirmModal(true);
			}}
		>
			<Text style={{ textAlign: "center", fontWeight: "bold" }}>₦{item}</Text>
			<Text style={{ textAlign: "center", fontSize: 12, color: "#16A34A" }}>
				Cashback: ₦{Math.floor(item * 0.02)}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View style={{ gap: 16 }}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					backgroundColor: "#FFFFFF",
					borderRadius: 10,
					padding: 8,
				}}
			>
				<ProviderSelector
					onSelect={setSelectedProvider}
					selectedProvider={selectedProvider}
				/>
				<TextInput
					style={{ flex: 1, marginLeft: 8, fontSize: 16 }}
					placeholder="Enter phone number"
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					keyboardType="phone-pad"
				/>
				<TouchableOpacity style={{ padding: 8 }}>
					<Ionicons name="person-circle" size={24} color="#008773" />
				</TouchableOpacity>
			</View>

			<FlatList
				data={amounts}
				renderItem={renderAmountItem}
				keyExtractor={(item) => item.toString()}
				numColumns={3}
				scrollEnabled={false}
			/>

			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					backgroundColor: "#FFFFFF",
					borderRadius: 10,
					padding: 8,
				}}
			>
				<TextInput
					style={{ flex: 1, fontSize: 16 }}
					placeholder="Enter custom amount"
					value={amount}
					onChangeText={setAmount}
					keyboardType="numeric"
				/>
				<TouchableOpacity
					style={{
						backgroundColor: "#008773",
						paddingVertical: 8,
						paddingHorizontal: 16,
						borderRadius: 10,
					}}
					onPress={() => setShowConfirmModal(true)}
				>
					<Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
						Pay ₦{amount || "0"}
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
					amount: amount,
					phoneNumber: phoneNumber,
				}}
			/>
		</View>
	);
};

export default AirtimeSection;
