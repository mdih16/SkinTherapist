import { View, Text, KeyboardAvoidingView, TextInputProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { SetStateAction, useState } from "react";
import { signUp } from "../../services/supabase/auth";
import {
  isValidEmail,
  isValidFirstName,
  isValidPassword,
} from "../../utils/regex";
import RoundButton from "@/RoundButton";
import AuthButton from "@/AuthButton";
import SkinConditionPicker from "@/SkinConditionPicker";
import InputLine from "@/InputLine";

interface SignupFieldTemplateProps {
  header: string;
  placeHolder?: string;
  description: string;
  type?: TextInputProps["autoComplete"];
  buttonLabel: string;
  sensitive?: boolean;
  prevStep: () => void;
  nextStep: () => void;
  text: string;
  setText: (text: string) => void;
  regexFn: (text: string) => boolean;
}

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
  regexFn,
}: SignupFieldTemplateProps) => {
  const [isValid, setIsValid] = useState(false);

  const handelOnChangeText = (text: string) => {
    setText(text);
    setIsValid(regexFn(text));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <KeyboardAvoidingView className="w-full h-full px-6 bg-white">
        <RoundButton onPress={prevStep} />
        <Text className="font-roboto_medium text-4xl color-black mt-6">
          {header}
        </Text>
        <Text className="font-roboto_regular text-base color-[#6C757D] mb-12">
          {description}
        </Text>
        <InputLine
          text={text}
          onChangeText={handelOnChangeText}
          type={type}
          placeHolder={placeHolder}
          sensitive={sensitive}
        />
        <View className="absolute bottom-6 w-full mx-6">
          <AuthButton
            label={buttonLabel}
            backgroundColor={"primary"}
            onPress={nextStep}
            disabled={!isValid}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

type SignupSkinConditionProps = {
  prevStep: () => void;
  nextStep: () => void;
  activeSkinConditions: number[];
  setActiveSkinConditions: React.Dispatch<SetStateAction<number[]>>;
};

const SignupSkinCondition = ({
  prevStep,
  nextStep,
  activeSkinConditions,
  setActiveSkinConditions,
}: SignupSkinConditionProps) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <KeyboardAvoidingView className="w-full h-full px-6 bg-white">
        <RoundButton onPress={prevStep} />
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
            backgroundColor="primary"
            onPress={nextStep}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [skinConditions, setSkinConditions] = useState<number[]>([]);
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
          regexFn={isValidEmail}
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
          regexFn={isValidFirstName}
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
          regexFn={isValidPassword}
        />
      );
  }
}
