import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Pressable,
  Share,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";
import TransferBanner from "../components/transfer/TransferBanner";
import TransactionCard from "../components/transactions/TransactionCard";
import transactions from "../data/transactions";
import logo from "../assets/icon.png";

const quickAmounts = [1000, 2000, 5000, 10000, 20000];

export default function TapPayScreen() {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const router = useRouter();
  const { showToast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const tapPayments = transactions
      .filter((t) => t.service_type === "Fund Receipt")
      .slice(0, 2);
    setRecentTransactions(tapPayments);
  }, []);

  const simulatePayment = () => {
    if (!amount) {
      showToast("Please enter an amount first", "error");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;
      if (isSuccess) {
        showToast("Payment successful!", "success");
        router.push({ pathname: "transDetails", params: { id: 20 } });
      } else {
        showToast("Payment failed. Please try again.", "error");
      }
      setIsProcessing(false);
    }, 2000);
  };

  const handleViewDetails = (id) => {
    router.push({ pathname: "transDetails", params: { id } });
  };

  const handleAmountChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
  };

  const shareAccountDetails = async () => {
    try {
      await Share.share({
        message: `Account Name: ${user?.fullName || "User Name"}\nAccount Number: ${
          user?.phone || "1234567890"
        }\nBank: XYZ Bank\nTap Pay: Enabled`,
      });
    } catch (error) {
      showToast("Error sharing account details", "error");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white px-4 pb-4"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
        className=""
      >
        <TransferBanner type="nfc" />

        <View className="">
          <Text className="text-gray-500 mb-2">Account Details</Text>

          <View className="bg-slate-50 p-3 rounded-2xl mb-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3">
                <View className="flex items-center justify-center">
                  <View className="border border-slate-400/20 rounded-full bg-teal-50/50">
                    <Image
                      source={logo}
                      resizeMode="fit"
                      className="w-10 h-10 rounded-full"
                    />
                  </View>
                </View>
                <View>
                  <Text className="font-semibold text-lg">
                    {user?.fullName || "User Name"}
                  </Text>
                  <Text className="text-gray-500">
                    {user?.phone || "1234567890"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={shareAccountDetails}>
                <MaterialCommunityIcons
                  name="share-circle"
                  size={32}
                  color="teal"
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text className="text-gray-500 mb-2">Amount to Pay</Text>
          <View className="flex-row items-center bg-slate-50 p-3 px-4 rounded-xl mb-4">
            <Text className="mr-2">₦</Text>
            <TextInput
              className="flex-1 bg-transparent"
              value={amount ? Number(amount).toLocaleString() : ""}
              onChangeText={handleAmountChange}
              placeholder="Enter amount"
              keyboardType="numeric"
            />
            {amount && (
              <TouchableOpacity
                onPress={() => {
                  setAmount("");
                }}
                style={{
                  padding: 4,
                  backgroundColor: "#ff000020",
                  borderRadius: 30,
                }}
              >
                <Ionicons name="close" size={10} color="red" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={{
              width: "100%",
              justifyContent: "space-between",
            }}
            className="flex-row space-x-4 mb-4"
          >
            {quickAmounts.map((quickAmount) => (
              <TouchableOpacity
                key={quickAmount}
                onPress={() => handleAmountChange(quickAmount.toString())}
                className="bg-slate-50 p-2 rounded-md"
              >
                <Text className="font-medium">
                  ₦{quickAmount.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            onPress={simulatePayment}
            disabled={isProcessing || !amount}
            className={`${
              !amount || isProcessing ? "bg-gray-300" : "bg-primary"
            } py-4 px-6 rounded-xl flex-row items-center justify-between mt-6`}
          >
            <Text className="text-white text-lg font-semibold mr-2">
              {isProcessing ? "Processing..." : "Tap to Pay"}
            </Text>
            <View className="w-6 h-6 bg-none border border-white rounded-full justify-center items-center">
              {isProcessing ? (
                <ActivityIndicator size={18} color="white" />
              ) : (
                <Ionicons name="wifi" size={18} color="white" />
              )}
            </View>
          </TouchableOpacity>

          <View className="bg-blue-50 p-4 rounded-xl mt-6">
            <Text className="text-blue-800 text-center">
              In a real app, you would hold your device near the payment terminal to complete the transaction.
            </Text>
          </View>
        </View>

        <View className="mt-8">
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-gray-500">Recent Tap Payments</Text>
            <Pressable onPress={() => router.push("transactions")}>
              <Text style={{ textAlign: "center", color: "#008773" }}>
                View More
              </Text>
            </Pressable>
          </View>
          {recentTransactions && recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <Text className="text-gray-500 text-center">
              No transactions found.
            </Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}