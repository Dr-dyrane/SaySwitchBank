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
			className="flex-1 min-h-screen justify-between items-center p-8 py-16 w-full"
		>
			<View className="flex flex-row items-center justify-center">
				<Text className="text-2xl font-bold">SaySwitch</Text>
				<Image
					source={require("../assets/logo.png")}
					className="ml-1 w-5 h-5"
				/>
			</View>

			<Text className="text-3xl font-bold text-primary mb-6">
				Welcome to Sayswith Bank
			</Text>
			<View>
				{/* Container for buttons */}
				<View className="flex-row mt-6 w-full">
					<Pressable
						className="bg-primary flex-1 px-6 py-4 rounded-xl"
						onPress={() => router.push("onboarding")}
					>
						<Text className="text-white text-xl font-bold text-center">
							Get Started
						</Text>
					</Pressable>
				</View>

				{/* Prompt for existing users */}
				<Text className="mt-4 text-lg text-center text-gray-600">
					Already have an account?
					{"  "}
					<Text
						className="text-primary font-bold"
						onPress={() => router.push("login")}
					>
						Login
					</Text>
				</Text>
			</View>
		</LinearGradient>
	);
};

export default WelcomeScreen;
