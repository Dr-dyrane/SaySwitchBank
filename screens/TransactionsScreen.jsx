import React, { useState } from "react";
import { ScrollView, View, Modal } from "react-native";
import TransactionCard, {
	getStatusCategory,
} from "../components/transactions/TransactionCard";
import transactions from "../data/transactions";
import TransDetails from "../components/transactions/TransDetails";
import { LinearGradient } from "expo-linear-gradient";
import FilterHeader from "../components/transactions/FilterHeader";

const TransactionPage = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedTransactionId, setSelectedTransactionId] = useState(null);
	const [filter, setFilter] = useState("All Status"); // State for filter
	const [date, setDate] = useState(new Date().toLocaleDateString()); // State for date

	const handleViewDetails = (id) => {
		setSelectedTransactionId(id);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
		setSelectedTransactionId(null);
	};

	// Function to handle filter change
	const handleFilterChange = (status) => {
		setFilter(status);
	};

	// Filter transactions based on the selected filter
	const filteredTransactions = transactions.filter((transaction) => {
		if (filter === "All Status") return true;
		return getStatusCategory(transaction.payment_response_code) === filter;
	});

	return (
		<LinearGradient
			colors={["#fff", "#fff", "#fff"]}
			className="p-4 min-h-screen"
		>
			<FilterHeader
				onFilterChange={handleFilterChange}
				currentFilter={filter}
				date={date}
			/>
			<ScrollView>
				{filteredTransactions.map((transaction) => (
					<TransactionCard
						key={transaction.id}
						transaction={transaction}
						onViewDetails={handleViewDetails}
					/>
				))}
			</ScrollView>
			{/* Modal for Transaction Details */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={closeModal}
			>
				<View className="flex-1 justify-center">
					<TransDetails
						setModalIsOpen={closeModal}
						selectedTransactionId={selectedTransactionId}
					/>
				</View>
			</Modal>
		</LinearGradient>
	);
};

export default TransactionPage;
