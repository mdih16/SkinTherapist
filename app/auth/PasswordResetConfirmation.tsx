import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RoundButton from "@/RoundButton";
import AuthButton from "@/AuthButton";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export default function PasswordResetonfirmation() {
  return (
    <SafeAreaView>
      <View className="flex flex-col w-full h-full items-center px-6">
        <View className="absolute top-8 left-6">
          <RoundButton onPress={() => router.back()} />
        </View>
        <View
          className={`flex h-[60px] w-[60px] items-center justify-center mt-[80px] rounded-[10px] bg-[#F2EEF2]`}
        >
          <AntDesign name="checkcircleo" size={42} color="#5B7F7E" />
        </View>
        <Text className=" font-roboto_medium text-4xl text-[#0000000] mt-[15px] pt-[5px]">
          Lösenord återställt!{" "}
        </Text>
        <Text className=" font-roboto_regular text-xl text-[#000000] mt-[15px]">
          Ditt lösenord har återställts.
        </Text>
        <Text className="font-roboto_regular text-xl text-[#000000]">
          Klicka nedan för att logga in.{" "}
        </Text>

        <View className=" w-full mx-6 mt-[50px]">
          <AuthButton
            label="Logga in"
            backgroundColor="primary"
            onPress={() => null}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
