import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

// Reusable button styles
const buttonStyles = {
    padding: 8,
    borderRadius: 16,
    marginRight: 5,
};

// Update the filterButtonStyles function
const filterButtonStyles = (isActive, color) => ({
    ...buttonStyles,
    backgroundColor: isActive ? "#d1fae5" : "#e0f2f1",
    padding: isActive ? 8 : 10,
    borderWidth: isActive ? 2 : 0,
    borderColor: isActive ? color : "transparent",
});

const FilterButtons = ({ onFilterChange, currentFilter }) => {
    return (
        <View style={{ flexDirection: "row", marginTop: 5 }}>
            <TouchableOpacity
                onPress={() => onFilterChange("Completed")}
                style={filterButtonStyles(currentFilter === "Completed", "#065f46")}
            >
                <Text style={{ color: "#065f46", fontWeight: "bold" }}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onFilterChange("Pending")}
                style={filterButtonStyles(currentFilter === "Pending", "#ca8a04")} // Set color to yellow when active
            >
                <Text style={{ color: "#ca8a04", fontWeight: "bold" }}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onFilterChange("Failed")}
                style={filterButtonStyles(currentFilter === "Failed", "#991b1b")}
            >
                <Text style={{ color: "#991b1b", fontWeight: "bold" }}>Failed</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FilterButtons;
