import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RoundButton from "@/RoundButton";
import { scanProduct } from "../../services/supabase/queries";
import Alert from "@/ProductNotificationAlert";
import { ProductData } from "declarations";

type ProductScannerCardProps = {
  brandName: string;
  productName: string;
  product_id: string;
};

const ProductScannerCard = ({
  brandName,
  productName,
  product_id,
}: ProductScannerCardProps) => {
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
          <RoundButton iconName="arrow-forward-outline" />
        </View>
      </TouchableOpacity>
    </Link>
  );
};

type ProductNotFoundProps = {
  showAlert: () => void;
};

const ProductNotFound = ({ showAlert }: ProductNotFoundProps) => {
  return (
    <View className=" flex-1 w-[90%] h-full px-8 bg-white/70 rounded-[20px] ">
      <Text className="font-roboto_bold text-xl pt-1 text-[#6C757D]">
        Produkten är för närvarande inte tillgänglig.
      </Text>
      <TouchableOpacity onPress={showAlert}>
        <Text className="font-roboto_bold text-base text-primary">
          Meddela mig när produkten finns!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Scanner() {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [productEan, setProductEan] = useState<string>("");
  const [permission, requestPermission] = useCameraPermissions();
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  const onBarcodeScanned = async (scanningResult: BarcodeScanningResult) => {
    const ean = scanningResult.data;
    if (ean !== productEan) {
      setProductEan(ean);
      const data = await scanProduct(ean);
      if (data.length > 0) {
        const productData: ProductData = data[0];
        setProductData(productData);
      }
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
        {!productData && productEan && (
          <ProductNotFound showAlert={showAlert} />
        )}
      </View>
      <Alert isVisible={isAlertVisible} onClose={hideAlert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
});
