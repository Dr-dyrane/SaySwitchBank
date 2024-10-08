import React from 'react';
import { View, TextInput, Text } from 'react-native';

const Input = ({ label, placeholder, onChangeText, value, error, secureTextEntry = false }) => {
  return (
    <View className="w-full mb-4">
      <Text className="mb-2 text-gray-700">{label}</Text>
      <TextInput
        className={`p-4 py-3 bg-[#f0fff4] border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text className="mt-1 text-red-500 text-xs">{error}</Text>}
    </View>
  );
};

export default Input;
