import supabase from "./supabaseClient";

// Format the data to include the brandname at the top level
const formatProductData = (productData) => {
  return productData.map((product) => ({
    productname: product.productname,
    product_id: product.product_id,
    brandname: product.brand.brandname,
  }));
};

export const fetchIngredientsByProductId = async (productId) => {
  const { data, error } = await supabase
    .from("productingredient")
    .select("ingredient (ingredientname, status)")
    .eq("product_id", productId)
    .order("order");

  if (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }

  return data.map((item) => ({
    ingredientname: item.ingredient.ingredientname,
    status: item.ingredient.status,
  }));
};

export const fetchProducts = async (pageSize = 7, lastProductId = null) => {
  let query = supabase
    .from("product")
    .select("productname, product_id, brand:brand_id(brandname)")
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

export const searchProducts = async (searchText) => {
  const { data: searchResults, error: searchError } = await supabase
    .from("product")
    .select("productname, product_id, brand:brand_id(brandname)")
    .textSearch("productname", searchText)
    .limit(10);

  if (searchError) {
    console.error("Error performing search:", searchError);
    return [];
  }

  return formatProductData(searchResults);
};

export const scanProduct = async (ean) => {
  const { data: productData, error: scanError } = await supabase
    .from("product")
    .select("productname, product_id, brand:brand_id(brandname)")
    .eq("ean", ean);

  if (scanError) {
    console.error("Error fetching product: ", scanError);
    return [];
  }

  return formatProductData(productData);
};
