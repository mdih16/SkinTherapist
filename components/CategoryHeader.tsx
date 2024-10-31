import { View, Text } from "react-native";

type CategoryHeaderProps = {
  categoryText: string;
  isFocused: boolean;
};

export default function CategoryHeader({
  categoryText,
  isFocused,
}: CategoryHeaderProps) {
  return (
    <View className="flex items-center justify-center">
      <Text
        className={`font-roboto_bold text-base ${
          isFocused ? "text-black border-b-2 border-primary" : "text-[#6C757D]"
        }`}
      >
        {categoryText}
      </Text>
    </View>
  );
}
