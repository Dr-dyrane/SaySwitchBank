import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icon for directional arrows

export const getStatusCategory = (payment_response_code) => {
    const approvedCodes = ["00"];
    const pendingCodes = ["01", "02"];

    if (approvedCodes.includes(payment_response_code)) {
        return "Completed";
    } else if (pendingCodes.includes(payment_response_code)) {
        return "Pending";
    } else {
        return "Failed";
    }
};

const TransactionCard = ({ transaction, onViewDetails }) => {
	const {
		id,
		beneficiary_name,
		amount,
		payment_response_message,
		narration,
		transaction_date,
		direction,
		transaction_reference,
		payment_response_code,
	} = transaction;

	// Format the date without external dependencies
	const formattedDate = new Date(transaction_date).toLocaleString("en-GB", {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	// Get status category
	const statusCategory = getStatusCategory(payment_response_code);

	// Determine transfer description and color coding
	const transferDescription =
		narration && narration.trim() !== ""
			? narration
			: direction === "Credit"
			? beneficiary_name === "N/A"
				? "Added funds"
				: `Received from ${beneficiary_name}`
			: beneficiary_name === "N/A"
			? "Withdrawn funds"
			: `Transfer to ${beneficiary_name}`;

	const icon =
		direction === "Debit" ? (
			<Ionicons
				name="arrow-up"
				size={24}
				color={statusCategory === "Completed" ? "#065f46" : "#991b1b"}
			/>
		) : (
			<Ionicons
				name="arrow-down"
				size={24}
				color={statusCategory === "Completed" ? "#065f46" : "#991b1b"}
			/>
		);

	const handleRowClick = () => {
		onViewDetails(id);
	};

	return (
		<TouchableOpacity
			onPress={handleRowClick}
			style={{
				backgroundColor:
					statusCategory === "Completed"
						? "rgba(240, 253, 244, 0.5)"
						: "rgba(254, 242, 242, 0.5)",
				padding: 10,
				marginBottom: 10,
				borderRadius: 10,
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			{/* Type */}

			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					padding: 5,
					borderRadius: 999, // To make it fully rounded
					backgroundColor:
						statusCategory === "Completed"
							? "rgba(16, 185, 129, 0.1)"
							: "rgba(239, 68, 68, 0.1)", // Conditional background color
				}}
			>
				{icon}
			</View>

			{/* Details */}
			<View style={{ flex: 1, justifyContent: "center", padding: 5 }}>
				<Text style={{ fontWeight: "bold", fontSize: 16 }}>
					{transferDescription}
				</Text>
				<Text style={{ color: "#6b7280" }}>{formattedDate}</Text>
			</View>

			{/* Amount and Status */}
			<View style={{ alignItems: "flex-end", padding: 5 }}>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 14,
						color: direction === "Credit" ? "#065f46" : "#991b1b",
					}}
				>
					{direction === "Credit" ? "+" : "-"}N {amount.toFixed(2)}
				</Text>
				<View
					style={{
						backgroundColor:
							statusCategory === "Completed" ? "#d1fae5" : "#fee2e2",
						paddingHorizontal: 5,
						borderRadius: 5,
					}}
				>
					<Text
						style={{
							color: statusCategory === "Completed" ? "#065f46" : "#991b1b",
							fontSize: 12,
						}}
					>
						{statusCategory}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default TransactionCard;
