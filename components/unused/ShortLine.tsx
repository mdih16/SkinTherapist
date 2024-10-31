import {
  TextInput,
  Pressable,
  TouchableOpacity,
  Platform,
  TextInputProps,
} from "react-native";
import { useState } from "react";

type ShortLineProps = {
  placeHolder: string;
  type: TextInputProps["autoComplete"];
  onChangeText: (text: string) => void;
};

export default function ShortLine({
  placeHolder,
  type,
  onChangeText,
}: ShortLineProps) {
  const [number, setNumber] = useState("");
  const handleNumberChange = (text: string) => {
    setNumber(text);
  };
  return (
    <Pressable className="w-[40px] h-16 bg-[#ffffff] border-solid border-2 border-x-transparent border-t-transparent flex flex-row items-center">
      <TextInput
        placeholder={placeHolder}
        placeholderTextColor={"#BFA4BF"}
        importantForAutofill="no"
        autoCorrect={false}
        spellCheck={false}
        autoCapitalize="none"
        autoComplete={type}
        keyboardType="numeric"
        value={number}
        onChangeText={handleNumberChange}
        className="text-3xl font-medium"
      />
    </Pressable>
  );
}
