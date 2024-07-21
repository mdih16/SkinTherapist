import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import SearchBar from "../../components/SearchBar";
import CategoryHeader from "../../components/CategoryHeader";
import ProductCard from "../../components/ProductCard";

const CATEGORIES = ["Allt", "Ansikte"];

const SearchView = ({ placeHolder, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);

  // Focus the texinput on mount, uses blur followed by setTimeout to fix bug
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();

      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, []);

  return (
    <View className="w-full h-full">
      <View className="flex flex-row">
        <Pressable
          onPress={() => onClose()}
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
          keyboardType="def`ult"
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
      <FlatList
        data={searchResults}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginTop: 16,
          paddingHorizontal: 24,
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

export default Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categoryItems, setCategoryItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const getBackgroundColor = () => {
    return modalVisible ? "#F2EEF2" : "#FFFFFF";
  };

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
      <View className="w-full h-full px-6 bg-white">
        <View className="flex flex-row items-center justify-between my-6">
          <Text className="font-roboto_regular text-xl text-[#6C757D]">
            Välkommen tillbaka, {"\n"}
            <Text className="font-roboto_bold text-3xl text-black">Emma</Text>
          </Text>
          <Image
            className="w-16 h-16 rounded-full "
            source={require("../../assets/images/profile.png")}
          />
        </View>
        <SearchBar
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          disabled={true}
          placeHolder={"Sök bland produkter och ingredienser"}
        />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row gap-6">
            {CATEGORIES.map((category, index) => {
              return (
                <Pressable
                  onPress={() => setSelectedCategory(index)}
                  key={index}
                >
                  <CategoryHeader
                    categoryText={category}
                    isFocused={selectedCategory === index}
                  />
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
        <Text className="font-roboto_bold text-xl text-black my-6">
          Mest sökta produkter
        </Text>
        <FlatList
          data={categoryItems}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
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
    </SafeAreaView>
  );
};
