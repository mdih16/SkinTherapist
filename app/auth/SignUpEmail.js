import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/BackButton";
import InputLine0 from "../../components/InputLine0";
import AuthButton from "../../components/AuthButton";

import { useState } from "react";

export default Sign = () => {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView>
      <View className="w-full h-full px-6">
        <BackButton />
        <Text className="font-roboto_medium text-4xl color-black mt-6">
          Din e-mail?
        </Text>
        <View className="mt-8">
          <InputLine0
            text={email}
            onChangeText={setEmail}
            type="email"
            placeHolder="exempel@gmail.com"
          />
        </View>
        <View className="flex flex-row gap-1 mt-4 mb-12">
          <Text className="font-regular text-xs color-[#6C757D]">
            Förlora inte åtkomsten till ditt konto.
          </Text>
          <Text className="text-xs font-bold text-[#594359]">
            Bekräfta din e-mail!
          </Text>
        </View>
        <AuthButton
          label="Nästa"
          backgroundColor="#594359"
          textColor="#ffffff"
        />
      </View>
    </SafeAreaView>
  );
};
