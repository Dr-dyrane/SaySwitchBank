import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
	return (
		// <View style={styles.container}>
		<View className="flex-1 justify-center items-center bg-whit">
			<Text>Open up App.js to start working on your app!</Text>
			<Text className="text-purple-600">
				Proof of tailwindcss with text in pruple
			</Text>
			<StatusBar style="auto" />
		</View>
	);
}
