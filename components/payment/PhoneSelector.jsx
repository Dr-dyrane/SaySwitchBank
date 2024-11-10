import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { serviceProviders } from "../../data/dataPlans";
import ProviderSelector from "./ProviderSelector";

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

		// Remove non-digit characters (including + sign)
		let cleaned = number.replace(/\D/g, "");

		// Check if the number starts with "234" (without +) or "+234" and convert it to "080"
		if (cleaned.startsWith("234")) {
			cleaned = "0" + cleaned.substring(3); // Replace "234" with "0"
		} else if (cleaned.startsWith("0")) {
			// Already starts with "0", no change needed
		} else {
			return ""; // Invalid number format
		}

		// Limit to 11 digits
		const limited = cleaned.substring(0, 11);

		// Format the phone number
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

	useEffect(() => {
		if (phoneNumber.length >= 4) {
			// Remove spaces from the phone number
			const cleanedPhoneNumber = phoneNumber.replace(/\s/g, "");
			// Extract the first 4 characters (prefix)
			const prefix = cleanedPhoneNumber.substring(0, 4);
			console.log("Extracted Prefix:", prefix);
			const detectedProvider = providerPrefixes[prefix];
			if (detectedProvider && serviceProviders[detectedProvider]) {
				setSelectedProvider(serviceProviders[detectedProvider]);
				onSelectProvider(serviceProviders[detectedProvider]);
			}
		}
	}, [phoneNumber]);

	const handlePhoneNumberChange = (text) => {
		// Remove non-digit characters
		const cleaned = text.replace(/\D/g, "");

		// Limit to 11 digits
		const limited = cleaned.substring(0, 11);

		// Format the phone number
		let formatted = limited;
		if (limited.length > 3) {
			formatted = `${limited.substring(0, 3)} ${limited.substring(3)}`;
		}
		if (limited.length > 7) {
			formatted = `${formatted.substring(0, 8)} ${formatted.substring(8)}`;
		}

		setPhoneNumber(formatted);
		onChangePhoneNumber(formatted);
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
				maxLength={13} // 11 digits + 2 spaces
			/>
			<TouchableOpacity className="p-2">
				<Ionicons name="person-circle" size={24} color="#008773" />
			</TouchableOpacity>
		</View>
	);
};

export default PhoneSelector;
