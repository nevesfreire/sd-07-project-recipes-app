/**
 * Recebe um objeto e uma string.
 * Retorna uma array, com todas as chaves correspondentes à string passada;
 * Filtra, removendo as chaves que contem um valor false (null, undefined, 0, '');
*/
export default function getKeys(obj, str) {
  return Object.entries(obj).filter((key) => (
    key[0].includes(str) && !!key[1]
  ));
}
