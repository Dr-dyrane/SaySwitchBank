import React from "react"
import { View, Text, TouchableOpacity, Pressable } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"

export default function AccountBalanceCard({
  balance = 1000000,
  balanceVisible = true,
  toggleBalanceVisibility = () => {},
  commissionData = { total: 50000, progress: 75, trend: 15 },
  withdraw
}) {
  // Determine trend direction and color
  const isPositiveTrend = commissionData.trend >= 0;
  const trendIcon = isPositiveTrend ? "trending-up" : "trending-down";
  const trendColor = isPositiveTrend ? "#4ade80" : "#ef4444"; // Green for positive, Red for negative
  const trendText = "this month" 

  
  return (
    <View className="bg-primary mb-6 p-4 rounded-xl">
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-white text-sm mb-1">Account Balance</Text>
          <Text
            className={`text-white text-3xl font-bold ${!balanceVisible && 'mt-0'}`}
          >
            {balanceVisible
              ? `₦${balance.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : "****"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleBalanceVisibility}
          className="flex-row items-center justify-center p-2 bg-white/10 rounded-full"
          accessibilityLabel={balanceVisible ? "Hide Balance" : "Show Balance"}
        >
          {balanceVisible ? (
            <Ionicons name="eye-off" size={20} color="#fff" />
          ) : (
            <Ionicons name="eye" size={20} color="#ddd" />
          )}
        </TouchableOpacity>
      </View>
      
      <View className="mt-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white font-semibold">Total Commission</Text>
          <Text className="text-white font-bold">
            ₦{commissionData.total.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
        <View className="bg-white/10 rounded-full h-2 overflow-hidden mb-2">
          <View
            className="bg-teal-500 h-full"
            style={{ width: `${commissionData.progress}%` }}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center space-x-2">
            <Feather name={trendIcon} size={16} color={trendColor} />
            <Text className="text-white text-sm">
              {commissionData.trend}% {trendText}
            </Text>
          </View>
          <Pressable onPress={withdraw} className="flex-row items-center space-x-1">
            <Ionicons name="arrow-up-circle" size={16} color="#fff" />
            <Text className="text-white text-sm">Withdraw</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
