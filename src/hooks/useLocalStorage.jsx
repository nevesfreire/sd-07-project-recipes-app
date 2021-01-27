import { useState } from 'react';

function get(key) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}

function set(key, value) {
  if (typeof value !== 'string') value = JSON.stringify(value);
  window.localStorage.setItem(key, value);
}

export default function useLocalStorage(key) {
  const [value, setValue] = useState(get(key));
  const update = (newValue) => {
    set(key, newValue);
    setValue(setValue);
  };
  return [value, update];
}
