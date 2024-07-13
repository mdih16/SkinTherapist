import React from "react";
import { Video, ResizeMode } from "expo-av";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AuthButton from "../../components/AuthButton";

const App = () => {
  return (
    <View className="flex w-full h-full">
      <Video
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        source={require("../../assets/videos/drop.mp4")}
        shouldPlay
        isLooping
        isMuted
      />

      <View className="absolute bottom-0 w-full min-h-[650px]">
        <Text className="flex top-20 text-center font-bold text-6xl text-[#ffffff]">
          PuriFine
        </Text>
        <Text className="flex top-20 text-center font-medium text-2xl text-[#ffffff]">
          Din hudvårdsresa börjar här.
        </Text>
      </View>
      <SafeAreaView className="absolute bottom-0 w-full min-h-[200px] items-center">
        <ScrollView
          className="mt-12 w-3/4 flex"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View className="w-full flex flex-col mt-50 items-center rounded-[30px] bg-[#594359]">
            <TouchableOpacity>
              <AuthButton label="Skapa ett konto" />
            </TouchableOpacity>
          </View>
          <View className="w-full flex flex-col mt-2 items-center rounded-[30px] bg-[#594359]/op-10">
            <TouchableOpacity>
              <AuthButton label="Logga in" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    height: "100%",
  },
});

export default App;
