import {
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useState } from "react";

const InputLine = ({ placeHolder, type, onChangeText }) => {
  const [number, setNumber] = useState("");
  const handleNumberChange = (text) => {
    setNumber(text);
  };
  return (
    <View className="w-20 h-16 bg-[#ffffff] border-solid border-2 border-x-transparent border-t-transparent flex flex-row">
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
        className="text-3xl font-medium"
      />
      <View className="flex flex-row absolute py-4">
        <Image
          source={require("../assets/images/flag.png")}
          alt="Flag"
          style={styles.image}
        />
        <Text className=" font-medium text-2xl color-[#000000] ml-1.5">
          +46
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    alignItems: "flex-start",
    height: 30,
    width: 30,
  },
});

export default InputLine;
