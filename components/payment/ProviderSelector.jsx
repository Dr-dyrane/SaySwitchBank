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
import { serviceProviders } from "../../data/dataPlans";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

const providerLogos = {
	mtn: require("../../assets/payment/serviceProvider/logo/MTN.png"),
	glo: require("../../assets/payment/serviceProvider/logo/Globacom.png"),
	airtel: require("../../assets/payment/serviceProvider/logo/Airtel Nigeria.png"),
	"9mobile": require("../../assets/payment/serviceProvider/logo/9mobile.png"),
};

const logoStyles = {
	mtn: { backgroundColor: "#FFCD00", borderRadius: 999, padding: 2 },
	glo: {},
	airtel: {},
	"9mobile": {},
};

const ProviderSelector = ({ onSelect, selectedProvider }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleSelect = (provider) => {
		onSelect(provider);
		setModalVisible(false);
	};

	const renderProviderLogo = (providerId) => (
		<View className="w-6 h-6" style={logoStyles[providerId]}>
			<Image
				source={providerLogos[providerId]}
				className="w-full h-full"
				resizeMode="contain"
			/>
		</View>
	);

	return (
		<View>
			<TouchableOpacity
				onPress={() => setModalVisible(true)}
				className="flex-row items-center space-x-2"
			>
				{renderProviderLogo(selectedProvider.id)}
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
										handleSelect(serviceProviders[newValue])
									}
									value={selectedProvider.id}
								>
									{Object.values(serviceProviders).map((provider) => (
										<TouchableOpacity
											key={provider.id}
											className="flex-row items-center justify-between py-2"
											onPress={() => handleSelect(provider)}
										>
											<View className="flex-row items-center ml-2">
												{renderProviderLogo(provider.id)}
												<Text className="ml-2">{provider.name}</Text>
											</View>
											<RadioButton value={provider.id} color="#008773" />
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

export default ProviderSelector;
