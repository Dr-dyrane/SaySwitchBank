import React from "react";
import { View, Text, Image } from "react-native";

const serviceProviders = {
  mtn: {
    name: "MTN",
    backgroundColor: "#FFCD00", // Yellow for MTN
    textColor: "#000000", // Black for contrast
    logo: require("../../assets/payment/serviceProvider/logo/MTN.png"),
    aspect: "aspect-[529/265]",
    description: "Recharge your MTN airtime and data instantly!",
    logoStyle: {},
  },
  glo: {
    name: "Glo",
    backgroundColor: "#4CBB77", // Green for Glo
    textColor: "#FFFFFF", // White for contrast
    logo: require("../../assets/payment/serviceProvider/logo/Globacom.png"),
    aspect: "aspect-[1/1]",
    description: "Instant Glo airtime and data recharge at your fingertips!",
    logoStyle: {},
  },
  airtel: {
    name: "Airtel",
    backgroundColor: "#FF0000", // Red for Airtel
    textColor: "#FFFFFF", // White for contrast
    logo: require("../../assets/payment/serviceProvider/logo/Airtel Nigeria.png"),
    aspect: "aspect-[1/1]",
    description: "Quick and easy Airtel recharge for all your needs!",
    logoStyle: {
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      padding: 4,
    },
  },
  '9mobile': {
    name: "9Mobile",
    backgroundColor: "#006F53", // Green for 9Mobile
    textColor: "#FFFFFF", // White for contrast
    logo: require("../../assets/payment/serviceProvider/logo/9mobile.png"),
    aspect: "aspect-[1/1]",
    description: "Stay connected with 9Mobile - recharge now!",
    logoStyle: {
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      padding: 4,
    },
  },
};

export default function ServiceBanner({ selectedProvider }) {
  const provider = serviceProviders[selectedProvider] || serviceProviders.mtn;

  return (
    <View className={`w-full h-auto rounded-2xl overflow-hidden flex-row px-4 pt-4 space-x-2 relative`} style={{ backgroundColor: provider.backgroundColor }}>
      <View className={`absolute top-4 right-4 h-8 ${provider.aspect}`} style={provider.logoStyle}>
        <Image
          source={provider.logo}
          className="w-full h-full object-contain"
        />
      </View>
      <View className="h-40 aspect-[470/533]">
        <Image
          source={require("../../assets/payment/serviceProvider/banner.png")}
          className="w-full h-full object-cover"
        />
      </View>
      <View className="flex flex-1 justify-center">
        <Text className={`text-2xl font-bold`} style={{ color: provider.textColor }}>
          Airtime & Data Recharge
        </Text>
        <Text className={`text-base opacity-80`} style={{ color: provider.textColor }}>
          {provider.description}
        </Text>
      </View>
    </View>
  );
}