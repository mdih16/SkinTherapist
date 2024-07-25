import { View, Text, Image } from "react-native";
import AuthButton from "../../components/AuthButton";

export default welcome = () => {
  return (
    <View className="flex w-full h-full">
      <Image
        source={require("../../assets/images/welcome.png")}
        className="h-96 w-full"
        resizeMode="cover"
      />
      <View className="flex-1 flex flex-col w-full h-full px-6">
        <View className="flex flex-col items-center mt-6">
          <Text className="font-roboto_bold text-center text-6xl text-black pt-12">
            Puri<Text className="font-sofia">F</Text>ine
            {"\n"}
            <Text className="font-roboto_regular text-2xl text-black">
              Din <Text className="text-[#594359]">hudvårdsresa</Text> börjar
              här.
            </Text>
          </Text>
        </View>
        <View className="flex flex-col gap-2 mt-12">
          <AuthButton
            label={"Logga in"}
            backgroundColor={"#ffffff"}
            textColor={"#000000"}
            border={true}
          />
          <AuthButton label={"Skapa ett konto"} backgroundColor={"#594359"} />
        </View>
        <Text className="text-2xs text-[#6C757D] text-center mt-4 px-3">
          Genom att fortsätta godkänner du våra{" "}
          <Text className="font-medium text-black">Användarvillkor</Text> och
          bekräftar att du har läst vår{" "}
          <Text className="font-medium text-black">Integritetspolicy.</Text>
        </Text>
      </View>
    </View>
  );
};
