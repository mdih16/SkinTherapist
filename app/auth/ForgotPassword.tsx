import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import RoundButton from "@/RoundButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthButton from "@/AuthButton";
import InputNew from "@/InputNew";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View className="w-full h-full px-6 bg-white items-center">
        <View className="absolute left-6">
          <RoundButton onPress={() => router.back()} />
        </View>
        <View
          className={`flex h-[60px] w-[60px] items-center justify-center mt-16 rounded-[10px] bg-secondary/30`}
        >
          <Ionicons name="mail-open-outline" size={42} color="#5B7F7E" />
        </View>
        <Text className="font-roboto_medium text-4xl text-black mt-5 pt-[5px]">
          Återställ ditt lösenord
        </Text>
        <Text className="w-full font-roboto_regular text-2xs text-[#6C757D] mt-5">
          Har du glömt ditt lösenord? Ange din e-postadress så skickar vi en
          återställningslänk till dig
        </Text>
        <View className="w-full h-16 mt-5">
          <InputNew
            onChangeText={setEmail}
            placeHolder="E-post"
            sensitive={false}
            type="email"
          />
        </View>
        <View className="w-full mt-16">
          <AuthButton
            label="Skicka"
            backgroundColor="primary"
            onPress={() => null}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
