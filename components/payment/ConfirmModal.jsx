import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ConfirmModal = ({ visible, onClose, onConfirm, details }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black bg-opacity-50">
        <View className="bg-white rounded-t-3xl p-4">
          <Text className="text-xl font-bold mb-4">Confirm Purchase</Text>
          <View className="space-y-2">
            <Text>Type: {details.type}</Text>
            <Text>Provider: {details.provider?.name}</Text>
            {details.type === 'Airtime' && (
              <>
                <Text>Amount: ₦{details.amount}</Text>
                <Text>Phone Number: {details.phoneNumber}</Text>
              </>
            )}
            {details.type === 'Data' && (
              <>
                <Text>Plan: {details.plan?.data} for {details.plan?.duration}</Text>
                <Text>Price: ₦{details.plan?.price}</Text>
              </>
            )}
            <Text className="text-green-600">
              Cashback: ₦{details.type === 'Airtime' ? Math.floor(details.amount * 0.02) : details.plan?.cashback}
            </Text>
          </View>
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              className="bg-gray-200 py-3 px-6 rounded-lg"
              onPress={onClose}
            >
              <Text className="text-center font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-primary py-3 px-6 rounded-lg"
              onPress={onConfirm}
            >
              <Text className="text-white text-center font-bold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;