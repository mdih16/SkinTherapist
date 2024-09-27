import { Text, TouchableOpacity } from "react-native";

const AuthButton = ({ label, backgroundColor, textColor, border, onPress }) => {
  const colorVariants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    white: "bg-white",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full h-16 flex items-center justify-center ${
        colorVariants[backgroundColor]
      } rounded-[30px] ${border ? "border" : ""}`}
    >
      <Text
        className={`${
          !textColor ? "text-white" : `text-[${textColor}]`
        } font-roboto_bold text-xl`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
