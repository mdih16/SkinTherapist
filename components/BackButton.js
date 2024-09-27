import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const BackButton = ({ iconName, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="h-12 w-12">
      <View
        className={`flex items-center justify-center w-full h-full rounded-full ${
          !backgroundColor ? "bg-secondary/30" : backgroundColor
        }`}
      >
        <Ionicons
          name={!iconName ? "chevron-back-outline" : iconName}
          size={32}
          color="#000000"
        />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
