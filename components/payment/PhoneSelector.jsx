import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import ProviderSelector from "./ProviderSelector";
import ContactSelector from "./ContactSelector";
import { serviceProviders } from "../../data/dataPlans";

const providerPrefixes = {
	"0803": "mtn",
	"0806": "mtn",
	"0703": "mtn",
	"0706": "mtn",
	"0813": "mtn",
	"0816": "mtn",
	"0810": "mtn",
	"0814": "mtn",
	"0903": "mtn",
	"0805": "glo",
	"0705": "glo",
	"0905": "glo",
	"0807": "glo",
	"0815": "glo",
	"0811": "glo",
	"0802": "airtel",
	"0808": "airtel",
	"0708": "airtel",
	"0812": "airtel",
	"0701": "airtel",
	"0902": "airtel",
	"0907": "airtel",
	"0901": "airtel",
	"0809": "9mobile",
	"0817": "9mobile",
	"0818": "9mobile",
	"0908": "9mobile",
	"0909": "9mobile",
};

const PhoneSelector = ({
	onSelectProvider,
	onChangePhoneNumber,
	initialPhoneNumber,
	initialProvider,
}) => {
	const formatPhoneNumber = (number) => {
		if (!number) return "";
		let cleaned = number.replace(/\D/g, "");
		if (cleaned.startsWith("234")) {
			cleaned = "0" + cleaned.substring(3);
		} else if (cleaned.startsWith("0")) {
			// Already starts with "0", no change needed
		} else {
			return ""; // Invalid number format
		}
		const limited = cleaned.substring(0, 11);
		let formatted = limited;
		if (limited.length > 3) {
			formatted = `${limited.substring(0, 3)} ${limited.substring(3)}`;
		}
		if (limited.length > 7) {
			formatted = `${formatted.substring(0, 8)} ${formatted.substring(8)}`;
		}
		return formatted;
	};

	const [phoneNumber, setPhoneNumber] = useState(
		formatPhoneNumber(initialPhoneNumber || "")
	);
	const [selectedProvider, setSelectedProvider] = useState(
		initialProvider || serviceProviders.mtn
	);
	const [isContactModalVisible, setIsContactModalVisible] = useState(false);
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		if (phoneNumber.length >= 4) {
			const cleanedPhoneNumber = phoneNumber.replace(/\s/g, "");
			const prefix = cleanedPhoneNumber.substring(0, 4);
			const detectedProvider = providerPrefixes[prefix];
			if (detectedProvider && serviceProviders[detectedProvider]) {
				setSelectedProvider(serviceProviders[detectedProvider]);
				onSelectProvider(serviceProviders[detectedProvider]);
			}
		}
	}, [phoneNumber, selectedProvider]);

	const handlePhoneNumberChange = (text) => {
		const formatted = formatPhoneNumber(text);
		setPhoneNumber(formatted);
		onChangePhoneNumber(formatted);
	};

	const openContacts = async () => {
		const { status } = await Contacts.requestPermissionsAsync();
		if (status === "granted") {
			const { data } = await Contacts.getContactsAsync({
				fields: [Contacts.Fields.PhoneNumbers],
			});
			if (data.length > 0) {
				setContacts(data);
				setIsContactModalVisible(true);
			}
		} else {
			console.log("Permission denied");
		}
	};

	const handleSelectContact = (selectedPhoneNumber) => {
		handlePhoneNumberChange(selectedPhoneNumber);
	};

	return (
		<View className="flex-row items-center space-x-2 justify-between py-2 border-gray-200 bg-slate-50 rounded-xl px-4 mt-4">
			<ProviderSelector
				onSelect={(provider) => {
					setSelectedProvider(provider);
					onSelectProvider(provider);
				}}
				selectedProvider={selectedProvider}
			/>
			<TextInput
				className="flex-1 pl-2 text-base"
				placeholder="080 3604 8719"
				value={phoneNumber}
				onChangeText={handlePhoneNumberChange}
				keyboardType="phone-pad"
				maxLength={13}
			/>
			{phoneNumber && (
				<TouchableOpacity
					onPress={() => {
						setPhoneNumber("");
						onChangePhoneNumber("");
					}}
					className="p-1 bg-red-200 rounded-full"
				>
					<Ionicons name="close" size={10} color="red" />
				</TouchableOpacity>
			)}
			<TouchableOpacity className="p-2" onPress={openContacts}>
				<Ionicons name="person-circle" size={24} color="#008773" />
			</TouchableOpacity>
			<ContactSelector
				isVisible={isContactModalVisible}
				onClose={() => setIsContactModalVisible(false)}
				onSelectContact={handleSelectContact}
				contacts={contacts}
			/>
		</View>
	);
};

export default PhoneSelector;
