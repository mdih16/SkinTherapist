import { View, Text } from "react-native";

export default ProductCard = ({ productName, productBrand, productFit }) => {
  return (
    <View className="flex flex-row w-full h-20 gap-6">
      <View className="w-20 h-20 bg-[#F2EEF2]" />
      <View className="flex-1 flex-shrink flex flex-col">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-roboto_medium text-[10px] text-black"
        >
          {productBrand}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-roboto_medium text-base text-black"
        >
          {productName}
        </Text>
        <Text className="font-roboto_regular text-base text-[#6C757D]">
          Passar för alla hudtyper
        </Text>
      </View>
    </View>
  );
};
