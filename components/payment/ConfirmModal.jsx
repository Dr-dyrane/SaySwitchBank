import React, { useState } from "react";
import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	ActivityIndicator,
	Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

const ConfirmModal = ({ visible, onClose, onConfirm, details }) => {
	const [loading, setLoading] = useState(false);

	const handleConfirm = () => {
		setLoading(true);
		// Simulate API call
		setTimeout(() => {
			setLoading(false);
			onConfirm();
		}, 2000);
	};

	const renderAmount = () => {
		// Check if 'details' and its properties exist before trying to access them
		if (!details || !details.amount) {
			return "₦0.00"; // Default value when no amount is available
		}

		if (details.type === "Airtime") {
			return `₦${Number(details.amount || 0).toLocaleString()}`;
		} else if (details.plan && details.plan.price) {
			return `₦${Number(details.plan.price || 0).toLocaleString()}`;
		} else {
			return "₦0.00"; // Default value for missing price
		}
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<TouchableOpacity
				className="flex-1 bg-black/50"
				activeOpacity={1}
				onPress={onClose}
			>
				<View className="flex-1 justify-end">
					<View className="bg-white rounded-t-3xl py-6 px-4">
						<View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-6" />

						<View className="justify-center items-center mb-6">
							<Text className="text-2xl font-semibold">{renderAmount()}</Text>
						</View>

						<View className="flex-row items-center justify-between py-2 mb-3 border-gray-200 bg-slate-50 rounded-xl px-4">
							<View className="flex-row items-center">
								{/* Check if the provider logo exists before rendering */}
								{details &&
								details.provider &&
								providerLogos[details.provider.id] ? (
									<View
										className="w-8 h-8 mr-3"
										style={logoStyles[details.provider.id]}
									>
										<Image
											source={providerLogos[details.provider.id]}
											className="w-full h-full"
											resizeMode="contain"
										/>
									</View>
								) : (
									<View className="w-8 h-8 mr-3 flex items-center justify-center">
										<Ionicons name="alert-circle" size={24} color="red" />
									</View>
								)}

								<View>
									<Text className="text-sm text-gray-500">{details?.type}</Text>
									<Text className="text-md text-gray-800">
										{details?.phoneNumber || "N/A"}
									</Text>
								</View>
							</View>
							<Ionicons name="checkmark-done-circle" size={18} color="teal" />
						</View>

						<View className="space-y-4">
							<View className="flex-row justify-between">
								<Text className="text-gray-500">Provider</Text>
								<Text className="font-semibold">
									{details?.provider?.name || "Unknown"}
								</Text>
							</View>
							{details?.type === "Data" && details.plan && (
								<View className="flex-row justify-between">
									<Text className="text-gray-500">Plan</Text>
									<Text className="font-semibold">
										{details?.plan?.data} for {details?.plan?.duration}
									</Text>
								</View>
							)}
							<View className="flex-row justify-between">
								<Text className="text-gray-500">Amount</Text>
								<Text className="font-semibold">
									₦{details?.amount?.toLocaleString() || "0"}
								</Text>
							</View>
							<View className="flex-row justify-between">
								<Text className="text-gray-500">Cashback</Text>
								<Text className="font-semibold text-primary">
									₦
									{details?.type === "Airtime"
										? Math.floor((details.amount || 0) * 0.02).toLocaleString()
										: (details.plan?.cashback || 0).toLocaleString()}
								</Text>
							</View>
						</View>

						<TouchableOpacity
							onPress={handleConfirm}
							className="bg-primary flex-row items-center justify-between p-4 rounded-xl mt-6"
							disabled={loading}
						>
							<Text className="text-white text-center text-lg mr-2">
								{loading ? "Topping Up..." : "Top Up"}
							</Text>
							<View className="w-6 h-6 bg-none border border-white rounded-full justify-center items-center">
								{loading ? (
									<ActivityIndicator size={18} color="white" />
								) : (
									<Ionicons name="arrow-up" size={18} color="white" />
								)}
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		</Modal>
	);
};

export default ConfirmModal;
