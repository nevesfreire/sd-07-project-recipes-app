async function ingredientFilterApi(igredient, param, filter, type) {
  const result = await fetch(`https://www.the${param}db.com/api/json/v1/1/${filter}.php?${type}=${igredient}`);
<<<<<<< HEAD
  console.log(result);
=======
>>>>>>> df7762f2eac2620e5f7d187e765182e19bc41af3
  const response = await result.json();
  return response;
}

export default ingredientFilterApi;
