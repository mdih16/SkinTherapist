import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import IngredientBar from "../../components/IngredientBar";
import Ingredient from "../../components/Ingredient";
import BackButton from "../../components/BackButton";

export default home = () => {
  const [ingredients, setIngredients] = useState([]);

  return (
    <SafeAreaView>
      <ScrollView className="px-6">
        <BackButton />
        <Text className="font-roboto_medium text-2xl mt-6">
          10% Azelaic Acid Booster
        </Text>
        <Text className="font-roboto_regular text-xl text-[#6C757D]">
          från Paula's Choice
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
          <Ingredient
            ingredientName={"Propylene Glycol"}
            ingredientStatus={0}
          />
          <Ingredient ingredientName={"Alcohol Denat"} ingredientStatus={1} />
          <Ingredient
            ingredientName={"Beeswax (Cera Alba)"}
            ingredientStatus={2}
          />
          <Ingredient
            ingredientName={"Propylene Glycol"}
            ingredientStatus={0}
          />
          <Ingredient
            ingredientName={"Propylene Glycol"}
            ingredientStatus={0}
          />
          <Ingredient
            ingredientName={"Propylene Glycol"}
            ingredientStatus={0}
          />
          <Ingredient
            ingredientName={"Propylene Glycol"}
            ingredientStatus={0}
          />
          <Ingredient
            ingredientName={"Propylene Glycol"}
            ingredientStatus={0}
          />
          <Ingredient
            ingredientName={"Propylene Glycol"}
            ingredientStatus={0}
          />
          <Ingredient
            ingredientName={"Propylene Glycol"}
            ingredientStatus={0}
          />
          <Ingredient
            ingredientName={"Propylene Glycol"}
            ingredientStatus={0}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
