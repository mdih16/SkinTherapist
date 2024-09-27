import { Text, TouchableOpacity } from "react-native";

const AuthButton = ({
  label,
  backgroundColor,
  textColor,
  border,
  onPress,
  disabled,
}) => {
  const colorVariants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    white: "bg-white",
  };

  // Dynamically calculate the button className
  const buttonClassName = `
    w-full h-16 flex items-center justify-center 
    ${colorVariants[backgroundColor] || ""} 
    ${disabled ? "opacity-50" : ""} 
    rounded-[30px] 
    ${border ? "border" : ""}
  `;

  // Dynamically calculate the text className
  const textClassName = `
    ${textColor ? `text-[${textColor}]` : "text-white"} 
    font-roboto_bold text-xl
  `;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}
      className={buttonClassName.trim()}
    >
      <Text className={textClassName.trim()}>{label}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
