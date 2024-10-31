import { TouchableOpacity, View } from "react-native";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

type IoniconsGlyphs = React.ComponentProps<typeof Ionicons>["name"];

type RoundButtonProps = {
  iconName?: IconProps<IoniconsGlyphs>["name"];
  onPress?: () => void;
};

export default function RoundButton({ iconName, onPress }: RoundButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className="h-12 w-12">
      <View
        className={
          "flex items-center justify-center w-full h-full rounded-full bg-secondary/30"
        }
      >
        <Ionicons
          name={!iconName ? "chevron-back-outline" : iconName}
          size={32}
          color="#000000"
        />
      </View>
    </TouchableOpacity>
  );
}
