import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import BackButton from "../../components/BackButton";
import InputLine0 from "../../components/InputLine0";
import AuthButton from "../../components/AuthButton";

import { useState, useRef } from "react";

export default function Sign() {
  const [email, setEmail] = useState("");

  return (
    <View className="flex flex-col h-full border-solid border-0 bg-[#ffffff]">
      <View className="absolute top-16 left-6">
        <BackButton />
      </View>

      <SafeAreaView className="absolute flex-col w-full h-96 mt-[120px] ml-6">
        <View className="flex" keyboardShouldPersistTaps="handled">
          <View className="w-full">
            <Text className="font-bold text-4xl color-[#000000]">
              Din e-mail?
            </Text>
          </View>
          <View className="flex flex-col w-full gap-4 mt-[30px]">
            <InputLine0
              onChangeText={setEmail}
              type="email"
              placeHolder="exempel@gmail.com"
            />
          </View>

          <View className="flex flex-row gap-1 mt-4 ">
            <Text className="font-regular text-xs color-[#6C757D]">
              Förlora inte åtkomsten till ditt konto.
            </Text>

            <TouchableOpacity>
              <Text className="text-xs font-bold text-[#594359]">
                Bekräfta din e-mail!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View className="w-3/4 h-16 mt-20 bg-[#594359] rounded-[30px] ml-12 mt-[350px]">
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
