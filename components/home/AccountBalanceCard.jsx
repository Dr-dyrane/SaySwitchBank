import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AccountBalanceCard = ({
  balance,
  balanceVisible,
  toggleBalanceVisibility,
}) => {
  return (
    <View className="bg-primary mb-6 p-4 rounded-xl">
      <View className="flex-row justify-between">
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#fff",
            marginTop: 8,
          }}
        >
          {balanceVisible
            ? `₦${balance.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            : "****"}
        </Text>
        <TouchableOpacity
          onPress={toggleBalanceVisibility}
          className="flex-row items-center justify-center"
        >
          <Text className="mr-2 text-white">
            {balanceVisible ? "Hide Balance" : "Show Balance"}
          </Text>
          <Ionicons
            name={balanceVisible ? "eye-off" : "eye"}
            size={24}
            color="#ddd"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountBalanceCard;
