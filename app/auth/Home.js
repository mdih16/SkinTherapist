import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { fetchProducts, searchProducts } from "../../services/supabase/queries";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";
import CategoryHeader from "../../components/CategoryHeader";
import ProductCard from "../../components/ProductCard";
import Alert from "../../components/Alert";

const CATEGORIES = ["Allt", "Ansikte"];

const SearchView = ({ placeHolder, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  // Focus the text input on mount, uses blur followed by setTimeout to fix bug
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();

      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, []);

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
    <View className="w-full h-full">
      <View className="flex flex-row">
        <Pressable
          onPress={onClose}
          className="flex items-center justify-center h-16 w-16 bg-[#F2EEF2]"
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
          } flex-1 h-16 text-base text-black bg-[#F2EEF2] `}
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
      <View className="flex-1">
        {searchText && !searching && searchResults.length === 0 && (
          <View className="w-full h-full px-6 pt-6">
            <Text className="font-roboto_bold text-xl text-black mb-4">
              0 resultat för {' "' + searchText + '"'}
            </Text>
            <Text className="font-roboto_regular text-base text-[#6C757D] mb-2">
              Kontrollera stavning eller testa att söka efter ett annat ord.
              Finns inte den produkt du söker efter?
            </Text>
            <TouchableOpacity onPress={showAlert}>
              <Text className="font-roboto_bold text-base text-[#594359]">
                Klicka här så meddelar vi dig när den är tillgänglig.
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Alert isVisible={isAlertVisible} onClose={hideAlert} />
      </View>

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
          <Link
            href={{
              pathname: "/auth/" + item.product_id,
              params: {
                brandname: item.brandname,
                productname: item.productname,
              },
            }}
          >
            <ProductCard
              productBrand={item.brandname}
              productName={item.productname}
            />
          </Link>
        )}
      />
    </View>
  );
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // FlatList state
  const [categoryItems, setCategoryItems] = useState([]);
  const [lastProductId, setLastProductId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 8;

  const getBackgroundColor = () => {
    return modalVisible ? "#F2EEF2" : "#FFFFFF";
  };

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
    <View>
      <View className="flex flex-row items-center justify-between my-6">
        <Text className="font-roboto_regular text-xl text-[#6C757D]">
          Välkommen tillbaka, {"\n"}
          <Text className="font-roboto_bold text-3xl text-black">Emma</Text>
        </Text>
        <Image
          className="w-16 h-16 rounded-full"
          source={require("../../assets/images/profile.png")}
        />
      </View>
      <SearchBar
        onPress={() => {
          setModalVisible(true);
        }}
        disabled={true}
        placeHolder={"Sök bland produkter och ingredienser"}
      />
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
    <SafeAreaView style={{ flex: 1, backgroundColor: getBackgroundColor() }}>
      <StatusBar style="dark" translucent />
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={false}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SearchView
          onClose={() => setModalVisible(!modalVisible)}
          placeHolder={"Sök bland produkter och ingredienser"}
        />
      </Modal>
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
          <Link
            href={{
              pathname: "/auth/" + item.product_id,
              params: {
                brandname: item.brandname,
                productname: item.productname,
              },
            }}
          >
            <ProductCard
              productBrand={item.brandname}
              productName={item.productname}
            />
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
