import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View, Modal, Text } from "react-native";
import TransactionCard, {
	getStatusCategory,
} from "../components/transactions/TransactionCard";
import transactions from "../data/transactions";
import TransDetails from "../components/transactions/TransDetails";
import { LinearGradient } from "expo-linear-gradient";
import FilterHeader from "../components/transactions/FilterHeader";
import {
	format,
	parseISO,
	startOfMonth,
	endOfMonth,
	subMonths,
} from "date-fns";

const TransactionPage = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedTransactionId, setSelectedTransactionId] = useState(null);
	const [filter, setFilter] = useState("All Status"); // State for filter
	const [startDate, setStartDate] = useState(
		startOfMonth(subMonths(new Date(), 3))
	);
	const [endDate, setEndDate] = useState(new Date());

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

	const handleDateChange = (start, end) => {
		setStartDate(start);
		setEndDate(end);
	};

	useEffect(() => {
		return () => {
			setFilter("");
			setStartDate(startOfMonth(subMonths(new Date(), 3)));
			setEndDate(endOfMonth(new Date()));
		};
	}, []);

	const filteredAndSortedTransactions = useMemo(() => {
		return transactions
			.filter((transaction) => {
				const transactionDate = parseISO(transaction.transaction_date);
				const statusMatch =
					filter === "All Status" ||
					getStatusCategory(transaction.payment_response_code) === filter;
				const dateMatch =
					transactionDate >= startDate && transactionDate <= endDate;
				return statusMatch && dateMatch;
			})
			.sort(
				(a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
			);
	}, [filter, startDate, endDate]);

	const groupedTransactions = useMemo(() => {
		const groups = {};
		filteredAndSortedTransactions.forEach((transaction) => {
			const month = format(parseISO(transaction.transaction_date), "MMMM yyyy");
			if (!groups[month]) {
				groups[month] = [];
			}
			groups[month].push(transaction);
		});
		return groups;
	}, [filteredAndSortedTransactions]);

	return (
		<LinearGradient
			colors={["#fff", "#fff", "#fff"]}
			className="p-4 pt-0 min-h-screen"
		>
			<FilterHeader
				onFilterChange={handleFilterChange}
				currentFilter={filter}
				startDate={startDate}
				endDate={endDate}
				onDateChange={handleDateChange}
			/>
			<ScrollView>
				{Object.entries(groupedTransactions).map(
					([month, monthTransactions]) => (
						<View key={month} className="mb-2">
							<Text className="mb-2 text-gray-500">{month}</Text>
							{monthTransactions.map((transaction) => (
								<TransactionCard
									key={transaction.id}
									transaction={transaction}
									onViewDetails={handleViewDetails}
								/>
							))}
						</View>
					)
				)}
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
