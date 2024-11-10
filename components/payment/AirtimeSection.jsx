import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProviderSelector from './ProviderSelector';
import ConfirmModal from './ConfirmModal';
import { useAuth } from '../../contexts/AuthContext';

const AirtimeSection = () => {
  const { user } = useAuth(); 
  const [phoneNumber, setPhoneNumber] = useState(user.phone || '08012345678'); // Default user phone number
  const [selectedProvider, setSelectedProvider] = useState({ id: 'mtn', name: 'MTN', icon: 'cellular' }); // Default provider
  const [amount, setAmount] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const amounts = [100, 200, 500, 1000, 2000, 5000];

  const handleConfirm = () => {
    // Handle confirmation logic
    setShowConfirmModal(false);
  };

  const renderAmountItem = ({ item }) => (
    <TouchableOpacity
      className="bg-white p-4 rounded-lg m-1 flex-1"
      style={{ minWidth: '30%' }}
      onPress={() => {
        setAmount(item.toString());
        setShowConfirmModal(true);
      }}
    >
      <Text className="text-center font-semibold">₦{item}</Text>
      <Text className="text-center text-xs text-green-600">
        Cashback: ₦{Math.floor(item * 0.02)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="space-y-4">
      <View className="flex-row items-center bg-white rounded-lg p-2">
        <ProviderSelector onSelect={setSelectedProvider} selectedProvider={selectedProvider} />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity className="p-2">
          <Ionicons name="person-circle" size={24} color="#008773" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={amounts}
        renderItem={renderAmountItem}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
        scrollEnabled={false}
      />

      <View className="flex-row items-center bg-white rounded-lg p-2">
        <TextInput
          className="flex-1 text-base"
          placeholder="Enter custom amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity
          className="bg-primary py-2 px-4 rounded-lg"
          onPress={() => setShowConfirmModal(true)}
        >
          <Text className="text-white font-semibold">Pay ₦{amount || '0'}</Text>
        </TouchableOpacity>
      </View>

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