import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { fetchIngredientsByProductId } from "../../services/supabase/queries";
import IngredientBar from "../../components/IngredientBar";
import Ingredient from "../../components/Ingredient";
import BackButton from "../../components/BackButton";

export default function Product() {
  const [ingredients, setIngredients] = useState(null);

  const {
    Product: product_id,
    brandname,
    productname,
  } = useLocalSearchParams();

  useEffect(() => {
    const getIngredients = async () => {
      const data = await fetchIngredientsByProductId(product_id);
      setIngredients(data);
    };
    getIngredients();
  }, [product_id]);

  if (!ingredients) return <View></View>;

  return (
    <SafeAreaView>
      <ScrollView className="px-6">
        <BackButton iconName="close-outline" />
        <Text className="font-roboto_medium text-2xl mt-6">{productname}</Text>
        <Text className="font-roboto_regular text-xl text-[#6C757D]">
          från {brandname}
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
          {ingredients.map((ingredient) => (
            <Ingredient
              key={ingredient.ingredientname}
              ingredientName={ingredient.ingredientname}
              ingredientStatus={ingredient.status}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
