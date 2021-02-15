export default function foodsURL(key, parameters) {
  const URLSearch = ({ option, text }) => {
    const newText = text.toLowerCase();
    switch (option) {
    case 'ingrediente':
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${newText}`;
    case 'nome':
      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${newText}`;
    case 'primeiraLetra':
      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`;
    default:
      return text;
    }
  };
  const URLArea = (area) => (
    area
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s='
  );

  const endPoint = parameters[key];

  switch (key) {
  case 'search':
    return URLSearch(endPoint);
  case 'category':
    return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${endPoint}`;
  case 'id':
    return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${endPoint}`;
  case 'area':
    return URLArea(endPoint);
  default:
    return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }
}
