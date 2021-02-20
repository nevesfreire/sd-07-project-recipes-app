async function nameFilterApi(paramName, param) {
  const response = await fetch(`https://www.the${param}db.com/api/json/v1/1/search.php?s=${paramName}`);
  const result = await response.json();
  return result;
}

export default nameFilterApi;

// https://www.the{cocktail}db.com/api/json/v1/1/search.php?s={nome}
// https://www.the{meal}db.com/api/json/v1/1/search.php?s={nome}
