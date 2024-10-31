import { TextInput, Pressable } from "react-native";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

type SearchBarProps = {
  placeHolder: string;
  disabled?: boolean;
  onPress?: () => void;
};

export default function SearchBar({
  placeHolder,
  disabled,
  onPress,
}: SearchBarProps) {
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef<TextInput>(null);

  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      className="w-full h-12 flex flex-row items-center border rounded-[30px]"
    >
      <Ionicons
        className="pl-3"
        name="search-outline"
        size={20}
        color="black"
        onPress={() => {
          if (!disabled && searchRef.current) searchRef.current.focus();
        }}
      />
      <TextInput
        placeholder={placeHolder}
        placeholderTextColor={"#6C757D"}
        importantForAutofill="no"
        autoCorrect={false}
        spellCheck={false}
        autoComplete={"off"}
        keyboardType="default"
        value={searchText}
        onChangeText={setSearchText}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        className="flex-1 font-roboto_regular text-base pl-2 mr-5 bg-white"
        ref={searchRef}
      />
    </Pressable>
  );
}
