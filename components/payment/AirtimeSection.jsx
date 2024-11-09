import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProviderSelector from './ProviderSelector';
import AmountGrid from './AmountGrid';
import ConfirmModal from './ConfirmModal';

const AirtimeSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [amount, setAmount] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirm = () => {
    // Handle confirmation logic
    setShowConfirmModal(false);
  };

  return (
    <View className="space-y-4">
      <View className="flex-row items-center bg-white rounded-lg p-2">
        <ProviderSelector onSelect={setSelectedProvider} />
        <TextInput
          className="flex-1 ml-2"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity className="p-2">
          <Ionicons name="person-circle" size={24} color="#008773" />
        </TouchableOpacity>
      </View>

      <AmountGrid onSelect={setAmount} />

      <View className="bg-white rounded-lg p-2">
        <TextInput
          className="text-lg"
          placeholder="Enter custom amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity
        className="bg-primary py-3 rounded-lg"
        onPress={() => setShowConfirmModal(true)}
      >
        <Text className="text-white text-center font-bold">Proceed to Payment</Text>
      </TouchableOpacity>

      <ConfirmModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        details={{
          type: 'Airtime',
          provider: selectedProvider,
          amount: amount,
          phoneNumber: phoneNumber,
        }}
      />
    </View>
  );
};

export default AirtimeSection;