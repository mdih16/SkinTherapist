import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import IngredientBar from "../../components/IngredientBar";
import Ingredient from "../../components/Ingredient";
import BackButton from "../../components/BackButton";

export default Product = ({ productName, brandName, ingredients }) => {
  return (
    <SafeAreaView>
      <ScrollView className="px-6">
        <BackButton iconName="close-outline" />
        <Text className="font-roboto_medium text-2xl mt-6">{productName}</Text>
        <Text className="font-roboto_regular text-xl text-[#6C757D]">
          från {brandName}
        </Text>

        <Text className="font-roboto_bold text-2xl text-black mt-12">
          Ingredienser
        </Text>
        <Text className="font-roboto_regular text-base text-[#6C757D] mb-6">
          Tryck på en ingrediens för att få mer information.
          {"\n"}
          Vad innebär färgerna grön, gul och röd?
          <Text className="text-[#0056B3]"> Läs mer.</Text>
        </Text>
        <IngredientBar />
        <View className="mt-6">
          {ingredients.map((ingredient) => {
            return (
              <Ingredient
                ingredientName={ingredient.ingredientname}
                ingredientStatus={ingredient?.ingredientstatus}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
