import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // Importing icons
import FilterButtons from "./FilterButtons";

// Reusable FilterHeader Component
const FilterHeader = ({ onFilterChange, currentFilter, date }) => {
	const [showFilters, setShowFilters] = useState(true); // State for toggling filter visibility

	// Function to toggle filter visibility
	const toggleFilters = () => {
		setShowFilters((prev) => !prev);
	};

	return (
		<View
			style={{
				padding: 16,
				backgroundColor: "#e0fff9",
				borderRadius: 10,
				marginBottom: 24,
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
			}}
            className='border-l-4 border-primary'
		>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View style={{ flexDirection: "column" }}>
					<Text style={{ fontSize: 18, fontWeight: "bold" }}>
						Transaction History
					</Text>
					<Text style={{ fontSize: 10, color: "#6b7280" }}>{date}</Text>
				</View>

				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={{ color: "#6b7280", marginRight: 10 }}>
						<Text style={{ fontWeight: "bold" }}>
							{!showFilters ? "Show Filters" : "Hide Filters"}
						</Text>
					</Text>
					<TouchableOpacity
						onPress={toggleFilters}
						style={{
							padding: 2,
							backgroundColor: showFilters ? "#00ff0020": '#33333320',
							borderRadius: 30,
						}}
					>
						<MaterialCommunityIcons
							name={showFilters ? "toggle-switch" : "toggle-switch-off"}
							size={24}
							color={showFilters ? "green" : "gray"}
						/>
					</TouchableOpacity>
					{currentFilter !== "All" && (
						<TouchableOpacity
							onPress={() => onFilterChange("All")} // Clear Filter Option
							style={{
								marginLeft: 10,
								padding: 5,
								backgroundColor: "#ff000020",
								borderRadius: 30,
							}}
						>
							<Ionicons name="reload" size={16} color="red" />
						</TouchableOpacity>
					)}
				</View>
			</View>

			{/* Show descriptive text before the filter options */}
			{showFilters && (
				<View className="justify-center w-full items-end">
					{/* <Text style={{ marginTop: 10, color: "#6b7280" }}>
						Select a filter to refine your transaction history:
					</Text> */}
					<View style={{ flexDirection: "row", marginTop: 5 }}>
						{/* Show filter buttons only if currentFilter is not "All" */}

						<FilterButtons
							onFilterChange={onFilterChange}
							currentFilter={currentFilter}
						/>
					</View>
				</View>
			)}
		</View>
	);
};

export default FilterHeader; // Export the component
