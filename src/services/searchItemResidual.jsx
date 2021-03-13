async function ingredientFilterApi(igredient, param, filter, type) {
  const result = await fetch(`https://www.the${param}db.com/api/json/v1/1/${filter}.php?${type}=${igredient}`);
  const response = await result.json();
  return response;
}

export default ingredientFilterApi;
