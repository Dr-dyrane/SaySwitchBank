import React from 'react';
import { View, Text } from 'react-native';

const Transactions = () => {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-2">Transactions</Text>
      <Text className="text-lg text-center">
        This is the Transactions page. Here you can view and manage your transactions.
      </Text>
      {/* You can add more components here as needed */}
    </View>
  );
};

export default Transactions;
