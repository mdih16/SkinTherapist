import { TextInput, Pressable, TouchableOpacity, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useRef } from "react";

const InputField = ({
  placeHolder,
  type,
  sensitive,
  cornerRadius,
  onChangeText,
}) => {
  const [text, setText] = useState("");
  const [isTextHidden, setIsTextHidden] = useState(sensitive);
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef(null);

  return (
    <Pressable
      className={`flex flex-row items-center w-full h-16 bg-white rounded-[${cornerRadius}px] border border-solid ${
        isFocused ? "border-2 border-[#594359]" : ""
      }`}
      onPress={() => {
        textInputRef.current.focus();
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
        className={`flex-1 px-6 text-base text-black font-roboto_regular ${
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
};

export default InputField;
