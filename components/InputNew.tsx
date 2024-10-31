import {
  TextInput,
  Pressable,
  TouchableOpacity,
  Platform,
  TextInputProps,
} from "react-native";
import { useState, useRef } from "react";

type InputNew = {
  placeHolder: string;
  type: TextInputProps["autoComplete"];
  sensitive: boolean;
  onChangeText: (text: string) => void;
};

export default function InputNew({
  placeHolder,
  type,
  sensitive,
  onChangeText,
}: InputNew) {
  const [text, setText] = useState("");
  const [isTextHidden, setIsTextHidden] = useState(sensitive);
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  return (
    <Pressable
      className={`flex flex-row items-center w-full h-16 bg-white rounded-[10px] border border-solid ${
        isFocused ? "border-2 border-[#594359]" : ""
      }`}
      onPress={() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }}
    >
      <TextInput
        value={text}
        placeholder={placeHolder}
        placeholderTextColor={"#6C757D"}
        importantForAutofill="no"
        autoCorrect={false}
        spellCheck={false}
        autoCapitalize="none"
        autoComplete={type}
        secureTextEntry={isTextHidden}
        keyboardType={
          type === "email"
            ? "email-address"
            : isTextHidden === false && Platform.OS === "android"
            ? "visible-password"
            : "default"
        }
        maxLength={256}
        className={`flex-1 px-6 text-xl text-black font-roboto_regular ${
          !text ? "font-roboto_light_italic" : ""
        }  ${sensitive ? "pr-12" : ""}`}
        onChangeText={(input) => {
          setText(input);
          onChangeText(input);
        }}
        ref={textInputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Pressable>
  );
}
