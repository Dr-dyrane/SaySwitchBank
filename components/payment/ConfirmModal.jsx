import React from 'react';
import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ConfirmModal = ({ visible, onClose, onConfirm, details }) => {
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 2000);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View className="bg-white rounded-t-3xl py-6 px-4">
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: '#ccc',
                borderRadius: 2,
                alignSelf: 'center',
                marginBottom: 16,
              }}
            />
            <View className="justify-center items-center mb-6">
              <Text className="text-2xl font-semibold">
                ₦{details.type === 'Airtime' ? details.amount : details.plan.price}
              </Text>
            </View>
            <View className="space-y-4">
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Type</Text>
                <Text className="font-semibold">{details.type}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Provider</Text>
                <Text className="font-semibold">{details.provider.name}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Phone Number</Text>
                <Text className="font-semibold">{details.phoneNumber}</Text>
              </View>
              {details.type === 'Data' && (
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Plan</Text>
                  <Text className="font-semibold">{details.plan.data} for {details.plan.duration}</Text>
                </View>
              )}
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Cashback</Text>
                <Text className="font-semibold text-green-600">
                  ₦{details.type === 'Airtime' ? Math.floor(details.amount * 0.02) : details.plan.cashback}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleConfirm}
              className="bg-primary flex-row items-center justify-center p-4 rounded-xl mt-6"
              disabled={loading}
            >
              <Text className="text-white text-center text-lg mr-2">
                {loading ? 'Processing...' : 'Confirm Payment'}
              </Text>
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Ionicons name="checkmark-circle" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmModal;