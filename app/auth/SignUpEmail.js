import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/BackButton";
import InputLine0 from "../../components/InputLine0";
import AuthButton from "../../components/AuthButton";

import { useState } from "react";
import SignUpHeader from "../../components/SignUpHeader";

export default Sign = () => {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView>
      <View className="w-full h-full px-6">
        <SignUpHeader
          header={"Din e-mail?"}
          subhead1={"Förlora inte åtkomst till ditt konto"}
          subhead2={"Bekräfta din e-mail!"}
        />
        <View className="mt-8">
          <InputLine0
            text={email}
            onChangeText={setEmail}
            type="email"
            placeHolder="exempel@gmail.com"
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
