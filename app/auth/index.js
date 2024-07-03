import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState, useRef } from "react";
import { ResizeMode, Video } from "expo-av";
import InputField from "../../components/InputField";
import AuthButton from "../../components/AuthButton";
import BackButton from "../../components/BackButton";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex h-full w-full">
      <Video
        style={styles.video}
        source={require("../../assets/videos/woman.mp4")}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />
      <View className="absolute top-16 left-6">
        <BackButton />
      </View>
      <SafeAreaView className="absolute bottom-0 w-full min-h-[460px] rounded-t-[30px] bg-white items-center">
        <ScrollView
          className="mt-12 w-3/4 flex"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text className="mb-6 font-bold text-3xl color-[#594359]">
            Välkommen tillbaka
          </Text>
          <View className="flex flex-col w-full gap-4">
            <InputField
              onChangeText={setEmail}
              placeHolder="Telefonnummer eller e-post"
              sensitive={false}
              type="email"
            />
            <InputField
              onChangeText={setPassword}
              placeHolder="Lösenord"
              sensitive={true}
              type="current-password"
            />
          </View>
          <View className="w-full flex flex-row mt-2 px-4 justify-between">
            <Text className="font-medium text-xs text-[#594359]">
              Kom ihåg mig
            </Text>
            <TouchableOpacity>
              <Text className="font-medium text-xs text-[#594359]">
                Glömt lösenord?
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full flex flex-col mt-6 items-center">
            <AuthButton label="Logga in" />
            <View className="flex flex-row gap-4 mt-2">
              <Text className="text-xs font-medium text-[#594359]">
                Har du inget konto?
              </Text>
              <TouchableOpacity>
                <Text className="text-xs font-semibold text-[#4B7980]">
                  Registrera dig
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View className="flex flex-row gap-2 mb-4">
          <TouchableOpacity>
            <Text className="text-[8px] text-[#4B7980]">Användarvillkor</Text>
          </TouchableOpacity>
          <Text className="text-[8px] text-[#4B7980]">|</Text>
          <TouchableOpacity>
            <Text className="text-[8px] text-[#4B7980]">Integritetspolicy</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    height: 280,
  },
});
