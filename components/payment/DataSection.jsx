import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProviderSelector from "./ProviderSelector";
import ConfirmModal from "./ConfirmModal";
import { serviceProviders } from "../../data/dataPlans";
import { useAuth } from "../../contexts/AuthContext";
import PhoneSelector from "./PhoneSelector";
import ServiceBanner from "./ServiceBanner";
import { useRouter } from "expo-router";
import { useToast } from "../../contexts/ToastContext";

const DataSection = () => {
	const router = useRouter();
	const { showToast } = useToast();
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
		setShowConfirmModal(false);
		setSelectedPlan({ price: null, cashback: null });
		setSelectedTimePeriod("Daily");
		showToast("Data Top Up Successful!", "success");
		router.push({ pathname: "transDetails", params: { id: 8 } });
	};

	const renderTimePeriodItem = ({ item }) => (
		<TouchableOpacity
			className={`px-2 py-1.5 rounded-xl bg-slate-50 mx-1 ${
				selectedTimePeriod === item ? " border border-primary" : ""
			}`}
			onPress={() => setSelectedTimePeriod(item)}
		>
			<Text
				className={`text-center font-normal ${
					selectedTimePeriod === item ? "text-primary" : "text-gray-500"
				}`}
			>
				{item}
			</Text>
		</TouchableOpacity>
	);

	const renderPlanItem = ({ item }) => (
		<TouchableOpacity
			className="bg-slate-50 pb-3 rounded-lg m-2 flex-1 min-w-[30%]"
			onPress={() => {
				setSelectedPlan(item);
				setShowConfirmModal(true);
			}}
		>
			<View className="mb-2 bg-teal-50 w-full rounded-t-lg p-1">
				<Text className="text-center text-xs text-primary">
					{item.cashback ? `₦${Number(item.cashback).toLocaleString()}` : "N/A"}{" "}
					Cashback
				</Text>
			</View>
			<View className="gap-1">
				<Text className="font-bold text-center">{item.data}</Text>
				<Text className="text-center text-sm text-gray-500">
					{item.duration}
				</Text>
				<Text className="text-center text-xs text-gray-500">
					{item.price ? `₦${Number(item.price).toLocaleString()}` : "Price N/A"}
				</Text>
			</View>
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
				data={timePeriods}
				renderItem={renderTimePeriodItem}
				keyExtractor={(item) => item}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					flex: 1, // Takes the full width of the screen
					justifyContent: "space-between", // Distributes items across the width
				}}
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
					amount: selectedPlan.price || 0, // Fallback to 0 if price is null
					phoneNumber: phoneNumber,
				}}
			/>
		</View>
	);
};

export default DataSection;
