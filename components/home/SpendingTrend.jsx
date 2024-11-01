import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";

const SpendingTrend = ({ totalCredit, totalDebit, statusCategory }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [timeFilter, setTimeFilter] = useState("This Week");

	// Options for dropdown filter
	const filterOptions = ["This Week", "This Month"];

	// Handle selection from dropdown
	const handleFilterSelect = (filter) => {
		setTimeFilter(filter);
		setModalVisible(false);
		// Add filtering logic here to update the spending trend based on selected filter
	};

	return (
		<View className="flex flex-col mb-6 gap-4">
			<View className="flex-row justify-between items-center">
				<Text className="text-gray-500">Spending Trend</Text>

				{/* Dropdown button */}
				<TouchableOpacity className='flex flex-row space-x-1' onPress={() => setModalVisible(true)}>
					<Text style={{ color: "#1E90FF" }}>{timeFilter}</Text>
					<Ionicons name="chevron-down" size={16} color="#1E90FF" />
				</TouchableOpacity>

				{/* Dropdown Modal */}
				<Modal
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => setModalVisible(false)}
				>
					<TouchableOpacity
						style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
						onPress={() => setModalVisible(false)}
					>
						<View
							className="rounded-b-3xl"
							style={{
								backgroundColor: "white",
								margin: 0,
								padding: 16,
								shadowOpacity: 0.3,
								shadowRadius: 8,
							}}
						>
							<Text className="text-lg font-bold mb-2">Select Period</Text>
							<FlatList
								data={filterOptions}
								keyExtractor={(item) => item}
								renderItem={({ item }) => (
									<TouchableOpacity onPress={() => handleFilterSelect(item)}>
										<Text
											style={{ padding: 10, textAlign: "left", fontSize: 16 }}
										>
											{item}
										</Text>
									</TouchableOpacity>
								)}
							/>
						</View>
					</TouchableOpacity>
				</Modal>
			</View>

			{/* Mini dataset of Debit vs Credit */}
			<View
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					justifyContent: "space-between",
					marginBottom: 0,
				}}
			>
				<View className="flex-row items-center bg-slate-50 p-4 rounded-xl w-[47%]">
					<StatusIcon
						iconName="arrow-down"
						iconColor="#008773"
						status={statusCategory}
					/>
					<View className="flex ml-2 space-y-.5 flex-col">
						<Text style={{ color: "gray", marginLeft: 4 }}>Money In</Text>
						<Text style={{ color: "#000", marginLeft: 4 }}>
							₦{totalCredit.toFixed(2)}
						</Text>
					</View>
				</View>

				<View className="flex-row items-center bg-slate-50 p-4 rounded-xl w-[47%]">
					<StatusIcon
						iconName="arrow-up"
						iconColor="red"
						status={statusCategory}
					/>
					<View className="flex ml-2 space-y-.5 flex-col">
						<Text style={{ color: "gray", marginLeft: 4 }}>Money Out</Text>
						<Text style={{ color: "#000", marginLeft: 4 }}>
							₦{totalDebit.toFixed(2)}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default SpendingTrend;

// Modular StatusIcon Component
const StatusIcon = ({ iconName, iconColor, status }) => {
	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
				padding: 5,
				borderRadius: 999, // Fully rounded
				backgroundColor: "white",
			}}
		>
			<Ionicons name={iconName} size={20} color={iconColor} />
		</View>
	);
};
