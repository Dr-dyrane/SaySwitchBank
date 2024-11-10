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
				style={{ flexDirection: "row", alignItems: "center" }}
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
					style={{ marginLeft: 4 }}
				/>
			</TouchableOpacity>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<TouchableOpacity
					style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
					activeOpacity={1}
					onPress={() => setModalVisible(false)}
				>
					<View style={{ flex: 1, justifyContent: "flex-end" }}>
						<View
							style={{
								backgroundColor: "#FFFFFF",
								borderTopLeftRadius: 30,
								borderTopRightRadius: 30,
								padding: 16,
							}}
						>
							<View
								style={{
									width: 40,
									height: 4,
									backgroundColor: "#CCC",
									borderRadius: 2,
									alignSelf: "center",
									marginBottom: 16,
								}}
							/>
							<Text
								style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}
							>
								Select Provider
							</Text>
							<FlatList
								data={Object.values(serviceProviders)}
								keyExtractor={(item) => item?.id || ""}
								renderItem={({ item }) => (
									<TouchableOpacity
										style={{
											flexDirection: "row",
											alignItems: "center",
											paddingVertical: 12,
											borderBottomColor: "#E5E7EB",
											borderBottomWidth: 1,
										}}
										onPress={() => handleSelect(item)}
									>
										<Ionicons
											name={item?.icon || "help-circle"}
											size={24}
											color="#008773"
											style={{ marginRight: 12 }}
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
