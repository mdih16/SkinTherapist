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
import ShortLine from "../../components/ShortLine";
import { AntDesign } from "@expo/vector-icons";
import AuthButton from "../../components/AuthButton";

import { useState, useRef } from "react";

export default function Sign() {
  const [number, onChangeNumber] = useState("");

  return (
    <View className="flex flex-col h-full border-solid border-0 bg-[#ffffff]">
      <View className="absolute top-16 left-6">
        <BackButton />
      </View>

      <SafeAreaView className="absolute flex-col w-full h-96 mt-[120px]">
        <View className="flex" keyboardShouldPersistTaps="handled">
          <View className="w-full ml-6 pr-6">
            <Text className="font-bold text-4xl color-[#000000]">
              Ange din verifieringskod
            </Text>
          </View>
          <View className="flex flex-row gap-1 mt-2 ml-6">
            <Text className="font-regular text-xs color-[#6C757D]">
              Skickat till +46 123456789.
            </Text>

            <TouchableOpacity>
              <Text className="text-xs font-bold text-[#594359]">Redigera</Text>
            </TouchableOpacity>
          </View>

          <View className=" w-full flex flex-row gap-4 py-0 mt-3 ml-6 ">
            <View>
              <ShortLine type="numeric" onChangeText={onChangeNumber} />
            </View>
            <View>
              <ShortLine type="numeric" onChangeText={onChangeNumber} />
            </View>
            <View>
              <ShortLine type="numeric" onChangeText={onChangeNumber} />
            </View>
            <View>
              <ShortLine type="numeric" onChangeText={onChangeNumber} />
            </View>
            <View>
              <ShortLine type="numeric" onChangeText={onChangeNumber} />
            </View>
            <View>
              <ShortLine type="numeric" onChangeText={onChangeNumber} />
            </View>
          </View>
          <View className="flex flex-row gap-1 mt-4 ml-6 ">
            <Text className="font-regular text-xs color-[#6C757D]">
              Fick du ingenting? Inga problem!
            </Text>

            <TouchableOpacity>
              <Text className="text-xs font-bold text-[#594359]">
                Skicka igen!
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
