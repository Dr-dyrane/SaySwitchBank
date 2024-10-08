// screens/WelcomeScreen.js

import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeScreen = () => {
	const router = useRouter();

	return (
		<LinearGradient
			colors={["#fff", "#f0fff4", "#fff"]}
			className="flex-1 min-h-screen justify-center items-center p-4 w-full"
		>
			<Image
				source={require("../assets/logo.png")}
				className="w-32 h-32 mb-8"
			/>
			<Text className="text-3xl font-bold text-primary mb-6">
				Welcome to Sayswith Bank
			</Text>

			{/* Container for buttons */}
			<View className="flex-row mt-6 space-x-4">
				<Pressable
					className="bg-primary px-6 py-3 rounded-xl"
					onPress={() => router.push("onboarding")}
				>
					<Text className="text-white font-bold">Get Started</Text>
				</Pressable>

				<Pressable
					className="border border-primary px-6 py-3 rounded-xl"
					onPress={() => router.push("login")}
				>
					<Text className="text-primary font-bold">Login</Text>
				</Pressable>
			</View>
		</LinearGradient>
	);
};

export default WelcomeScreen;
