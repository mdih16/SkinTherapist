import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import InputLine0 from "../../components/InputLine0";
import AuthButton from "../../components/AuthButton";

export default SignUpName = () => {
  const [firstName, setfirstName] = useState("");

  return (
    <SafeAreaView>
      <View className="w-full h-full px-6">
        <BackButton />
        <Text className="font-roboto_medium text-4xl color-black mt-6">
          Vad heter du?
        </Text>
        <View className="mt-8">
          <InputLine0
            text={firstName}
            onChangeText={setfirstName}
            type="default"
            placeHolder="Förnamn"
          />
        </View>
        <View className="flex flex-row gap-1 mt-4 mb-12">
          <Text className="font-regular text-2xs color-[#6C757D]">
            Förlora inte åtkomsten till ditt konto.
          </Text>
          <Text className="text-2xs font-bold text-[#594359]">
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
