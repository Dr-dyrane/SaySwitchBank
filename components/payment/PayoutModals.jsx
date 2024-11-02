import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function AccountSelectionModal({
	isVisible,
	accounts,
	onSelectAccount,
	onClose,
}) {
	return (
		<Modal visible={isVisible} animationType="slide" transparent={true}>
			<TouchableWithoutFeedback onPress={onClose}>
				<View className="flex-1 justify-end bg-black/50">
					<TouchableWithoutFeedback>
						<View>
							{/* Drag Indicator Bar */}
							<View
								style={{
									height: 4,
									width: 80,
									backgroundColor: "#ccc", // Customize color
									borderRadius: 2,
									alignSelf: "center",
									marginBottom: 8,
								}}
							/>
							<View className="bg-white rounded-t-3xl py-6 px-4">
								<Text className="text-xl font-semibold mb-4">
									Select Account
								</Text>
								{accounts.map((account) => (
									<TouchableOpacity
										key={account.id}
										className="flex-row items-center justify-between py-2 mb-3 border-gray-200 bg-slate-50 rounded-xl px-4"
										onPress={() => onSelectAccount(account)}
									>
										<View className="flex-row items-center">
											<View className="bg-[#E5F5F1] p-2 rounded-full mr-3">
												<Ionicons
													name={account.icon}
													size={24}
													color="#008773"
												/>
											</View>
											<View>
												<Text className="text-md text-gray-800">
													{account.name}
												</Text>
												<Text className="text-gray-500">{account.number}</Text>
											</View>
										</View>
										<Ionicons name="chevron-forward" size={18} color="teal" />
									</TouchableOpacity>
								))}
							</View>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}

export function ConfirmationModal({
	isVisible,
	amount,
	selectedAccount,
	remark,
	onConfirm,
	onClose,
}) {
	return (
		<Modal visible={isVisible} animationType="slide" transparent={true}>
			<TouchableWithoutFeedback onPress={onClose}>
				<View className="flex-1 justify-end bg-black/50">
					<TouchableWithoutFeedback>
						<View className="bg-white rounded-t-3xl p-6 h-1/2">
							<Text className="text-xl font-semibold mb-4">Confirm Payout</Text>
							<View className="mb-4">
								<Text className="text-gray-500">Amount</Text>
								<Text className="text-lg font-semibold">
									₦{parseInt(amount).toLocaleString()}
								</Text>
							</View>
							<View className="mb-4">
								<Text className="text-gray-500">Account</Text>
								<Text className="text-lg font-semibold">
									{selectedAccount?.name}
								</Text>
							</View>
							{remark && (
								<View className="mb-4">
									<Text className="text-gray-500">Remark</Text>
									<Text className="text-lg font-semibold">{remark}</Text>
								</View>
							)}
							<View className="flex-row justify-between mt-auto">
								<TouchableOpacity
									onPress={onClose}
									className="bg-gray-300 p-3 rounded-lg flex-1 mr-2"
								>
									<Text className="text-gray-800 text-center">Cancel</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={onConfirm}
									className="bg-teal-600 p-3 rounded-lg flex-1 ml-2"
								>
									<Text className="text-white text-center">Confirm</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}
