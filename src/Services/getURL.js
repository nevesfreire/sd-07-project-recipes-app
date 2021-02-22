import { drinksURL, foodsURL } from './URL';
/**
 * Recebe um objeto com uma key e um value
 * que corresponde ao tipo de requisição e um endPoint respectivamente.
 * ex.( { id: '52977' } ) ==> retorna um URL que faz a busca pelo ID.
 * O endPoint é 'chicken'.
 * chaves aceitas: id, search(ingrediente, nome, primeiraLetra) e category.
 * Caso seja passado um id NaN, ele retorna URL ramdom.
 * ex. { id: 'asdfasdf' } ==> retorna URL item randomico.
 * Caso seja um objeto vazio( {} ) ele retorna a lista dos itens recomendados.
 * Como já existe uma default prop não é necessário enviar o objeto vazio.
 * Recebe um parametro bool que filtra o tipo do url. Drink ou Food.
 * Drink true, retorna os URLs correspondentes e vice e versa.
 * Ele já possui uma default prop então no caso de drinks não é obrigatorio o uso do
 * segundo parametro.
*/
export default function getURL(obj = {}, drink = true) {
  const [key] = Object.keys(obj);
  const URL = drink
    ? drinksURL(key, obj)
    : foodsURL(key, obj);

  return URL;
}
