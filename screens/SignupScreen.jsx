import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/form/Input"; // Reusable Input Component
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import useSignUp from "../hooks/mutations/useSignup";
import { useToast } from "../contexts/ToastContext";

// Validation Schema for the Signup Form
const SignupSchema = Yup.object().shape({
	username: Yup.string().required("Username is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string()
		.min(6, "Password too short")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Confirm Password is required"),
});

const SignupScreen = () => {
	const [loading, setLoading] = useState(false);
	const { showToast } = useToast();
	const router = useRouter();
	const { signUp } = useSignUp();

	// Simulate Signup API Call
	const handleSignup = async (values) => {
		setLoading(true);
		try {
			const { email, password, username } = values; // Extract email, password, and username from values
			const isSignedUp = await signUp({ email, password, username });
			if (isSignedUp) {
				// Navigate to a different screen or show a success message
				router.replace("/(tabs)"); // Navigate on successful login
				showToast("Sign-up successful!", "success"); // Show success toast
			}
		} catch (error) {
			//console.error("Sign-up error:", error); // Log error for debugging
			// Handle error (e.g., show a toast or alert)
			showToast("Sign-up failed: " + error.message, "error"); // Show error toast
		} finally {
			setLoading(false);
		}
	};

	return (
		<LinearGradient
			colors={["#fff", "#f0fff4", "#fff"]}
			className="flex-1 justify-center items-center p-4 bg-backgroundLight"
		>
			<Text className="text-3xl font-bold text-primary mb-6">Sign Up</Text>

			<Formik
				initialValues={{
					username: "",
					email: "",
					password: "",
					confirmPassword: "",
				}}
				validationSchema={SignupSchema}
				onSubmit={handleSignup}
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
						{/* Username Input */}
						<Input
							label="Username"
							placeholder="Enter your username"
							onChangeText={handleChange("username")}
							onBlur={handleBlur("username")}
							value={values.username}
							error={touched.username && errors.username}
						/>

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

						{/* Confirm Password Input */}
						<Input
							label="Confirm Password"
							placeholder="Confirm your password"
							secureTextEntry
							onChangeText={handleChange("confirmPassword")}
							onBlur={handleBlur("confirmPassword")}
							value={values.confirmPassword}
							error={touched.confirmPassword && errors.confirmPassword}
						/>

						{/* Submit Button */}
						<Pressable
							onPress={handleSubmit}
							disabled={loading}
							className="w-full bg-primary rounded-xl py-4 mt-4 flex items-center justify-center"
							android_ripple={{ color: "#333" }}
						>
							<Text className="text-white text-lg">
								{loading ? "Signing up..." : "Sign Up"}
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

export default SignupScreen;
