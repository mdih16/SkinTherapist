import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { fetchIngredientsByProductId } from "../../services/supabase/queries";
import Ingredient from "@/Ingredient";
import RoundButton from "@/RoundButton";

type IngredientBarProps = {
  colorRatio: {
    G: number;
    Y: number;
    R: number;
    U: number;
  };
};

const IngredientBar = ({ colorRatio }: IngredientBarProps) => {
  return (
    <View className="flex flex-row w-full h-2 bg-[#6C757D] rounded-[30px]">
      <View className={`h-full w-[${colorRatio.G}%] bg-[#28A745]`} />
      <View className={`h-full w-[${colorRatio.Y}%] bg-[#FFC107]`} />
      <View className={`h-full w-[${colorRatio.R}%] bg-[#DC3545]`} />
      <View className={`h-full w-[${colorRatio.U}%] bg-[#6C757D]`} />
    </View>
  );
};

type Ingredient = {
  ingredientname: string;
  description: string | null;
  status: 0 | 1 | 2 | undefined;
};

export default function Product() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    Product: product_id,
    brandname,
    productname,
  } = useLocalSearchParams();

  const generateRatio = () => {
    const ingredientCount = {
      total: 0,
      green: 0,
      yellow: 0,
      red: 0,
      unknown: 0,
    };

    ingredients.forEach((ingredient) => {
      ingredientCount.total++;
      switch (ingredient.status) {
        case 0:
          ingredientCount.green++;
          break;
        case 1:
          ingredientCount.yellow++;
          break;
        case 2:
          ingredientCount.red++;
          break;
        default:
          ingredientCount.unknown++;
          break;
      }
    });

    const { total, green, yellow, red, unknown } = ingredientCount;

    return {
      G: (green / total) * 100,
      Y: (yellow / total) * 100,
      R: (red / total) * 100,
      U: (unknown / total) * 100,
    };
  };

  useEffect(() => {
    const getIngredients = async () => {
      const data = await fetchIngredientsByProductId(product_id);
      setIngredients(data);
      setLoading(false);
    };
    setLoading(true);
    getIngredients();
  }, [product_id]);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView className="h-full px-6 bg-white">
        <RoundButton
          iconName="close-outline"
          onPress={() => {
            router.back();
          }}
        />
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
        {loading && (
          <View className="flex w-full items-center justify-center mt-12">
            <ActivityIndicator size="large" color="#000000" />
          </View>
        )}
        {!loading && ingredients && (
          <View className="bg-white">
            <IngredientBar colorRatio={generateRatio()} />
            <View className="my-6">
              {ingredients.map((ingredient) => (
                <Ingredient
                  key={ingredient.ingredientname}
                  ingredientName={ingredient.ingredientname}
                  ingredientStatus={ingredient.status}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
