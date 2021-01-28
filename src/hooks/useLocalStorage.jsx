import { useState } from 'react';

function get(arrKeys) {
  const ObjDates = arrKeys.reduce((newObj, key) => {
    const value = window.localStorage.getItem(key);
    try {
      return { ...newObj, [key]: JSON.parse(value) };
    } catch (err) {
      return { ...newObj, [key]: value };
    }
  }, {});
  return ObjDates;
}

function set(arrKeys, ObjDates) {
  arrKeys.forEach((key) => {
    if (!ObjDates[key]) return;
    if (typeof ObjDates[key] !== 'string') {
      const value = JSON.stringify(ObjDates[key]);
      return window.localStorage.setItem(key, value);
    }
    window.localStorage.setItem(key, ObjDates[key]);
  });
}

export default function useLocalStorage(arrKeys) {
  const [value, setValue] = useState(get(arrKeys));

  const update = (ObjDates) => {
    set(arrKeys, ObjDates);
    setValue(ObjDates);
  };
  return [value, update];
}
// Value retorna um objeto com as chaves passadas como parametros.
// update recebe um objeto para setar as chaves passadas por parametro.
