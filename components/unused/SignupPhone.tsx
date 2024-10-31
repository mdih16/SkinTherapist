import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { router } from "expo-router";
import RoundButton from "@/RoundButton";
import InputLine1 from "@/unused/InputLine1";
import InputLine from "@/unused/InputLine";
import { AntDesign } from "@expo/vector-icons";
import AuthButton from "@/AuthButton";

import { useState, useRef } from "react";

export default function SignupPhone() {
  const [number, onChangeNumber] = useState("");

  return (
    <View className="flex flex-col h-full border-solid border-0 bg-[#ffffff]">
      <View className="absolute top-16 left-6">
        <RoundButton onPress={() => router.back()} />
      </View>

      <SafeAreaView className="absolute flex-col w-full h-96 mt-[120px]">
        <View className="flex">
          <View className="w-full ml-6">
            <Text className="font-bold text-4xl color-[#000000]">
              Telefonnummer
            </Text>
          </View>

          <View className=" w-full flex flex-row gap-4 py-3 mt-3 ml-6">
            <InputLine />
            <View>
              <AntDesign
                name="down"
                size={20}
                color="black"
                style={styles.icon}
              />
            </View>
            <View>
              <InputLine1 type="numeric" onChangeText={onChangeNumber} />
            </View>
          </View>

          <View className="mt-1 ml-6 ">
            <Text className="font-regular text-2xs color-[#6C757D]">
              Vi kommer att skicka en kod för att verifiera att du verkligen är
              du
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <View className="w-3/4 h-16 bg-[#594359] rounded-[30px] ml-12 mt-[350px]">
        <AuthButton label="Nästa" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    marginTop: 25,
  },
});
