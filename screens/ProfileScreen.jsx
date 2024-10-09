import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	Button,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "../contexts/ToastContext";
import * as ImagePicker from "expo-image-picker";
import { updateUserAPI, getCurrentUserAPI } from "../api/auth"; // Import both API functions

const ProfileScreen = () => {
	const { showToast } = useToast(); // Toast notification hook
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [imageUri, setImageUri] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isDataLoading, setIsDataLoading] = useState(true); // New state to handle data loading

	// Load current user data
	useEffect(() => {
		const fetchUserData = async () => {
			setIsDataLoading(true); // Start loading
			try {
				const { data: userData } = await getCurrentUserAPI();
				// API returns `username` not `name`, so set the correct field
				//console.log(userData);
				setName(userData.username || ""); // Ensure empty string if no value
				setEmail(userData.email || "");
				setPhone(userData.phone || "");
				setImageUri(userData.imageUri || null); // Ensure placeholder if no image
			} catch (error) {
				// Handle and show detailed error message
				const errorMessage =
					error.response?.data?.message || error.message || "An error occurred";
				showToast(errorMessage, "error");
			} finally {
				setIsDataLoading(false); // End loading
			}
		};
		fetchUserData();
	}, []);

	// Function to handle image picking
	const pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled && result.assets && result.assets.length > 0) {
				// Correctly setting the picked image URI
				setImageUri(result.assets[0].uri);
				showToast("Image selected successfully", "success");
			} else if (result.canceled) {
				showToast("Image selection canceled", "warning");
			} else {
				showToast("No image selected", "warning");
			}
		} catch (error) {
			// Handle possible errors with image picker
			showToast(`Image picker error: ${error.message}`, "error");
		}
	};

	// Function to handle profile update
	const handleUpdateProfile = async () => {
		setIsLoading(true);
		try {
			const updatedData = {
				name,
				email,
				phone,
				imageUri, // Image is part of the update payload
			};
			await updateUserAPI(updatedData);
			showToast("Profile updated successfully", "success");
		} catch (error) {
			// Handle and show detailed error message
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Failed to update profile";
			showToast(errorMessage, "error");
		} finally {
			setIsLoading(false);
		}
	};

	// Render the profile screen
	return (
		<LinearGradient colors={["#fff", "#f0fff4", "#fff"]} className="flex-1 p-4">
			{isDataLoading ? (
				// Show a loading spinner while data is loading
				<View className="flex-1 justify-center items-center">
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			) : (
				<View className="justify-center items-center">
					<TouchableOpacity onPress={pickImage}>
						<Image
							source={
								imageUri ? { uri: imageUri } : require("../assets/profile.jpg") // Placeholder image
							}
							className="w-32 h-32 rounded-full mb-4"
						/>
					</TouchableOpacity>

					{/* Render name with placeholder if not set */}
					<Text className="text-2xl font-bold mb-2">
						{name || "Your Name"} {/* Default placeholder */}
					</Text>

					<TextInput
						value={name}
						onChangeText={setName}
						placeholder="Full Name"
						className="border p-2 rounded mb-2 w-full"
					/>
					<TextInput
						value={email}
						onChangeText={setEmail}
						placeholder="Email"
						className="border p-2 rounded mb-2 w-full"
						keyboardType="email-address"
					/>
					<TextInput
						value={phone}
						onChangeText={setPhone}
						placeholder="Phone"
						className="border p-2 rounded mb-2 w-full"
						keyboardType="phone-pad"
					/>

					<Button
						title={isLoading ? "Updating..." : "Update Profile"}
						onPress={handleUpdateProfile}
						disabled={isLoading}
					/>
				</View>
			)}
		</LinearGradient>
	);
};

export default ProfileScreen;
