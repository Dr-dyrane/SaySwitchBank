import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const providers = [
  { id: 'mtn', name: 'MTN', icon: 'cellular' },
  { id: 'airtel', name: 'Airtel', icon: 'wifi' },
  { id: 'glo', name: 'Glo', icon: 'globe' },
  { id: '9mobile', name: '9Mobile', icon: 'phone-portrait' },
];

const ProviderSelector = ({ onSelect, selectedProvider }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (provider) => {
    onSelect(provider);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} className="flex-row items-center">
        <Ionicons name={selectedProvider.icon} size={24} color="#008773" />
        <Ionicons name="chevron-down" size={16} color="#008773" className="ml-1" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View className="bg-white rounded-t-3xl p-4">
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
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ProviderSelector;