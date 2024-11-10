import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProviderSelector from "./ProviderSelector";
import ConfirmModal from "./ConfirmModal";
import { serviceProviders } from "../../data/dataPlans";
import { useAuth } from "../../contexts/AuthContext";

const DataSection = () => {
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "08012345678");
  const [selectedProvider, setSelectedProvider] = useState(serviceProviders.mtn);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Daily");

  const [selectedPlan, setSelectedPlan] = useState({
    price: null,
    cashback: null,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const timePeriods = [
    "Daily",
    "Weekly",
    "Monthly",
    "2 Months",
    "3 Months",
    "Yearly",
  ];

  const handleConfirm = () => {
    // Handle confirmation logic
    setShowConfirmModal(false);
  };

  const renderTimePeriodItem = ({ item }) => (
    <TouchableOpacity
      style={{
        padding: 8,
        borderRadius: 10,
        margin: 4,
        backgroundColor: selectedTimePeriod === item ? "#008773" : "#E5E7EB",
      }}
      onPress={() => setSelectedTimePeriod(item)}
    >
      <Text
        style={{
          textAlign: "center",
          color: selectedTimePeriod === item ? "#FFFFFF" : "#4B5563",
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderPlanItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#FFFFFF",
        padding: 12,
        borderRadius: 10,
        margin: 4,
        flex: 1,
        minWidth: "30%",
      }}
      onPress={() => {
        setSelectedPlan(item);
        setShowConfirmModal(true);
      }}
    >
      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
        {item.data}
      </Text>
      <Text style={{ textAlign: "center" }}>{item.duration}</Text>
      <Text style={{ textAlign: "center" }}>
        {item.price ? `₦${item.price}` : "Price N/A"}
      </Text>
      <Text style={{ textAlign: "center", color: "#16A34A" }}>
        Cashback: {item.cashback ? `₦${item.cashback}` : "N/A"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          padding: 8,
        }}
      >
        <ProviderSelector
          onSelect={setSelectedProvider}
          selectedProvider={selectedProvider}
        />
        <TextInput
          style={{ flex: 1, marginLeft: 8, fontSize: 16 }}
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={{ padding: 8 }}>
          <Ionicons name="person-circle" size={24} color="#008773" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={timePeriods}
        renderItem={renderTimePeriodItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        data={selectedProvider?.plans?.[selectedTimePeriod] || []}
        renderItem={renderPlanItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        scrollEnabled={false}
      />

      <ConfirmModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        details={{
          type: "Data",
          provider: selectedProvider,
          plan: selectedPlan,
          phoneNumber: phoneNumber,
        }}
      />
    </View>
  );
};

export default DataSection;