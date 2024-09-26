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
import AuthButton from "../../components/AuthButton";
import { useState, useRef } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

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
          <AntDesign name="checkcircleo" size={42} color="#594359" />
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
          <AuthButton label="Logga in" backgroundColor="#594359" />
        </View>
      </View>
    </SafeAreaView>
  );
}
