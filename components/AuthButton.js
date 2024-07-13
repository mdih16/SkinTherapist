import { View, Text, TouchableOpacity } from "react-native";

const AuthButton = ({ label }) => {
  return (
    <TouchableOpacity className="w-full h-16 flex items-center justify-center">
      <Text className="text-white font-bold text-xl">{label}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
