import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default ProductCard = ({
  productName,
  productBrand,
  productFit,
  productId,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: "/" + productId,
          params: { productname: productName, brandname: productBrand },
        });
      }}
      className="flex flex-row w-full h-20 gap-6"
    >
      <View className="w-20 h-20 bg-secondary" />
      <View className="flex-1 flex flex-col">
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
    </TouchableOpacity>
  );
};
