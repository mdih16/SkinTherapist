import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { searchProducts } from "../../services/supabase/queries";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import { router } from "expo-router";
import React from "react";
import ProductCard from "../../components/ProductCard";

export default Search = ({ placeHolder }) => {
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [])
  );

  useEffect(() => {
    const getSearchResults = async () => {
      const processedSearchText = searchText.split(" ").join("+");
      const searchData = await searchProducts(processedSearchText);
      setSearchResults(searchData);
      setSearching(false);
    };

    if (searchText === "") {
      setSearchResults([]);
      setSearching(false);
    }

    setSearching(true);
    const timeout = setTimeout(getSearchResults, 500);
    return () => clearTimeout(timeout);
  }, [searchText]);

  return (
    <SafeAreaView style={{ backgroundColor: "#F2EEF2" }}>
      <View className="w-full h-full bg-white">
        <View className="flex flex-row bg-[#F2EEF2]">
          <Pressable
            onPress={() => router.back()}
            className="flex items-center justify-center h-16 w-16"
          >
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </Pressable>
          <TextInput
            placeholder={placeHolder}
            placeholderTextColor={"#6C757D"}
            importantForAutofill="no"
            autoCorrect={false}
            spellCheck={false}
            autoComplete={"off"}
            keyboardType="default"
            value={searchText}
            onChangeText={setSearchText}
            className={`${
              searchText === ""
                ? "font-roboto_light_italic"
                : "font-roboto_regular"
            } flex-1 h-16 text-base text-black bg-[#F2EEF2]`}
            ref={inputRef}
          />
          <Pressable
            onPress={() => setSearchText("")}
            className="flex items-center justify-center h-16 w-16 bg-[#F2EEF2]"
          >
            <Ionicons
              name={searchText ? "close-circle-outline" : "search-outline"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        {searchText && !searching && searchResults.length === 0 && (
          <View className="w-full h-full px-6 pt-6">
            <Text className="font-roboto_bold text-xl text-black mb-4">
              0 resultat för {' "' + searchText + '"'}
            </Text>
            <Text className="font-roboto_regular text-base text-[#6C757D] mb-2">
              Kontrollera stavning eller testa att söka efter ett annat ord.
              Finns inte den produkt du söker efter?
            </Text>
            <TouchableOpacity>
              <Text className="font-roboto_bold text-base text-[#594359]">
                Klicka här så skickar vi ett e-mail till dig när den är
                tillgänglig.
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {searching && (
          <View className="flex w-full items-center justify-center mt-12">
            <ActivityIndicator size="large" color="#000000" />
          </View>
        )}
        <FlatList
          data={searchResults}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginTop: 16,
            marginHorizontal: 24,
          }}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item) => item.product_id}
          renderItem={({ item }) => (
            <ProductCard
              productBrand={item.brandname}
              productName={item.productname}
              productId={item.product_id}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
