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
								<View className="justify-center items-center mb-6">
									<Text className="text-2xl font-semibold">
										₦{parseInt(amount).toLocaleString()}
									</Text>
								</View>
								{selectedAccount && (
									<>
										<View className="flex-row items-center justify-between py-2 mb-3 border-gray-200 bg-slate-50 rounded-xl px-4">
											<View className="flex-row items-center">
												<View className="bg-[#E5F5F1] p-2 rounded-full mr-3">
													<Ionicons
														name={selectedAccount.icon}
														size={24}
														color="#008773"
													/>
												</View>

												<View>
													<Text className="text-md text-gray-800">
														{selectedAccount.name}
													</Text>
													<Text className="text-gray-500">
														{selectedAccount.number}
													</Text>
												</View>
											</View>
											<Ionicons
												name="checkmark-done-circle"
												size={18}
												color="teal"
											/>
										</View>
										<View className="flex-row justify-between w-full mb-2 p-2">
											<View className="items-center justify-center">
												<Text className="text-gray-500">Bank Name</Text>
											</View>
											<View className="items-center justify-center">
												<Text className="font-semibold">
													{selectedAccount.name}
												</Text>
											</View>
										</View>
										<View className="flex-row justify-between w-full mb-2 p-2">
											<View className="items-center justify-center">
												<Text className="text-gray-500">Account Number</Text>
											</View>
											<View className="items-center justify-center">
												<Text className="font-semibold">
													{selectedAccount.number}
												</Text>
											</View>
										</View>
									</>
								)}
								<View className="flex-row justify-between w-full mb-2 p-2">
									<View className="items-center justify-center">
										<Text className="text-gray-500">Amount</Text>
									</View>
									<View className="items-center justify-center">
										<Text className="font-semibold">
											₦{parseInt(amount).toLocaleString()}
										</Text>
									</View>
								</View>
								{remark && (
									<View className="flex-row justify-between w-full mb-2 p-2">
										<View className="items-center justify-center">
											<Text className="text-gray-500">Remark</Text>
										</View>
										<View className="items-center justify-center">
											<Text className="font-semibold">{remark}</Text>
										</View>
									</View>
								)}
								<View className="flex-row justify-center mt-8">
									<TouchableOpacity
										onPress={onConfirm}
										className="bg-primary flex flex-row items-center justify-between p-4 rounded-2xl w-full shadow-md"
									>
										<Text className="text-white text-center text-lg">Withdraw Funds</Text>
										<View className="w-6 h-6 bg-none border border-white rounded-full justify-center items-center">
											<Ionicons name="arrow-down" size={18} color="white" />
										</View>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}
