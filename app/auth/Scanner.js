import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import BackButton from "../../components/BackButton";

const ProductScannerCard = ({ brandName, productName }) => {
  return (
    <TouchableOpacity className="flex flex-row w-[90%] h-full items-center justify-between px-6 bg-white/70 rounded-[20px] ">
      <View className="flex-1 flex flex-col">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-roboto_regular text-xl text-[#6C757D]"
        >
          {brandName}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-roboto_medium text-xl text-nowrap text-black"
        >
          {productName}
        </Text>
      </View>
      <View className="flex items-center justify-center h-full pl-6">
        <BackButton iconName="arrow-forward-outline" />
      </View>
    </TouchableOpacity>
  );
};

export default Scanner = () => {
  const [productData, setProductData] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View className="w-full h-full">
      <CameraView style={styles.camera} facing="back">
        <View className="absolute top-16 left-6">
          <BackButton backgroundColor="bg-white/40" />
        </View>
        {productData && (
          <View className="absolute bottom-8 flex items-center w-full h-24">
            <ProductScannerCard
              brandName="Paulas Choice"
              productName="10% Azelaic Acid Booster"
            />
          </View>
        )}
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
});
