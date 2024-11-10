import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { serviceProviders } from "../../data/dataPlans";

const ProviderSelector = ({ onSelect, selectedProvider }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleSelect = (provider) => {
		onSelect(provider);
		setModalVisible(false);
	};

	return (
		<View>
			<TouchableOpacity
				onPress={() => setModalVisible(true)}
				className="flex-row items-center"
			>
				<Ionicons
					name={selectedProvider?.icon || "help-circle"}
					size={24}
					color="#008773"
				/>
				<Ionicons
					name="chevron-down"
					size={16}
					color="#008773"
					className="ml-1"
				/>
			</TouchableOpacity>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<TouchableOpacity
					className="flex-1 bg-black bg-opacity-50"
					activeOpacity={1}
					onPress={() => setModalVisible(false)}
				>
					<View className="flex-1 justify-end">
						<View className="bg-white rounded-t-2xl p-4">
							<View className="w-10 h-1 bg-[#CCC] rounded-full self-center mb-4" />
							<Text className="text-xl font-bold mb-4">Select Provider</Text>
							<FlatList
								data={Object.values(serviceProviders)}
								keyExtractor={(item) => item?.id || ""}
								renderItem={({ item }) => (
									<TouchableOpacity
										className="flex-row items-center py-3 border-b border-[#E5E7EB]"
										onPress={() => handleSelect(item)}
									>
										<Ionicons
											name={item?.icon || "help-circle"}
											size={24}
											color="#008773"
											className="mr-3"
										/>
										<Text>{item?.name || "Unknown Provider"}</Text>
									</TouchableOpacity>
								)}
							/>
						</View>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

export default ProviderSelector;
