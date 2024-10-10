// components/layout/HeaderLogo.js

import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const HeaderLogo = () => {
	const router = useRouter();
	const handleLogoPress = () => {
		if (router.canGoBack()) {
			// Go back to the previous screen
			router.back();
		} else {
			// Navigate to a default route, e.g., home
			router.push("/welcome"); // Change '/' to the appropriate route if needed
		}
	};
	return (
		<TouchableOpacity
			onPress={handleLogoPress}
			accessible={true}
			accessibilityLabel="Back to previous screen"
		>
			<Image
				source={require("../../assets/logo.png")}
				style={{ width: 24, height: 24, marginLeft: 0 }}
				className="mr-4 rounded-full"
			/>
		</TouchableOpacity>
	);
};

export default HeaderLogo;
