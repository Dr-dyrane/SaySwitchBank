import React from 'react';
import { View, Text, Image } from 'react-native';

const Profile = () => {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <Image
        source={require('../../assets/profile.jpg')} // Replace with your actual profile picture
        className="w-32 h-32 rounded-full mb-4" // Profile picture styling
      />
      <Text className="text-2xl font-bold mb-2">John Doe</Text>
      <Text className="text-lg text-center mb-2">
        Email: john.doe@example.com
      </Text>
      <Text className="text-lg text-center">
        Phone: (123) 456-7890
      </Text>
      {/* You can add more profile information or components here as needed */}
    </View>
  );
};

export default Profile;
