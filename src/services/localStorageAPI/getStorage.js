const getStorage = (key) => {
  if (localStorage.getItem(key)) {
    return (JSON.parse(localStorage.getItem(key)));
  }
  return '';
};

export default getStorage;
