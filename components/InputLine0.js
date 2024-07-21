import { TextInput, Pressable, Platform } from "react-native";
import { useState, useRef } from "react";

const InputField = ({ placeHolder, type, sensitive, text, onChangeText }) => {
  const [isTextHidden, setIsTextHidden] = useState(sensitive);
  const textInputRef = useRef(null);

  return (
    <Pressable
      className="flex flex-row w-full border-solid border-b-2"
      onPress={() => {
        textInputRef.current.focus();
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
    </Pressable>
  );
};

export default InputField;
