import { TextInput, Pressable } from "react-native";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

export default SearchBar = ({ placeHolder, disabled, onPress }) => {
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef(null);

  return (
    <Pressable onPress={() => onPress()} className="w-full h-12 flex flex-row items-center border rounded-[30px]">
      <Ionicons
        className="pl-3"
        name="search-outline"
        size={20}
        color="black"
        onPress={() => {
          if (!disabled) searchRef.current.focus();
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
};
