import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { fetchProducts } from "../../services/supabase/queries";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SearchBar from "../../components/SearchBar";
import CategoryHeader from "../../components/CategoryHeader";
import ProductCard from "../../components/ProductCard";
import { useAuth } from "../../services/supabase/AuthProvider";

const CATEGORIES = ["Allt", "Ansikte"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const { user } = useAuth();

  // FlatList state
  const [categoryItems, setCategoryItems] = useState([]);
  const [lastProductId, setLastProductId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 8;

  const getProducts = async (initialLoad = false) => {
    const data = await fetchProducts(
      pageSize,
      initialLoad ? null : lastProductId
    );
    if (data.length < pageSize) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }

    setCategoryItems((prevCategoryItems) => [...prevCategoryItems, ...data]);
    if (data.length > 0) {
      setLastProductId(data[data.length - 1].product_id);
    }
  };

  useEffect(() => {
    getProducts(true);
  }, []);

  const HomeHeader = () => (
    <View className="bg-white">
      <View className="flex flex-row items-center justify-between my-6">
        <Text className="font-roboto_regular text-xl text-[#6C757D]">
          Välkommen tillbaka, {"\n"}
          <Text className="font-roboto_bold text-3xl text-black">
            {user?.first_name}
          </Text>
        </Text>
        {/*
        <Image
          className="w-16 h-16 rounded-full"
          source={require("../../assets/images/profile.png")}
        />
        */}
      </View>
      <Link href={"/Search"} asChild>
        <SearchBar
          disabled={true}
          placeHolder={"Sök bland produkter och ingredienser"}
        />
      </Link>
      <ScrollView
        contentContainerStyle={{ marginTop: 24, flex: 1 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex flex-row gap-6">
          {CATEGORIES.map((category, index) => (
            <Pressable onPress={() => setSelectedCategory(index)} key={index}>
              <CategoryHeader
                categoryText={category}
                isFocused={selectedCategory === index}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Text className="font-roboto_bold text-xl text-black my-6">
        Mest sökta produkter
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <StatusBar style="dark" translucent />
      <FlatList
        data={categoryItems}
        ListHeaderComponent={HomeHeader}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          marginHorizontal: 24,
          gap: 16,
        }}
        keyboardShouldPersistTaps="handled"
        onEndReached={() => {
          if (hasMore) {
            getProducts();
          }
        }}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => (
          <ProductCard
            productBrand={item.brandname}
            productName={item.productname}
            productId={item.product_id}
          />
        )}
      />
    </SafeAreaView>
  );
}