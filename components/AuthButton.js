import { Text, TouchableOpacity } from "react-native";

const AuthButton = ({ label, backgroundColor, textColor, border, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full h-16 flex items-center justify-center bg-[${backgroundColor}] rounded-[30px] ${
        border ? "border" : ""
      }`}
    >
      <Text className={`text-[${textColor}] font-roboto_bold text-xl`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
