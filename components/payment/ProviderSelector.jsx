import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const providers = [
  { id: 'mtn', name: 'MTN', icon: 'cellular' },
  { id: 'airtel', name: 'Airtel', icon: 'wifi' },
  { id: 'glo', name: 'Glo', icon: 'globe' },
  { id: '9mobile', name: '9Mobile', icon: 'phone-portrait' },
];

const ProviderSelector = ({ onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleSelect = (provider) => {
    setSelectedProvider(provider);
    onSelect(provider);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} className="flex-row items-center">
        {selectedProvider ? (
          <Ionicons name={selectedProvider.icon} size={24} color="#008773" />
        ) : (
          <Text className="text-gray-400">Select Provider</Text>
        )}
        <Ionicons name="chevron-down" size={24} color="#008773" className="ml-2" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className="bg-white rounded-t-3xl p-4">
            <Text className="text-xl font-bold mb-4">Select Provider</Text>
            <FlatList
              data={providers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex-row items-center py-3 border-b border-gray-200"
                  onPress={() => handleSelect(item)}
                >
                  <Ionicons name={item.icon} size={24} color="#008773" className="mr-3" />
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              className="mt-4 bg-primary py-3 rounded-lg"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center font-bold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProviderSelector;