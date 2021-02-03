export const getApi = (url) => fetch(url)
  .then((response) => response.json());
export default getApi;
