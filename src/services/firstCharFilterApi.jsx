async function firstCharFilterApi(firstChar, param) {
  const response = await fetch(`https://www.the${param}db.com/api/json/v1/1/search.php?f=${firstChar}`);
  const result = await response.json();
  return result;
}

export default firstCharFilterApi;
