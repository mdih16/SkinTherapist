import { View } from "react-native";

export default IngredientBar = (colorRatio) => {
  return (
    <View className="flex flex-row w-full h-2 bg-[#6C757D] rounded-[30px]">
      <View className={`h-full w-[50%] bg-[#28A745] rounded-[30px]`} />
      <View className={`h-full w-[25%] bg-[#FFC107] rounded-[30px]`} />
      <View className={`h-full w-[25%] bg-[#DC3545] rounded-[30px]`} />
    </View>
  );
};
