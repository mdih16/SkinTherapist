import { TextInput, Pressable, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";

const InputLine1 = ({ placeHolder, type, onChangeText }) => {
  const [number, setNumber] = useState("");
  const handleNumberChange = (text) => {
    setNumber(text);
  };
  return (
    <Pressable className="w-[195px] h-16 bg-[#ffffff] border-solid border-2 border-x-transparent border-t-transparent flex flex-row items-center">
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
        className="text-2xl font-medium"
      />
    </Pressable>
  );
};

export default InputLine1;
