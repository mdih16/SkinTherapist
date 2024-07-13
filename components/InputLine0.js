import { TextInput, Pressable, TouchableOpacity, Platform } from "react-native";
import { useState, useRef } from "react";

const InputField = ({ placeHolder, type, sensitive, onChangeText }) => {
  const [text, setText] = useState("");
  const [isTextHidden, setIsTextHidden] = useState(sensitive);
  const textInputRef = useRef(null);

  return (
    <Pressable
      className="w-[310px] h-16 bg-[#ffffff] border-solid border-2 border-x-transparent border-t-transparent flex flex-row items-center"
      onPress={() => {
        textInputRef.current.focus();
      }}
    >
      <TextInput
        className="text-xl font-regular"
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
          setText(input);
          onChangeText(input);
        }}
        ref={textInputRef}
      />
    </Pressable>
  );
};

export default InputField;
