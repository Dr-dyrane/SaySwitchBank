import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AccountBalanceCard = ({
	balance,
	balanceVisible,
	toggleBalanceVisibility,
}) => {
	return (
		<View className="bg-primary mb-6 p-4 rounded-xl flex-row items-center justify-between">
			<View className="flex justify-center items-center">
				<Text
					style={{
						fontSize: 32,
						fontWeight: "bold",
						color: "#fff",
					}}
                    className={`${!balanceVisible && 'mt-1.5'}`}
				>
					{balanceVisible
						? `₦${balance.toLocaleString("en-NG", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
						  })}`
						: "****"}
				</Text>
			</View>
			<TouchableOpacity
				onPress={toggleBalanceVisibility}
				className="flex-row items-center justify-center space-x-2 px-4 py-2 bg-white/10 rounded-2xl hover:bg-opacity-50 transition-all duration-300"
			>
				<Text className="text-white text-sm">
					{balanceVisible ? "Hide Balance" : "Show Balance"}
				</Text>
				<Ionicons
					name={balanceVisible ? "eye-off" : "eye"}
					size={24}
					color="#ddd"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default AccountBalanceCard;
