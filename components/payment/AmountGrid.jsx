import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const amounts = [100, 200, 500, 1000, 2000, 5000];

const AmountGrid = ({ onSelect }) => {
  return (
    <View className="flex-row flex-wrap justify-between">
      {amounts.map((amount) => (
        <TouchableOpacity
          key={amount}
          className="w-[30%] bg-white rounded-lg p-3 mb-3"
          onPress={() => onSelect(amount)}
        >
          <Text className="text-center font-bold">₦{amount}</Text>
          <Text className="text-center text-xs text-green-600">
            Cashback: ₦{Math.floor(amount * 0.02)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AmountGrid;