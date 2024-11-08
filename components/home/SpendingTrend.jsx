import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	TouchableWithoutFeedback,
} from "react-native";
import { RadioButton } from "react-native-paper";

const SpendingTrend = ({ totalCredit, totalDebit, statusCategory }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [timeFilter, setTimeFilter] = useState("This Week");

	// Options for dropdown filter
	const filterOptions = ["This Week", "This Month"];

	const handleOptionSelect = (option) => {
		setTimeFilter(option);
		setModalVisible(false); // Close modal when an option is selected
	};

	return (
		<View className="flex flex-col mb-6 gap-4">
			<View className="flex-row justify-between items-center">
				<Text className="text-gray-500">Spending Trend</Text>

				{/* Dropdown button */}
				<TouchableOpacity
					className="flex flex-row space-x-1"
					onPress={() => setModalVisible(true)}
				>
					<Text style={{ color: "#008773" }}>{timeFilter}</Text>
					<Ionicons name="chevron-down" size={16} color="#008773" />
				</TouchableOpacity>

				{/* Dropdown Modal */}
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => setModalVisible(false)}
				>
					<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
						<View
							style={{
								flex: 1,
								backgroundColor: "rgba(0, 0, 0, 0.5)",
							}}
						>
							<View style={{ flex: 1, justifyContent: "flex-start" }}>
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
									<RadioButton.Group
										onValueChange={(newValue) => {
											handleOptionSelect(newValue);
										}}
										value={timeFilter}
									>
										{filterOptions.map((option) => (
											<TouchableOpacity
												key={option}
												className="flex-row items-center py-2"
												onPress={() => handleOptionSelect(option)} // Change value on row press
											>
												<RadioButton
													value={option}
													color="#008773" // Teal color for radio button
												/>
												<Text className="ml-2">{option}</Text>
												{/* Add margin to separate text from button */}
											</TouchableOpacity>
										))}
									</RadioButton.Group>
								</View>
								{/* Drag Indicator Bar */}
								<View
									style={{
										height: 4,
										width: 80,
										backgroundColor: "#ccc", // Customize color
										borderRadius: 2,
										alignSelf: "center",
										marginTop: 8,
									}}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
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
				className="px-1"
			>
				<View className="flex-row items-center bg-slate-50 p-4 rounded-xl w-[47%]">
					<StatusIcon
						iconName="arrow-down"
						iconColor="#008773"
						status={statusCategory}
					/>
					<View className="flex ml-2 space-y-[2px] flex-col">
						<Text className="text-slate-500" style={{ marginLeft: 4 }}>
							Cash In
						</Text>
						<Text style={{ color: "#000", marginLeft: 4 }}>
							₦
							{totalCredit.toLocaleString("en-NG", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
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
						<Text className="text-slate-500" style={{ marginLeft: 4 }}>
							Cash Out
						</Text>
						<Text style={{ color: "#000", marginLeft: 4 }}>
							₦
							{totalDebit.toLocaleString("en-NG", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
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
