import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import ProviderSelector from "./ProviderSelector";
import ConfirmModal from "./ConfirmModal";

const DataSection = () => {
	const [selectedProvider, setSelectedProvider] = useState(null);
	const [selectedPlan, setSelectedPlan] = useState(null);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const dataPlans = [
		{
			id: "1",
			name: "Daily",
			plans: [
				{ id: "d1", data: "1GB", duration: "1 Day", price: 300, cashback: 10 },
				{ id: "d2", data: "2GB", duration: "1 Day", price: 500, cashback: 20 },
			],
		},
		{
			id: "2",
			name: "Weekly",
			plans: [
				{
					id: "w1",
					data: "5GB",
					duration: "7 Days",
					price: 1500,
					cashback: 50,
				},
				{
					id: "w2",
					data: "10GB",
					duration: "7 Days",
					price: 2500,
					cashback: 100,
				},
			],
		},
		// Add more categories and plans as needed
	];

	const handleConfirm = () => {
		// Handle confirmation logic
		setShowConfirmModal(false);
	};

	const renderPlanItem = ({ item }) => (
		<TouchableOpacity
			className="bg-white p-3 rounded-lg mb-2 mr-2"
			onPress={() => {
				setSelectedPlan(item);
				setShowConfirmModal(true);
			}}
		>
			<Text className="font-bold">{item.data}</Text>
			<Text>{item.duration}</Text>
			<Text>₦{item.price}</Text>
			<Text className="text-green-600">Cashback: ₦{item.cashback}</Text>
		</TouchableOpacity>
	);

	const renderCategory = ({ item }) => (
		<View className="mb-4">
			<Text className="font-bold mb-2">{item.name}</Text>
			<FlatList
				data={item.plans}
				renderItem={renderPlanItem}
				keyExtractor={(plan) => plan.id}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);

	return (
		<View className="space-y-4">
			<ProviderSelector onSelect={setSelectedProvider} />

			<FlatList
				data={dataPlans}
				renderItem={renderCategory}
				keyExtractor={(category) => category.id}
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
				}}
			/>
		</View>
	);
};

export default DataSection;
