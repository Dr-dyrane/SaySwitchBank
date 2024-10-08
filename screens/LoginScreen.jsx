import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/form/Input"; // Reusable Input Component
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";

// Validation Schema for the Form
const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string()
		.min(6, "Password too short")
		.required("Password is required"),
});

const LoginScreen = () => {
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const router = useRouter();

	// Simulate Login API Call
	const handleLogin = async (values) => {
		setLoading(true);
		try {
			// Simulate a successful login after 2 seconds (replace with actual API call)
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Call the login function with the provided values
			await login(values); // Make sure login returns a promise
			// Call the login function with the provided values
			router.replace("/(tabs)");

			// Optional: You can navigate to another screen after a successful login here
		} catch (error) {
			Alert.alert("Error", "Something went wrong. Please try again.");
		} finally {
			setLoading(false);
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
