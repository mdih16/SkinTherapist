import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const SignUpHeader = ({ header, subhead1, subhead2 }) => {
  return (
    <View className="w-full h-full px-6">
      <Text className="font-roboto_medium text-4xl color-black mt-6">
        {header}
      </Text>
      <SafeAreaView className="flex flex-row gap-1 mt-4 mb-12">
        <Text className="font-regular text-2xs color-[#6C757D]">
          {subhead1}
        </Text>
        <Text className="text-2xs font-bold text-[#594359]">{subhead2} </Text>
      </SafeAreaView>
    </View>
  );
};
export default SignUpHeader;
