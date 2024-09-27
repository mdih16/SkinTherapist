import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import AuthButton from "../../components/AuthButton";
import Logo from "../../assets/images/logo.svg";

export default Welcome = () => {
  const router = useRouter();

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <View className="flex w-full h-full bg-white">
      <Image
        source={require("../../assets/images/welcome.png")}
        className="h-[420px] w-full"
        resizeMode="cover"
      />
      <View className="flex-1 flex flex-col w-full h-full px-6">
        <View className="flex flex-col items-center mt-6">
          <Logo />
          <Text className="font-roboto_regular text-2xl text-black -mt-6">
            Din <Text className="text-primary">hudvårdsresa</Text> börjar här.
          </Text>
        </View>
        <View className="flex flex-col gap-3 mt-20">
          <AuthButton
            label={"Skapa ett konto"}
            backgroundColor={"primary"}
            onPress={() => handleNavigation("/auth/Signup")}
          />
          <AuthButton
            label={"Logga in"}
            backgroundColor={"white"}
            textColor={"#000000"}
            border={true}
            onPress={() => handleNavigation("/auth/SignIn")}
          />
        </View>
        <Text className="text-xs text-[#6C757D] text-center mt-6 px-3">
          Genom att fortsätta godkänner du våra{" "}
          <Text className="font-medium text-black">Användarvillkor</Text> och
          bekräftar att du har läst vår{" "}
          <Text className="font-medium text-black">Integritetspolicy.</Text>
        </Text>
      </View>
    </View>
  );
};
