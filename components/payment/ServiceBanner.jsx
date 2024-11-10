import React from "react";
import { View, Text, Image } from "react-native";

export default function ServiceBanner() {
	return (
		<View className="w-full h-auto bg-primary rounded-2xl overflow-hidden flex-col pb-4">
			<View className="p-4 justify-center">
				<Text className="text-2xl font-bold text-white mb-2">
					Airtime & Data Recharge
				</Text>
				<Text className="text-base text-white opacity-80">
					Recharge your phone and data instantly
				</Text>
			</View>
			<View className="h-36 aspect-rectangle">
				<Image
          source={require('../../assets/payment/payout.png')}
					className="w-full h-full object-cover flex-1"
				/>
			</View>
		</View>
	);
}