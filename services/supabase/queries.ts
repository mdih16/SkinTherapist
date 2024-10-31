import supabase from "./supabaseClient";

export const fetchIngredientsByProductId = async (productId: string) => {
  const { data, error } = await supabase
    .from("productingredient")
    .select("ingredient!inner (ingredient_name, description, status)")
    .eq("product_id", productId)
    .order("order");

  if (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }

  return data.map((item) => ({
    ingredientname: item.ingredient.ingredient_name,
    description: item.ingredient.description,
    status: item.ingredient.status,
  }));
};

// Format the data to include the brandname at the top level

interface ProductData {
  product_name: string;
  product_id: number;
  brand: {
    brand_name: string;
  };
}

const formatProductData = (productData: ProductData[]) => {
  return productData.map((product) => ({
    productname: product.product_name,
    product_id: String(product.product_id),
    brandname: product.brand.brand_name,
  }));
};

export const fetchProducts = async (pageSize = 7, lastProductId = null) => {
  let query = supabase
    .from("product")
    .select("product_name, product_id, brand!inner(brand_name)")
    .order("product_id", { ascending: true })
    .limit(pageSize);

  if (lastProductId) {
    query = query.gt("product_id", lastProductId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return formatProductData(data);
};

export const searchProducts = async (searchText: string) => {
  const { data: searchResults, error: searchError } = await supabase
    .from("product")
    .select("product_name, product_id, brand!inner(brand_name)")
    .textSearch("product_name", searchText)
    .limit(10);

  if (searchError) {
    console.error("Error performing search:", searchError);
    return [];
  }

  return formatProductData(searchResults);
};

export const scanProduct = async (ean: string) => {
  const { data: productData, error: scanError } = await supabase
    .from("product")
    .select("product_name, product_id, brand!inner(brand_name)")
    .eq("ean", ean)
    .limit(1);

  if (scanError) {
    console.error("Error fetching product: ", scanError);
    return [];
  }

  return formatProductData(productData);
};
