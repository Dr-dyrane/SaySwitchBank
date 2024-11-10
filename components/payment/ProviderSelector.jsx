import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, Image } from "react-native";
import { serviceProviders } from "../../data/dataPlans";

const providerLogos = {
  mtn: require("../../assets/payment/serviceProvider/logo/MTN.png"),
  glo: require("../../assets/payment/serviceProvider/logo/Globacom.png"),
  airtel: require("../../assets/payment/serviceProvider/logo/Airtel Nigeria.png"),
  '9mobile': require("../../assets/payment/serviceProvider/logo/9mobile.png"),
};

const logoStyles = {
  mtn: {backgroundColor: "#FFCD00",
    borderRadius: 999,
    padding: 2,},
  glo: {},
  airtel: {
 
  },
  '9mobile': {
    
  },
};

const ProviderSelector = ({ onSelect, selectedProvider }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (provider) => {
    onSelect(provider);
    setModalVisible(false);
  };

  const renderProviderLogo = (providerId) => (
    <View style={[{ width: 24, height: 24 }, logoStyles[providerId]]}>
      <Image
        source={providerLogos[providerId]}
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        {renderProviderLogo(selectedProvider.id)}
        <Text style={{ marginLeft: 8 }}>{selectedProvider.name}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                padding: 16,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: "#CCC",
                  borderRadius: 2,
                  alignSelf: "center",
                  marginBottom: 16,
                }}
              />
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}
              >
                Select Provider
              </Text>
              <FlatList
                data={Object.values(serviceProviders)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 12,
                      borderBottomColor: "#E5E7EB",
                      borderBottomWidth: 1,
                    }}
                    onPress={() => handleSelect(item)}
                  >
                    {renderProviderLogo(item.id)}
                    <Text style={{ marginLeft: 12 }}>{item.name}</Text>
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