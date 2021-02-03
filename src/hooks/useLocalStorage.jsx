import { useState } from 'react';

function get(key) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}

function set(key, newDate) {
  if (!newDate) return;
  if (typeof newDate !== 'string') {
    const value = JSON.stringify(newDate);
    return window.localStorage.setItem(key, value);
  }
  window.localStorage.setItem(key, newDate);
}

export default function useLocalStorage(key) {
  const [value, setValue] = useState(get(key));
  const update = (newDate) => {
    set(key, newDate);
    setValue(newDate);
  };
  return [value, update];
}
