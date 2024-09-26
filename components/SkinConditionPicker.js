import { View, Text, TouchableOpacity } from "react-native";

const SKIN_CONDITIONS = [
  "Normal",
  "Torr",
  "Fet",
  "Kombinerad",
  "Känslig",
  "Akne",
  "Eksem",
  "Rosacea",
  "Psoriasis",
  "Mogen",
];

const SkinConditionButton = ({ active, label }) => {
  return (
    <View
      className={`flex w-full h-10 items-center justify-center rounded-[30px] ${
        active ? "bg-[#594359]" : "bg-white border-2 border-[#6C757D]"
      }`}
    >
      <Text
        className={`font-roboto_bold text-base ${
          active ? "text-white" : "text-[#6C757D]"
        }`}
      >
        {label}
      </Text>
    </View>
  );
};

export default SkinConditionPicker = ({
  activeSkinConditions,
  setActiveSkinConditions,
}) => {
  return (
    <View className="flex flex-row flex-wrap gap-y-2 justify-between">
      {SKIN_CONDITIONS.map((skinCondition, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              const conditionIndex = index + 1;
              setActiveSkinConditions((prevConditions) => {
                if (prevConditions.includes(conditionIndex)) {
                  return prevConditions.filter(
                    (element) => element !== conditionIndex
                  );
                } else {
                  return [...prevConditions, conditionIndex];
                }
              });
            }}
            key={index}
            className="w-[31%]"
          >
            <SkinConditionButton
              label={skinCondition}
              active={activeSkinConditions.find(
                (element) => element === index + 1
              )}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
