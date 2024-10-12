import React from "react";
import { ScrollView, View } from "react-native";
import TransactionCard from "../components/transactions/TransactionCard";
import transactions from "../data/transactions";

const TransactionPage = () => {
	const handleViewDetails = (id) => {
		console.log("Transaction ID: ", id);
		// Add your detail viewing logic here
	};

	return (
		<View className='p-4'>
			<ScrollView>
				{transactions.map((transaction) => (
					<TransactionCard
						key={transaction.id}
						transaction={transaction}
						onViewDetails={handleViewDetails}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default TransactionPage;
