// screens/OnboardingScreen.js

import React, { useState, useRef } from "react";
import { View, Text, Pressable, PanResponder, Animated } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import useSwipeGesture from "../utils/useSwipeGesture";

const onboardingData = [
	{
		title: "Welcome to SaySwitch",
		description:
			"Experience seamless banking at your fingertips with SaySwitch.",
		icon: "cash-outline",
	},
	{
		title: "Easy Money Transfers",
		description: "Send and receive money quickly and securely.",
		icon: "arrow-redo-outline",
	},
	{
		title: "Bill Payments Made Simple",
		description: "Pay your bills effortlessly and never miss a deadline.",
		icon: "wallet-outline",
	},
];

const OnboardingScreen = () => {
	const router = useRouter();
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleSwipeLeft = () => {
		if (currentIndex < onboardingData.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handleSwipeRight = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const panResponder = useSwipeGesture(handleSwipeLeft, handleSwipeRight);

	return (
		<LinearGradient
    colors={["#fff", "#f0fff4", "#fff"]}
			className="flex-1 justify-center items-center p-4"
			{...panResponder}
		>
			<Animated.View className="flex-1 justify-center items-center mb-6">
				<Ionicons
					name={onboardingData[currentIndex].icon}
					size={60}
					color="green"
					className="mb-5"
				/>
				<Text className="text-3xl font-bold text-primary text-center mb-2">
					{onboardingData[currentIndex].title}
				</Text>
				<Text className="text-lg text-gray-600 text-center">
					{onboardingData[currentIndex].description}
				</Text>
			</Animated.View>

			<View className="flex-row justify-between mb-5 w-full px-4">
				<Pressable
					onPress={() => handleSwipeRight()}
					className={`py-2 px-4 rounded-lg ${
						currentIndex === 0 ? "bg-gray-400" : "bg-gray-600"
					}`}
					disabled={currentIndex === 0}
				>
					<Text className="text-white font-bold">Back</Text>
				</Pressable>

				<View className="flex-row items-center">
					{onboardingData.map((_, index) => (
						<View
							key={index}
							className={`w-2.5 h-2.5 rounded-full mx-1 ${
								currentIndex === index ? "bg-green-400" : "bg-gray-300"
							}`}
						/>
					))}
				</View>

				<Pressable
					onPress={() => {
						if (currentIndex === onboardingData.length - 1) {
							router.push("signup");
						} else {
							handleSwipeLeft();
						}
					}}
					className={`py-2 px-4 rounded-lg ${
						currentIndex === onboardingData.length - 1
							? "bg-primary"
							: "bg-green-500"
					}`}
				>
					<Text className="text-white font-bold">
						{currentIndex === onboardingData.length - 1 ? "Register" : "Next"}
					</Text>
				</Pressable>
			</View>
		</LinearGradient>
	);
};

export default OnboardingScreen;
