import {
  TextInput,
  Pressable,
  TouchableOpacity,
  Platform,
  TextInputProps,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useRef } from "react";

type InputFieldProps = {
  placeHolder: string;
  type: TextInputProps["autoComplete"];
  sensitive: boolean;
  cornerRadius: number;
  onChangeText: (text: string) => void;
};

export default function InputField({
  placeHolder,
  type,
  sensitive,
  cornerRadius,
  onChangeText,
}: InputFieldProps) {
  const [text, setText] = useState("");
  const [isTextHidden, setIsTextHidden] = useState(sensitive);
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  return (
    <Pressable
      className={`flex flex-row items-center w-full h-16 bg-white rounded-[${cornerRadius}px] border border-solid ${
        isFocused ? "border-1 border-primary" : ""
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
      {sensitive && (
        <TouchableOpacity
          className="absolute right-3 py-3"
          onPress={() => {
            setIsTextHidden(!isTextHidden);
          }}
        >
          <Ionicons
            name={isTextHidden ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="#BFA4BF"
          />
        </TouchableOpacity>
      )}
    </Pressable>
  );
}
