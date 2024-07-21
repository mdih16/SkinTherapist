import supabase from "./supabaseClient";

export async function fetchIngredientsByProductId(productId) {
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
}
