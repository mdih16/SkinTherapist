import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import { signIn } from "../../services/supabase/auth";
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
        <BackButton onPress={() => router.back()} />
      </View>
      <View className="absolute bottom-0 w-full h-[55%] bg-white items-center rounded-t-[40px]">
        <ScrollView
          className="mt-12 w-full px-8 flex"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text className="mb-6 font-roboto_bold text-4xl">
            Välkommen tillbaka
          </Text>
          <View className="flex flex-col w-full gap-4">
            <InputField
              onChangeText={setEmail}
              placeHolder="E-post"
              sensitive={false}
              cornerRadius={30}
              type="email"
            />

            <InputField
              onChangeText={setPassword}
              placeHolder="Lösenord"
              sensitive={true}
              cornerRadius={30}
              type="current-password"
            />
          </View>
          <TouchableOpacity
            onPress={() => router.push("/auth/ForgotPassword")}
            className="w-full mt-2 mr-6"
          >
            <Text className="font-roboto_medium text-right text-xs text-black">
              Glömt lösenord?
            </Text>
          </TouchableOpacity>
          <View className="flex flex-col w-full items-center mt-14">
            <AuthButton
              label="Logga in"
              backgroundColor="primary"
              onPress={async () => {
                try {
                  await signIn(email, password);
                } catch (e) {
                  Alert.alert(e.message);
                }
              }}
            />
            <View className="flex flex-row gap-1 mt-2">
              <Text className="text-xs font-roboto_medium text-black">
                Har du inget konto?
              </Text>
              <TouchableOpacity onPress={() => router.push("/auth/Signup")}>
                <Text className="text-xs font-roboto_bold text-[#0056B3]">
                  Registrera dig
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    height: "50%",
  },
});
