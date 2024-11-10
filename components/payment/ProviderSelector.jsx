import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	FlatList,
	Image,
} from "react-native";
import { serviceProviders } from "../../data/dataPlans";

const providerLogos = {
	mtn: require("../../assets/payment/serviceProvider/logo/MTN.png"),
	glo: require("../../assets/payment/serviceProvider/logo/Globacom.png"),
	airtel: require("../../assets/payment/serviceProvider/logo/Airtel Nigeria.png"),
	"9mobile": require("../../assets/payment/serviceProvider/logo/9mobile.png"),
};

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
				<Image
					source={providerLogos[selectedProvider.id]}
					style={{ width: 24, height: 24, marginRight: 4 }}
					resizeMode="contain"
				/>
				<Text>{selectedProvider.name}</Text>
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
								keyExtractor={(item) => item.id}
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
										<Image
											source={providerLogos[item.id]}
											style={{ width: 24, height: 24, marginRight: 12 }}
											resizeMode="contain"
										/>
										<Text>{item.name}</Text>
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
