// MoreScreen.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const MoreScreen = () => {
  const router = useRouter();

  const options = [
    { title: "Settings", icon: "settings-outline", route: "/settings" },
    { title: "Notifications", icon: "notifications-outline", route: "/notifications" },
    { title: "Help", icon: "help-circle-outline", route: "/help" },
    { title: "Logout", icon: "log-out-outline", action: () => alert("Logging out..."), color: "red" },
  ];

  return (
    <View className="flex-1 bg-white p-4 pt-0">
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center p-4 mb-3 bg-slate-50 rounded-xl justify-between"
          onPress={() => (option.route ? router.push(option.route) : option.action())}
        >
          <View className="flex flex-row items-center">
            <View
              className={`${
                option.title === "Logout" ? "bg-red-50" : "bg-[#E5F5F1]"
              } p-2 rounded-lg mr-4`}
            >
              <Ionicons
                name={option.icon}
                size={18}
                color={option.title === "Logout" ? "red" : "#008773"}
              />
            </View>
            <Text className="text-lg ml-2 text-gray-800">{option.title}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={option.title === "Logout" ? "red" : "teal"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MoreScreen;
