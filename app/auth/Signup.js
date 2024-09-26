import { View, Text, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import { signUp } from "../../services/supabase/auth";
import BackButton from "../../components/BackButton";
import InputLine0 from "../../components/InputLine0";
import AuthButton from "../../components/AuthButton";
import SkinConditionPicker from "../../components/SkinConditionPicker";

const SignupFieldTemplate = ({
  header,
  placeHolder,
  description,
  type,
  buttonLabel,
  sensitive,
  prevStep,
  nextStep,
  text,
  setText,
}) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <KeyboardAvoidingView className="w-full h-full px-6 bg-white">
        <BackButton onPress={prevStep} />
        <Text className="font-roboto_medium text-4xl color-black mt-6">
          {header}
        </Text>
        <Text className="font-roboto_regular text-base color-[#6C757D] mb-12">
          {description}
        </Text>
        <InputLine0
          text={text}
          onChangeText={setText}
          type={type ? type : null}
          placeHolder={placeHolder}
          sensitive={sensitive}
        />
        <View className="absolute bottom-6 w-full mx-6">
          <AuthButton
            label={buttonLabel}
            backgroundColor="#594359"
            onPress={nextStep}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const SignupSkinCondition = ({
  prevStep,
  nextStep,
  activeSkinConditions,
  setActiveSkinConditions,
}) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <KeyboardAvoidingView className="w-full h-full px-6 bg-white">
        <BackButton onPress={prevStep} />
        <Text className="font-roboto_medium text-4xl color-black mt-6">
          Beskriv din hud
        </Text>
        <Text className="font-roboto_regular text-base color-[#6C757D] mb-12">
          Välj alla som gäller.
        </Text>
        <SkinConditionPicker
          activeSkinConditions={activeSkinConditions}
          setActiveSkinConditions={setActiveSkinConditions}
        />
        <View className="absolute bottom-6 w-full mx-6">
          <AuthButton
            label="Nästa"
            backgroundColor="#594359"
            onPress={nextStep}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [skinConditions, setSkinConditions] = useState([]);
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  const prevStep = () => {
    setStep((step) => {
      return step - 1;
    });
  };

  const nextStep = () => {
    setStep((step) => {
      return step + 1;
    });
  };

  switch (step) {
    case 1:
      return (
        <SignupFieldTemplate
          header={"Din e-mail"}
          description={
            "Förlora inte åtkomsten till ditt konto. Bekräfta din e-mail!"
          }
          placeHolder={"exempel@gmail.com"}
          type={"email"}
          buttonLabel={"Nästa"}
          prevStep={() => router.back()}
          nextStep={nextStep}
          text={email}
          setText={setEmail}
        />
      );
    case 2:
      return (
        <SignupFieldTemplate
          header={"Vad heter du?"}
          description={"Ange namnet som du använder till vardags."}
          buttonLabel={"Nästa"}
          prevStep={prevStep}
          nextStep={nextStep}
          text={name}
          setText={setName}
        />
      );
    case 3:
      return (
        <SignupSkinCondition
          prevStep={prevStep}
          nextStep={nextStep}
          activeSkinConditions={skinConditions}
          setActiveSkinConditions={setSkinConditions}
        />
      );
    case 4:
      return (
        <SignupFieldTemplate
          header={"Välj ett lösenord"}
          description={
            "Lösenordet måste innehålla minst 6 tecken och bestå av en kombination av siffror, bokstäver och specialtecken (!$@%)."
          }
          placeHolder={""}
          buttonLabel={"Skapa konto"}
          sensitive={true}
          prevStep={prevStep}
          nextStep={async () => {
            await signUp(email, password, name, skinConditions);
            router.replace("/auth/");
          }}
          text={password}
          setText={setPassword}
        />
      );
  }
};
