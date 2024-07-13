import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const BackButton = () => {
  return (
    <TouchableOpacity className="h-12 w-12">
      <View className="flex items-center justify-center w-full h-full rounded-full bg-[#594359]/10">
        <Ionicons name="chevron-back-outline" size={32} color="#000000" />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
