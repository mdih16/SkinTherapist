import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";
import { scanProduct } from "../../services/supabase/queries";

const ProductScannerCard = ({ brandName, productName, product_id }) => {
  return (
    <Link
      href={{
        pathname: String(product_id),
        params: {
          brandname: brandName,
          productname: productName,
        },
      }}
      asChild
    >
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
    </Link>
  );
};

const ProductNotFound = () => {
  return (
    <TouchableOpacity className="flex flex-row w-[90%] h-full items-center justify-between px-6 bg-white/70 rounded-[20px] ">
      <View className="flex-1 flex flex-col">
        <Text className="font-roboto_regular text-xl text-[#6C757D]">
          Produkten är för närvarande inte tillgänglig.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Scanner = () => {
  const [productData, setProductData] = useState(null);
  const [productEan, setProductEan] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();

  const onBarcodeScanned = async (scanningResult) => {
    const ean = scanningResult.data;
    if (ean !== productEan) {
      setProductEan(ean);
      const data = await scanProduct(ean);
      setProductData(...data);
    }
  };

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
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8"],
        }}
        onBarcodeScanned={onBarcodeScanned}
      />
      {/*
      <MaterialCommunityIcons
        name="scan-helper"
        size={256}
        color="white"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      /> */}
      <View className="absolute bottom-8 flex items-center w-full h-24">
        {productData && (
          <ProductScannerCard
            brandName={productData.brandname}
            productName={productData.productname}
            product_id={productData.product_id}
          />
        )}
        {!productData && productEan && <ProductNotFound />}
      </View>
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
