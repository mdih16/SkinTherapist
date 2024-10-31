/// <reference types="nativewind/types" />

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

export interface ProductData {
  productname: string;
  product_id: string;
  brandname: string;
}
