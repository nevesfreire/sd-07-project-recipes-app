async function ingredientFilterApi(ingredient, param) {
  const result = await fetch(`https://www.the${param}db.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const response = await result.json();
  return response;
}

export default ingredientFilterApi;

// `https://www.the${meal}db.com/api/json/v1/1/filter.php?i=${ingrediente}`
// `https://www.the$cocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`
