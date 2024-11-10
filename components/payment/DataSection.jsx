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
import { serviceProviders } from "../../data/dataPlans";
import { useAuth } from "../../contexts/AuthContext";
import ServiceBanner from "./ServiceBanner";

const DataSection = () => {
	const { user } = useAuth();
	const [phoneNumber, setPhoneNumber] = useState(user?.phone || "08012345678");
	const [selectedProvider, setSelectedProvider] = useState(
		serviceProviders.mtn
	);
	const [selectedTimePeriod, setSelectedTimePeriod] = useState("Daily");
	const [selectedPlan, setSelectedPlan] = useState({
		price: null,
		cashback: null,
	});
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const timePeriods = [
		"Daily",
		"Weekly",
		"Monthly",
		"2 Months",
		"3 Months",
		"Yearly",
	];

	const handleConfirm = () => {
		// Handle confirmation logic
		setShowConfirmModal(false);
	};

	const renderTimePeriodItem = ({ item }) => (
		<TouchableOpacity
			className={`p-2 rounded-lg m-1 ${
				selectedTimePeriod === item ? "bg-[#008773]" : "bg-[#E5E7EB]"
			}`}
			onPress={() => setSelectedTimePeriod(item)}
		>
			<Text
				className={`text-center ${
					selectedTimePeriod === item ? "text-white" : "text-[#4B5563]"
				}`}
			>
				{item}
			</Text>
		</TouchableOpacity>
	);

	const renderPlanItem = ({ item }) => (
		<TouchableOpacity
			className="bg-white p-3 rounded-lg m-1 flex-1 min-w-[30%]"
			onPress={() => {
				setSelectedPlan(item);
				setShowConfirmModal(true);
			}}
		>
			<Text className="font-bold text-center">{item.data}</Text>
			<Text className="text-center">{item.duration}</Text>
			<Text className="text-center">
				{item.price ? `₦${item.price}` : "Price N/A"}
			</Text>
			<Text className="text-center text-teal-500">
				Cashback: {item.cashback ? `₦${item.cashback}` : "N/A"}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View className="space-y-4">
			<ServiceBanner selectedProvider={selectedProvider.id} />
			<View className="flex-row items-center bg-white rounded-lg p-2">
				<ProviderSelector
					onSelect={setSelectedProvider}
					selectedProvider={selectedProvider}
				/>
				<TextInput
					className="flex-1 ml-2 text-base"
					placeholder="Enter phone number"
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					keyboardType="phone-pad"
				/>
				<TouchableOpacity className="p-2">
					<Ionicons name="person-circle" size={24} color="#008773" />
				</TouchableOpacity>
			</View>

			<FlatList
				data={timePeriods}
				renderItem={renderTimePeriodItem}
				keyExtractor={(item) => item}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>

			<FlatList
				data={selectedProvider?.plans?.[selectedTimePeriod] || []}
				renderItem={renderPlanItem}
				keyExtractor={(item) => item.id}
				numColumns={3}
				scrollEnabled={false}
			/>

			<ConfirmModal
				visible={showConfirmModal}
				onClose={() => setShowConfirmModal(false)}
				onConfirm={handleConfirm}
				details={{
					type: "Data",
					provider: selectedProvider,
					plan: selectedPlan,
					phoneNumber: phoneNumber,
				}}
			/>
		</View>
	);
};

export default DataSection;
