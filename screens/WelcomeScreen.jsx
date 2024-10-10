// screens/WelcomeScreen.js

import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const WelcomeScreen = () => {
	const router = useRouter();

	return (
		<LinearGradient
			colors={["#fff", "#f0fff4", "#fff"]}
			className="flex-1 min-h-screen justify-between items-center p-8 pb-16 pt-14 w-full relative"
		>
			<View className="flex flex-row items-center justify-center">
				<Text className="text-2xl font-bold">SaySwitch</Text>
				<Image
					source={require("../assets/logo.png")}
					className="ml-1 w-5 h-5"
				/>
			</View>
			<Image
				source={require("../assets/hero/hero.png")}
				className="contain w-[400px] h-[400px]"
			/>
			{/* Features Section */}
			<View className="mb-6 text-left flex-1 justify-end">
				<Text className="text-6xl font-[900] text-primary mb-2 tracking-tighter">
					Empowering Your Financial Journey.
				</Text>
				<Text className="text-lg text-gray-500">
					Experience seamless banking with innovative services designed for your
					everyday needs.
				</Text>
			</View>
			<View>
				{/* Container for buttons */}
				<View className="flex-row mt-6 w-full">
					<Pressable
						className="bg-primary flex-1 flex-row px-6 py-4 rounded-xl items-center justify-between space-x-4"
						onPress={() => router.push("onboarding")}
					>
						<Text className="text-white text-xl font-bold text-center">
							Get Started
						</Text>
						<View className="w-8 h-8 bg-none border border-white rounded-full justify-center items-center">
							<Ionicons name="arrow-forward" size={18} color="white" />
						</View>
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
