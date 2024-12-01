import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BillPaymentConfirmModal = ({ visible, onClose, onConfirm, details }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 2000);
  };

  const renderIcon = (type) => {
    const iconMap = {
      Electricity: "flash",
      TV: "tv",
      Water: "water",
    };
    return (
      <View className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center mr-3">
        <Ionicons name={iconMap[type] || "alert-circle"} size={24} color="#008773" />
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        className="flex-1 bg-black/50"
        activeOpacity={1}
        onPress={onClose}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-3xl py-6 px-4">
            <View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-6" />

            <View className="justify-center items-center mb-6">
              <Text className="text-2xl font-semibold">₦{details?.amount?.toLocaleString() || "0"}</Text>
            </View>

            <View className="flex-row items-center justify-between py-2 mb-3 border-gray-200 bg-slate-50 rounded-xl px-4">
              <View className="flex-row items-center">
                {renderIcon(details?.type)}
                <View>
                  <Text className="text-sm text-gray-500">{details?.type} Payment</Text>
                  <Text className="text-md text-gray-800">
                    {details?.billNumber || "N/A"}
                  </Text>
                </View>
              </View>
              <Ionicons name="checkmark-done-circle" size={18} color="teal" />
            </View>

            <View className="space-y-4">
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Provider</Text>
                <Text className="font-semibold">
                  {details?.provider?.name || "Unknown"}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">Amount</Text>
                <Text className="font-semibold">
                  ₦{details?.amount?.toLocaleString() || "0"}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-500">{details?.type === "TV" ? "Smart Card Number" : "Meter/Bill Number"}</Text>
                <Text className="font-semibold">
                  {details?.billNumber || "N/A"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleConfirm}
              className="bg-primary flex-row items-center justify-between p-4 rounded-xl mt-6"
              disabled={loading}
            >
              <Text className="text-white text-center text-lg mr-2">
                {loading ? "Processing..." : "Confirm Payment"}
              </Text>
              <View className="w-6 h-6 bg-none border border-white rounded-full justify-center items-center">
                {loading ? (
                  <ActivityIndicator size={18} color="white" />
                ) : (
                  <Ionicons name="arrow-forward" size={18} color="white" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default BillPaymentConfirmModal;

