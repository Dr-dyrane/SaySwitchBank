import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from 'react-native-paper';

const ContactSelector = ({ isVisible, onClose, onSelectContact, contacts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const filtered = contacts.filter((contact) => {
      const hasValidName = contact.name && typeof contact.name === 'string';
      const hasValidPhoneNumber = contact.phoneNumbers && contact.phoneNumbers.length > 0;
      const matchesSearch = hasValidName && contact.name.toLowerCase().includes(searchQuery.toLowerCase());
      return hasValidName && hasValidPhoneNumber && matchesSearch;
    });
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  const confirmSelection = () => {
    if (selectedContact && selectedContact.phoneNumbers && selectedContact.phoneNumbers.length > 0) {
      const phoneNumber = selectedContact.phoneNumbers[0].number || selectedContact.phoneNumbers[0];
      onSelectContact(phoneNumber);
      onClose();
    }
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelectContact(item)}
      className="py-3 px-4 bg-slate-50 mb-2 rounded-2xl flex-row items-center justify-between"
    >
      <View>
        <Text className="text-md">{item.name}</Text>
        {item.phoneNumbers && item.phoneNumbers.length > 0 && (
          <Text className="text-sm text-gray-600">
            {item.phoneNumbers[0].number || item.phoneNumbers[0]}
          </Text>
        )}
      </View>
      <RadioButton
        value={item.id}
        status={selectedContact && selectedContact.id === item.id ? 'checked' : 'unchecked'}
        onPress={() => handleSelectContact(item)}
        color="#008773"
      />
    </TouchableOpacity>
  );

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaView className="flex-1 bg-white p-4">
        <View className="flex-row items-center justify-between py-4">
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Select Contact</Text>
          <TouchableOpacity onPress={confirmSelection} disabled={!selectedContact}>
            <Text className={`text-base ${selectedContact ? 'text-primary' : 'text-gray-400'}`}>Done</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-2 justify-between py-2 my-4 border-gray-200 bg-slate-50 rounded-xl px-4">
          <View className='flex flex-row space-x-2 items-center justify-center'>
            <Ionicons name="search" size={16} color="gray" />
            <TextInput
              className="p-1 pl-3"
              placeholder="Search contacts..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          {searchQuery && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
              }}
              className="p-1 bg-red-200 rounded-full"
            >
              <Ionicons name="close" size={10} color="red" />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={filteredContacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ContactSelector;