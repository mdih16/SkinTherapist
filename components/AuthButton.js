import { View, Text, TouchableOpacity } from "react-native";

const AuthButton = ({ label }) => {
  return (
    <TouchableOpacity className="w-full h-16 flex items-center justify-center bg-[#594359] rounded-[30px]">
      <Text className="text-white font-medium text-xl">{label}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
