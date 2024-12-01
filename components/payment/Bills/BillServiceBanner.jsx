import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const billProviders = {
	electricity: {
		name: "Electricity",
		backgroundColor: "#FFA500", // Orange for Electricity
		textColor: "#000000", // Black for contrast
		icon: "flash",
		description: "Pay your electricity bills quickly and easily!",
	},
	TV: {
		name: "TV Subscription",
		backgroundColor: "#4B0082", // Indigo for TV
		textColor: "#FFFFFF", // White for contrast
		icon: "tv",
		description: "Renew your TV subscription hassle-free!",
	},
	water: {
		name: "Water Bill",
		backgroundColor: "#1E90FF", // DodgerBlue for Water
		textColor: "#FFFFFF", // White for contrast
		icon: "water",
		description: "Stay on top of your water bills with easy payments!",
	},
};

export default function BillServiceBanner({ selectedProvider }) {
	const billType = selectedProvider ? selectedProvider.type : "electricity";
	const provider = billProviders[billType] || billProviders.electricity;

	return (
		<View
			className={`w-full flex flex-col h-auto rounded-2xl overflow-hidden pt-4 relative mb-6`}
			style={{ backgroundColor: provider.backgroundColor }}
		>
			<View className="flex flex-1 justify-center items-center mb-4">
				<Text
					className={`text-2xl text-center font-bold mb-2`}
					style={{ color: provider.textColor }}
				>
					{provider.name} Payment
				</Text>
				<Text
					className={`text-base text-center opacity-80 mb-4`}
					style={{ color: provider.textColor }}
				>
					{provider.description}
				</Text>
				<View className="flex-row items-center">
					<View className="w-8 h-8 bg-white rounded-full items-center justify-center mr-2">
						<Ionicons
							name={provider.icon}
							size={24}
							color={provider.backgroundColor}
						/>
					</View>
					<Text
						className="text-sm font-semibold"
						style={{ color: provider.textColor }}
					>
						Pay {provider.name} Bills
					</Text>
				</View>
			</View>
			<View className="flex-1 aspect-[2000/550]">
				<Image
					source={require("../../../assets/payment/bills/banner.png")}
					className="w-full h-full object-fit"
				/>
			</View>
		</View>
	);
}
