import supabase from "./supabaseClient";

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

  // Format the data to include the brandname at the top level
  const formattedData = data.map((product) => ({
    productname: product.productname,
    product_id: product.product_id,
    brandname: product.brand.brandname,
  }));

  return formattedData;
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

  // Format the data to include the brandname at the top level
  const formattedData = searchResults.map((product) => ({
    productname: product.productname,
    product_id: product.product_id,
    brandname: product.brand.brandname,
  }));

  return formattedData;
};
