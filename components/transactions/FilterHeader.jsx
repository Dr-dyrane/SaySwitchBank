import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // Importing icons
import FilterButtons from "./FilterButtons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
	subMonths,
	isBefore,
	isAfter,
	format,
	startOfMonth,
	endOfMonth,
} from "date-fns";

const FilterHeader = ({
	onFilterChange,
	currentFilter,
	startDate,
	endDate,
	onDateChange,
}) => {
	const [showFilters, setShowFilters] = useState(false); // State for toggling filter visibility
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [dateType, setDateType] = useState("start");

	// Define date limits
	const today = new Date();
	const threeMonthsAgo = subMonths(today, 3);

	// Function to toggle filter visibility
	const toggleFilters = () => {
		setShowFilters((prev) => !prev);
	};

	const handleDateChange = (event, selectedDate) => {
		setShowDatePicker(false);
		if (selectedDate) {
			if (dateType === "start") {
				if (
					isBefore(selectedDate, endDate) ||
					selectedDate.getTime() === endDate.getTime()
				) {
					onDateChange(selectedDate, endDate);
				} else {
					alert("Start date must be before the end date.");
				}
			} else {
				if (
					isAfter(selectedDate, startDate) ||
					selectedDate.getTime() === startDate.getTime()
				) {
					onDateChange(startDate, selectedDate);
				} else {
					alert("End date must be after the start date.");
				}
			}
		}
	};

	return (
		<View
			style={{
				padding: 0,
				borderRadius: 10,
				marginBottom: 24,
			}}
		>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View
					style={{ flexDirection: "row" }}
					className="items-center justify-center space-x-4 bg-slate-50 p-4 rounded-lg"
				>
					<TouchableOpacity
						className="flex-row space-x-1"
						onPress={() => {
							setDateType("start");
							setShowDatePicker(true);
							setShowFilters(false);
						}}
					>
						<MaterialCommunityIcons
							name="calendar-start"
							size={16}
							color="teal"
						/>
						<Text className="text-sm text-gray-600">
							{format(startDate, "dd MMM")}
						</Text>
					</TouchableOpacity>
					<Ionicons name="arrow-forward" size={16} color="gray" />
					<TouchableOpacity
						className="flex-row space-x-1"
						onPress={() => {
							setDateType("end");
							setShowDatePicker(true);
							setShowFilters(false);
						}}
					>
						<MaterialCommunityIcons
							name="calendar-end"
							size={16}
							color="black"
						/>
						<Text className="text-sm text-gray-600">
							{format(endDate, "dd MMM")}
						</Text>
					</TouchableOpacity>
					{startDate.getTime() !==
						startOfMonth(subMonths(new Date(), 3)).getTime() && (
						<TouchableOpacity
							onPress={() => {
								onDateChange(
									startOfMonth(subMonths(new Date(), 3)), // Reset to three months ago
									new Date() // Reset to today's date
								); // Resetting to default dates

								setShowFilters(false);
							}}
							style={{
								marginLeft: 10,
								padding: 2,
								backgroundColor: "#ff000020",
								borderRadius: 30,
							}}
						>
							<Ionicons name="close" size={10} color="red" />
						</TouchableOpacity>
					)}
				</View>

				<View style={{ flexDirection: "row", alignItems: "center" }} className='bg-slate-50 p-4 rounded-lg'>
					<Text style={{ color: "#6b7280", marginRight: 10 }}>
						<Text style={{ fontWeight: "bold" }}>{currentFilter}</Text>
					</Text>
					<TouchableOpacity
						onPress={toggleFilters}
						style={{
							padding: 2,
							backgroundColor: showFilters ? "#00ff0020" : "#33333320",
							borderRadius: 30,
						}}
					>
						<MaterialCommunityIcons
							name={showFilters ? "toggle-switch" : "toggle-switch-off"}
							size={16}
							color={showFilters ? "green" : "gray"}
						/>
					</TouchableOpacity>
					{currentFilter !== "All Status" && (
						<TouchableOpacity
							onPress={() => onFilterChange("All Status")} // Clear Filter Option
							style={{
								marginLeft: 10,
								padding: 4,
								backgroundColor: "#ff000020",
								borderRadius: 30,
							}}
						>
							<Ionicons name="reload" size={10} color="red" />
						</TouchableOpacity>
					)}
				</View>
			</View>

			{/* Show descriptive text before the filter options */}
			{showFilters && (
				<View className="justify-center w-full items-center">
					<View style={{ flexDirection: "row", marginTop: 24 }}>
						<FilterButtons
							onFilterChange={onFilterChange}
							currentFilter={currentFilter}
						/>
					</View>
				</View>
			)}

			{/* DateTimePicker for selecting date */}
			{showDatePicker && (
				<DateTimePicker
					value={dateType === "start" ? startDate : endDate}
					mode="date"
					display="default"
					onChange={handleDateChange}
					minimumDate={threeMonthsAgo} // Restrict to three months backward
					maximumDate={today} // Restrict to today
				/>
			)}
		</View>
	);
};

export default FilterHeader; // Export the component
