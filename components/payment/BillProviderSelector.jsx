import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	FlatList,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

const billProviders = {
	electricity: [
		{ id: "eko", name: "Eko Electricity", logo: "flash" },
		{ id: "ikeja", name: "Ikeja Electric", logo: "flash" },
		{ id: "ibadan", name: "Ibadan Electricity", logo: "flash" },
	],
	TV: [
		{ id: "dstv", name: "DSTV", logo: "tv" },
		{ id: "gotv", name: "GOtv", logo: "tv" },
		{ id: "startimes", name: "StarTimes", logo: "tv" },
	],
	water: [
		{ id: "lagos", name: "Lagos Water Corporation", logo: "water" },
		{ id: "abuja", name: "Abuja Water Board", logo: "water" },
		{ id: "kaduna", name: "Kaduna Water Board", logo: "water" },
	],
};

const BillProviderSelector = ({ billType, onSelect, selectedProvider }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleSelect = (provider) => {
		onSelect(provider);
		setModalVisible(false);
	};

	const renderProviderIcon = (provider) => (
		<View className="w-6 h-6 bg-gray-200 rounded-full items-center justify-center">
			<Ionicons name={provider?.logo} size={16} color="#008773" />
		</View>
	);

	return (
		<View>
			<TouchableOpacity
				onPress={() => setModalVisible(true)}
				className="flex-row items-center space-x-2 bg-slate-50 p-3 rounded-xl justify-between"
			>
				<View className='flex flex-row items-center justify-center gap-2'>
					{renderProviderIcon(selectedProvider)}
					<Text>{selectedProvider?.name}</Text>
				</View>

				<Ionicons name="chevron-down" size={16} color="gray" />
			</TouchableOpacity>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
					<View className="flex-1 bg-black/50">
						<View className="flex-1 justify-start">
							<View className="bg-white rounded-b-3xl p-4 shadow-lg">
								<Text className="text-lg font-bold mb-2">Select Provider</Text>
								<RadioButton.Group
									onValueChange={(newValue) =>
										handleSelect(
											billProviders[billType].find((p) => p.id === newValue)
										)
									}
									value={selectedProvider?.id}
								>
									{billProviders[billType].map((provider) => (
										<TouchableOpacity
											key={provider?.id}
											className="flex-row items-center justify-between py-2"
											onPress={() => handleSelect(provider)}
										>
											<View className="flex-row items-center ml-2">
												{renderProviderIcon(provider)}
												<Text className="ml-2">{provider.name}</Text>
											</View>
											<RadioButton value={provider?.id} color="#008773" />
										</TouchableOpacity>
									))}
								</RadioButton.Group>
							</View>
							<View className="h-1 w-20 bg-gray-300 rounded-full self-center mt-2" />
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
};

export default BillProviderSelector;
