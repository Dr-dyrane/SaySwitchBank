import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Pressable,
	ActivityIndicator,
	Alert,
	ScrollView,
	Image,
	Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/form/Input"; // Reusable Input Component
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useToast } from "../contexts/ToastContext";
import useLogin from "../hooks/mutations/useLogin";
import { Ionicons } from "@expo/vector-icons";

// Validation Schema for the Form
const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string()
		.min(6, "Password too short")
		.required("Password is required"),
});

const LoginScreen = () => {
	const [loading, setLoading] = useState(false);
	const { login: loginUser } = useLogin();
	const router = useRouter();
	const { showToast } = useToast();
	const [keyboardVisible, setKeyboardVisible] = useState(false); // Track keyboard visibility

	// Simulate Login API Call
	const handleLogin = async (values) => {
		setLoading(true);
		try {
			const isLoggedIn = await loginUser(values); // Call the login function from useLogin
			if (isLoggedIn) {
				// Check if login was successful
				router.replace("/(tabs)"); // Navigate on successful login
				showToast("Login successful!", "success");
			}
		} catch (error) {
			//console.error("Login error:", error); // Log error for debugging
			showToast("Login failed: " + error.message, "error");
		} finally {
			setLoading(false); // Always set loading to false
		}
	};

	useEffect(() => {
		// Add event listeners for keyboard open and close
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardVisible(true);
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardVisible(false);
			}
		);

		return () => {
			// Remove event listeners on cleanup
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	return (
		<LinearGradient
			colors={["#fff", "#f0fff4", "#fff"]}
			className="flex-1 justify-between items-center p-6 bg-backgroundLight"
		>
			<View className="flex flex-col flex-shrink">
				<View className="flex-1 justify-center space-y-2">
					<Text className="text-6xl text-center font-[900] text-primary">
						Welcome Back
					</Text>
					<Text className="text-lg text-center text-gray-500">
						Login to your account
					</Text>
				</View>
				{!keyboardVisible && (
					<Image
						source={require("../assets/sign/login.png")}
						className="contain w-[320px] h-[320px]"
						resizeMode="contain"
					/>
				)}
			</View>

			<View className="w-full">
				<ScrollView>
					<Formik
						initialValues={{ email: "", password: "" }}
						validationSchema={LoginSchema}
						onSubmit={handleLogin}
					>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							values,
							errors,
							touched,
						}) => (
							<>
								{/* Email Input */}
								<Input
									label="Email"
									placeholder="Enter your email"
									icon="mail" // Pass the email icon
									onChangeText={handleChange("email")}
									onBlur={handleBlur("email")}
									value={values.email}
									error={touched.email && errors.email}
								/>

								{/* Password Input */}
								<Input
									label="Password"
									placeholder="Enter your password"
									icon="lock-closed" // Pass the password icon
									secureTextEntry
									onChangeText={handleChange("password")}
									onBlur={handleBlur("password")}
									value={values.password}
									error={touched.password && errors.password}
								/>

								{/* Submit Button */}
								<Pressable
									onPress={handleSubmit}
									disabled={loading}
									className="w-full bg-primary rounded-xl py-4 text-lg mt-4 flex flex-row px-6 items-center justify-between space-x-4"
									android_ripple={{ color: "#333" }}
								>
									<Text className="text-white text-xl">
										{loading ? "Logging in..." : "Login"}
									</Text>
									<View className="w-8 h-8 bg-none border border-white rounded-full justify-center items-center">
										<Ionicons name="arrow-forward" size={18} color="white" />
									</View>
								</Pressable>
							</>
						)}
					</Formik>
				</ScrollView>
			</View>
			{/* Loading Indicator */}
			{loading && (
				<ActivityIndicator size="large" color="#4CAF50" className="mt-4" />
			)}
		</LinearGradient>
	);
};

export default LoginScreen;
