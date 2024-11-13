import React from "react";
import { View, Text, Image } from "react-native";
import bankLogo from "../../assets/transfer/bank.png";
import nfcLogo from "../../assets/transfer/nfc.png";

const TransferBanner = ({ type }) => {
	const getTitle = () => {
		switch (type) {
			case "bank":
				return "Bank Transfer";
			case "nfc":
				return "Tap to Pay";
			default:
				return "Make a Transfer";
		}
	};

	const getMessage = () => {
		switch (type) {
			case "bank":
				return "Transfer funds securely to the provided account number";
			case "nfc":
				return "Tap to make a fast and secure payment with your device";
			default:
				return "Select a transfer method to complete your payment";
		}
	};

	// Select image and aspect ratio based on type
	const getImage = () => {
		if (type === "bank") {
			return { source: bankLogo, aspectRatio: 2000 / 1168 };
		} else if (type === "nfc") {
			return { source: nfcLogo, aspectRatio: 2000 / 762 };
		} else {
			return { source: bankLogo, aspectRatio: 2000 / 1168 }; // Default fallback
		}
	};

	const { source, aspectRatio } = getImage();

	return (
		<View className="w-full bg-primary rounded-2xl overflow-hidden flex-col pb-2 mb-6">
			{/* Text Section */}
			<View className="p-4 pb-[2px] justify-center">
				<Text className="text-2xl font-bold text-white mb-1.5">{getTitle()}</Text>
				<Text className="text-base text-white opacity-80">{getMessage()}</Text>
			</View>

			{/* Image Section */}
			<View
				className="flex h-36 justify-center items-center w-full"
			>
				<Image source={source} style={{ aspectRatio }} className="w-full h-full object-cover" />
			</View>
		</View>
	);
};

export default TransferBanner;
