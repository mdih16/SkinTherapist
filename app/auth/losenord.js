import React from "react";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/BackButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthButton from "../../components/AuthButton";
import InputNew from "../../components/InputNew";
import { useState, useRef } from "react";

export default function lösenord() {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView>
      <View className="flex flex-col w-full h-full items-center px-6">
        <View className="absolute top-8 left-6">
          <BackButton />
        </View>
        <View
          className={`flex h-[60px] w-[60px] items-center justify-center mt-[80px] rounded-[10px] bg-[#F2EEF2]`}
        >
          <Ionicons name="mail-open-outline" size={42} color="#594359" />
        </View>
        <Text className=" font-roboto_medium text-4xl text-[#0000000] mt-[15px] pt-[5px]">
          Återställ ditt lösenord
        </Text>
        <Text className=" font-roboto_regular text-2xs text-[#6C757D] mt-[5px]">
          Har du glömt ditt lösenord? Ange din e-postadress så{" "}
          <Text className="font-roboto_regular text-2xs text-[#6C757D]">
            skickar vi en återställningslänk till dig
          </Text>
        </Text>
        <View className="w-full h-16 mt-[15px]">
          <InputNew
            onChangeText={setEmail}
            placeHolder="E-post"
            sensitive={false}
            type="email"
          />
        </View>
        <View className=" w-full mx-6 mt-[25px]">
          <AuthButton label="Skicka" backgroundColor="#594359" />
        </View>
      </View>
    </SafeAreaView>
  );
}
