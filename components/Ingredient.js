import { View, Text } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";

export default Ingredient = ({ ingredientName, ingredientStatus }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = () => {
    if (ingredientStatus === 0) {
      return "-[#28A745]";
    } else if (ingredientStatus === 1) {
      return "-[#FFC107]";
    } else if (ingredientStatus === 2) {
      return "-[#DC3545]";
    } else {
      return "-[#6C757D]";
    }
  };

  const getStatusText = () => {
    if (ingredientStatus === 0) {
      return "Låg Risk";
    } else if (ingredientStatus === 1) {
      return "Medelhög Risk";
    } else if (ingredientStatus === 2) {
      return "Hög Risk";
    } else {
      return "Okänd Risk";
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpanded)}>
        <View className="flex flex-row w-full h-8 items-center justify-between mt-5">
          <View className="flex flex-row gap-2 items-center">
            <View
              className={`h-8 ${isExpanded ? "w-2" : "w-8"} ${
                "bg" + getStatusColor()
              } rounded-[10px]`}
            />
            <Text className="font-roboto_bold text-[#6C757D] text-base">
              {ingredientName}
            </Text>
          </View>
          <MaterialIcons
            name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="black"
          />
        </View>
      </TouchableWithoutFeedback>
      {isExpanded && (
        <View>
          <Text
            className={`font-roboto_bold text-base ${
              "text" + getStatusColor()
            } mt-4`}
          >
            {getStatusText()}
          </Text>
          <Text className="font-roboto_medium text-base text-black mt-3">
            Om
          </Text>
          <Text className="font-roboto_regular text-xs text-[#6C757D] mt-3">
            Propylene glycol is a small organic alcohol commonly used as a skin
            conditioning agent. It has been associated with irritant and
            allergic contact dermatitis as well as contact urticaria in humans;
            these sensitization effects can be manifested at propylene glycol
            concentrations as low as 2%.
          </Text>
        </View>
      )}
    </View>
  );
};
