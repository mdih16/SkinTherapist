import { TextInput, Pressable, TouchableOpacity, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useRef } from "react";

const InputField = ({ placeHolder, type, sensitive, onChangeText }) => {
  const [text, setText] = useState("");
  const [isTextHidden, setIsTextHidden] = useState(sensitive);
  const textInputRef = useRef(null);

  return (
    <Pressable
      className="w-full h-16 bg-[#F2EEF2] rounded-[30px] flex flex-row items-center"
      onPress={() => {
        textInputRef.current.focus();
      }}
    >
      <TextInput
        value={text}
        placeholder={placeHolder}
        placeholderTextColor={"#BFA4BF"}
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
        className={`flex-1 px-6 text-[#A28AA3] font-medium text-base ${
          sensitive ? "pr-12" : ""
        }`}
        onChangeText={(input) => {
          setText(input);
          onChangeText(input);
        }}
        ref={textInputRef}
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
