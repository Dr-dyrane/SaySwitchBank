import React, { useState } from "react";
import { ScrollView, View, Modal, Button } from "react-native";
import TransactionCard from "../components/transactions/TransactionCard";
import transactions from "../data/transactions";
import TransDetails from "../components/transactions/TransDetails";
import { LinearGradient } from "expo-linear-gradient";

const TransactionPage = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedTransactionId, setSelectedTransactionId] = useState(null);

	const handleViewDetails = (id) => {
		setSelectedTransactionId(id);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
		setSelectedTransactionId(null);
	};

	return (
		<LinearGradient colors={["#fff", "#f0fff4", "#fff"]} className="p-4">
			<ScrollView>
				{transactions.map((transaction) => (
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
