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

        <View className="mt-8">
          <InputLine0
            text={firstName}
            onChangeText={setfirstName}
            type="default"
            placeHolder="Förnamn"
          />
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
