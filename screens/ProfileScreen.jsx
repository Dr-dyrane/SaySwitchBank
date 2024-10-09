import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	Pressable,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "../contexts/ToastContext";
import * as ImagePicker from "expo-image-picker";
import { updateUserAPI, getCurrentUserAPI } from "../api/auth"; // Import both API functions
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Icon packages
import ProfileField from "../components/form/ProfileField";

const ProfileScreen = () => {
	const { showToast } = useToast();
	const [fullName, setFullName] = useState("");
	const [username, setUsername] = useState("");
	const [gender, setGender] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [imageUri, setImageUri] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isDataLoading, setIsDataLoading] = useState(true);

	// Load current user data
	useEffect(() => {
		const fetchUserData = async () => {
			setIsDataLoading(true); // Start loading
			try {
				const { data: userData } = await getCurrentUserAPI();
				console.log(userData);
				setFullName(userData.fullName || "Test User");
				setUsername(userData.username || "testUser");
				setGender(userData.gender || "Male");
				setEmail(userData.email || "test@example.com");
				setAddress(userData.address || "Somehwere in Nigeria");
				setDateOfBirth(userData.dateOfBirth || "26 02 1994");
				setImageUri(userData.imageUri || null);
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
				fullName,
				username,
				gender,
				email,
				address,
				dateOfBirth,
				imageUri,
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
	// Handler to update each specific field
	const handleFieldUpdate = async (field, value) => {
		try {
			// Update logic for the specific field, can include API calls or state updates
			// For example:
			await updateUserAPI({ [field]: value });
			showToast(`${field} updated successfully`, "success");
		} catch (error) {
			showToast(`Failed to update ${field}`, "error");
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
				<ScrollView>
					<View className="items-center mb-4 bg-primary p-4 rounded-2xl">
						<Pressable
							onPress={pickImage}
							className="relative border-2 rounded-full mb-4 border-accent"
						>
							<Image
								source={
									imageUri
										? { uri: imageUri }
										: require("../assets/profile.jpg")
								}
								className="w-32 h-32 rounded-full"
							/>
							{/* Icon Overlay */}
							<View className="absolute bottom-2 right-0 p-2 bg-secondary/50 rounded-full">
								<Ionicons name="camera" size={20} color="#fff" />
							</View>
						</Pressable>
						<Text className="text-xl font-bold text-white">{username}</Text>
					</View>

					{/* Field Group */}
					<View className="w-full">
						<ProfileField
							label="Full Name"
							value={fullName}
							onChange={setFullName}
							iconName="person"
							onUpdate={() => handleFieldUpdate("fullName", fullName)} // Pass specific update handler
							fieldType="fullName" // Specify field type for validation
						/>
						<ProfileField
							label="Username"
							value={username}
							onChange={setUsername}
							iconName="person-outline"
							onUpdate={() => handleFieldUpdate("username", username)}
							fieldType="username" // Specify field type for validation
						/>
						<ProfileField
							label="Gender"
							value={gender}
							onChange={setGender}
							iconName={gender.toLowerCase() || 'male'}
							onUpdate={() => handleFieldUpdate("gender", gender)}
							fieldType="gender" // Specify field type for validation
						/>
						<ProfileField
							label="Email"
							value={email}
							onChange={setEmail}
							iconName="mail"
							onUpdate={() => handleFieldUpdate("email", email)}
							fieldType="email" // Specify field type for validation
						/>
						<ProfileField
							label="Address"
							value={address}
							onChange={setAddress}
							iconName="home"
							onUpdate={() => handleFieldUpdate("address", address)}
							fieldType="address" // Specify field type for validation
						/>
						<ProfileField
							label="Date of Birth"
							value={dateOfBirth}
							onChange={setDateOfBirth}
							iconName="calendar"
							onUpdate={() => handleFieldUpdate("dateOfBirth", dateOfBirth)}
							fieldType="dateOfBirth" // Specify field type for validation
						/>
					</View>

					{/* Save Button */}
					<Pressable
						onPress={handleUpdateProfile}
						className="mt-4 bg-primary p-4 rounded-xl items-center"
						disabled={isLoading}
					>
						<Text className="text-white font-bold text-lg">
							{isLoading ? "Updating..." : "Save Changes"}
						</Text>
					</Pressable>
				</ScrollView>
			)}
		</LinearGradient>
	);
};

export default ProfileScreen;
