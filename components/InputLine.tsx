import {
  TextInput,
  Pressable,
  TouchableOpacity,
  Platform,
  TextInputProps,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useRef } from "react";

type InputLineProps = {
  placeHolder?: string;
  type: TextInputProps["autoComplete"];
  sensitive?: boolean;
  text: string;
  onChangeText: (text: string) => void;
};

export default function InputLine({
  placeHolder,
  type,
  sensitive,
  text,
  onChangeText,
}: InputLineProps) {
  const [isTextHidden, setIsTextHidden] = useState(sensitive ?? false);
  const textInputRef = useRef<TextInput>(null);

  return (
    <Pressable
      className="flex flex-row w-full border-solid border-b-2 pr-12"
      onPress={() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }}
    >
      <TextInput
        className={`${
          text === "" ? "font-roboto_light_italic" : "font-roboto_regular"
        } text-xl text-black`}
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
        onChangeText={(input) => {
          onChangeText(input);
        }}
        ref={textInputRef}
      />
      {sensitive && (
        <TouchableOpacity
          className="absolute right-3"
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
