import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProviderSelector from './ProviderSelector';
import ConfirmModal from './ConfirmModal';

const DataSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('08012345678'); // Default user phone number
  const [selectedProvider, setSelectedProvider] = useState({ id: 'mtn', name: 'MTN', icon: 'cellular' }); // Default provider
  const [selectedPlan, setSelectedPlan] = useState({ price: null, cashback: null });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Daily');

  const timePeriods = ['Daily', 'Weekly', 'Monthly', '2 Months', '3 Months', 'Yearly'];

  const dataPlans = {
    Daily: [
      { id: 'd1', data: '100MB', duration: '1 Day', price: 100, cashback: 2 },
      { id: 'd2', data: '1GB', duration: '1 Day', price: 300, cashback: 6 },
      { id: 'd3', data: '2GB', duration: '1 Day', price: 500, cashback: 10 },
    ],
    Weekly: [
      { id: 'w1', data: '1GB', duration: '7 Days', price: 500, cashback: 10 },
      { id: 'w2', data: '3GB', duration: '7 Days', price: 1000, cashback: 20 },
      { id: 'w3', data: '6GB', duration: '7 Days', price: 1500, cashback: 30 },
    ],
    Monthly: [
      { id: 'm1', data: '1.5GB', duration: '30 Days', price: 1000, cashback: 20 },
      { id: 'm2', data: '4.5GB', duration: '30 Days', price: 2000, cashback: 40 },
      { id: 'm3', data: '10GB', duration: '30 Days', price: 3000, cashback: 60 },
    ],
    '2 Months': [
      { id: '2m1', data: '30GB', duration: '60 Days', price: 8000, cashback: 160 },
      { id: '2m2', data: '50GB', duration: '60 Days', price: 10000, cashback: 200 },
    ],
    '3 Months': [
      { id: '3m1', data: '75GB', duration: '90 Days', price: 15000, cashback: 300 },
      { id: '3m2', data: '100GB', duration: '90 Days', price: 20000, cashback: 400 },
    ],
    Yearly: [
      { id: 'y1', data: '400GB', duration: '365 Days', price: 50000, cashback: 1000 },
      { id: 'y2', data: '1TB', duration: '365 Days', price: 100000, cashback: 2000 },
    ],
  };

  const handleConfirm = () => {
    // Handle confirmation logic
    setShowConfirmModal(false);
  };

  const renderTimePeriodItem = ({ item }) => (
    <TouchableOpacity
      className={`p-2 rounded-lg m-1 ${selectedTimePeriod === item ? 'bg-primary' : 'bg-gray-200'}`}
      onPress={() => setSelectedTimePeriod(item)}
    >
      <Text className={`text-center ${selectedTimePeriod === item ? 'text-white' : 'text-gray-600'}`}>{item}</Text>
    </TouchableOpacity>
  );

  const renderPlanItem = ({ item }) => (
    <TouchableOpacity
      className="bg-white p-3 rounded-lg m-1 flex-1"
      style={{ minWidth: '30%' }}
      onPress={() => {
        setSelectedPlan(item);
        setShowConfirmModal(true);
      }}
    >
      <Text className="font-bold text-center">{item.data}</Text>
      <Text className="text-center">{item.duration}</Text>
      <Text className="text-center">{item.price ? `₦${item.price}` : 'Price N/A'}</Text>
      <Text className="text-center text-green-600">
        Cashback: {item.cashback ? `₦${item.cashback}` : 'N/A'}
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
        data={timePeriods}
        renderItem={renderTimePeriodItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        data={dataPlans[selectedTimePeriod] || []}
        renderItem={renderPlanItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        scrollEnabled={false}
      />

      <ConfirmModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        details={{
          type: 'Data',
          provider: selectedProvider,
          plan: selectedPlan,
          phoneNumber: phoneNumber,
        }}
      />
    </View>
  );
};

export default DataSection;