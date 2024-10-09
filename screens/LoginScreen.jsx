import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/form/Input"; // Reusable Input Component
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useToast } from "../contexts/ToastContext";
import useLogin from "../hooks/mutations/useLogin";

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

	return (
		<LinearGradient
			colors={["#fff", "#f0fff4", "#fff"]}
			className="flex-1 justify-center items-center p-4 bg-backgroundLight"
		>
			<Text className="text-3xl font-bold text-primary mb-6">Login</Text>

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
							onChangeText={handleChange("email")}
							onBlur={handleBlur("email")}
							value={values.email}
							error={touched.email && errors.email}
						/>

						{/* Password Input */}
						<Input
							label="Password"
							placeholder="Enter your password"
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
							className="w-full bg-primary rounded-xl py-3 mt-4 flex items-center justify-center"
							android_ripple={{ color: "#333" }}
						>
							<Text className="text-white text-lg">
								{loading ? "Logging in..." : "Login"}
							</Text>
						</Pressable>
					</>
				)}
			</Formik>

			{/* Loading Indicator */}
			{loading && (
				<ActivityIndicator size="large" color="#4CAF50" className="mt-4" />
			)}
		</LinearGradient>
	);
};

export default LoginScreen;
