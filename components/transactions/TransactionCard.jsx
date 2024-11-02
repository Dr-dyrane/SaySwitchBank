import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
	Ionicons,
	MaterialCommunityIcons,
	FontAwesome5,
} from "@expo/vector-icons"; // Icon for directional arrows

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

const getServiceTypeIcon = (serviceType) => {
	switch (serviceType) {
		case "Airtime Recharge":
			return (
				<MaterialCommunityIcons
					name="phone-in-talk"
					size={18}
					color="#4a5568"
				/>
			);
		case "Electricity Bill Payment":
			return (
				<MaterialCommunityIcons
					name="lightning-bolt"
					size={18}
					color="#4a5568"
				/>
			);
		case "Water Bill Payment":
			return <MaterialCommunityIcons name="water" size={18} color="#4a5568" />;
		case "Fund Receipt":
			return (
				<MaterialCommunityIcons name="cash-plus" size={18} color="#4a5568" />
			);
		case "TV Subscription":
			return (
				<MaterialCommunityIcons name="television" size={18} color="#4a5568" />
			);
		case "Payout to Profiled Account":
			return (
				<MaterialCommunityIcons
					name="bank-transfer"
					size={18}
					color="#4a5568"
				/>
			);
		case "Internet Subscription":
			return <FontAwesome5 name="wifi" size={16} color="#4a5568" />;
		default:
			return (
				<MaterialCommunityIcons name="help-circle" size={18} color="#4a5568" />
			);
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
		service_type,
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
				color={
					statusCategory === "Completed"
						? "#065f46"
						: statusCategory === "Pending"
						? "#ca8a04"
						: "#991b1b"
				} // Yellow for pending
			/>
		) : (
			<Ionicons
				name="arrow-down"
				size={24}
				color={
					statusCategory === "Completed"
						? "#065f46"
						: statusCategory === "Pending"
						? "#ca8a04"
						: "#991b1b"
				}
			/>
		);

	const handleRowClick = () => {
		onViewDetails(id);
	};

	return (
		<TouchableOpacity
			onPress={handleRowClick}
			style={{
				padding: 10,
				marginBottom: 10,
				borderRadius: 10,
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				borderColor:
					statusCategory === "Completed"
						? "#065f4620"
						: statusCategory === "Pending"
						? "#ca8a0420"
						: "#991b1b20",
			}}
			className="bg-slate-50"
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
							? "rgba(16, 185, 129, 0.05)"
							: statusCategory === "Pending"
							? "rgba(202, 138, 4, 0.05)" // Yellow for pending
							: "rgba(239, 68, 68, 0.05)", // Conditional background color
				}}
			>
				{icon}
			</View>
			<View className="justify-center items-center p-1.5 ml-1.5 rounded-full bg-[#4a5968]/5">
				{getServiceTypeIcon(service_type)}
			</View>

			{/* Details */}
			<View
				className="space-y-[2px] ml-2"
				style={{ flex: 1, justifyContent: "center", padding: 5 }}
			>
				<Text style={{ fontWeight: "bold" }}>{transferDescription}</Text>
				<Text className="text-xs" style={{ color: "#6b7280" }}>
					{formattedDate}
				</Text>
			</View>

			{/* Amount and Status */}
			<View
				style={{ alignItems: "flex-end", padding: 5 }}
				className="space-y-[2px]"
			>
				<Text
					style={{
						fontWeight: "bold",
						color: direction === "Credit" ? "#065f46" : "#991b1b",
					}}
				>
					{direction === "Credit" ? "+" : "-"}₦ {amount.toFixed(2)}
				</Text>
				<View
					style={{
						backgroundColor:
							statusCategory === "Completed"
								? "#d1fae5"
								: statusCategory === "Pending"
								? "#fef3c7" // Yellow for pending status background
								: "#fee2e2",
						paddingHorizontal: 8,
						borderRadius: 6,
					}}
					className="py-[4px]"
				>
					<Text
						style={{
							color:
								statusCategory === "Completed"
									? "#065f46"
									: statusCategory === "Pending"
									? "#ca8a04" // Yellow for pending text
									: "#991b1b",
							fontSize: 10,
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
