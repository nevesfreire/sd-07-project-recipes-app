export default function drinksURL(key, parameters) {
  const URLSearch = ({ option, text }) => {
    const newText = text.toLowerCase();
    switch (option) {
    case 'ingrediente':
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${newText}`;
    case 'nome':
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${newText}`;
    case 'primeiraLetra':
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`;
    default:
      return text;
    }
  };

  const endPoint = parameters[key];

  switch (key) {
  case 'search':
    return URLSearch(endPoint);
  case 'category':
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${endPoint}`;
  case 'id':
    return `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${endPoint}`;
  default:
    return 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }
}
