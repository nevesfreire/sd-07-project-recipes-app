import { useState } from 'react';

function vip(str) {
  const names = ['thay', 'thayrone', 'hamaji', 'wolf', 'murillo'];
  return names.includes(str.toLowerCase());
}

export default function useVip(valid = false) {
  const [user, setUser] = useState(false);

  valid = vip(user);

  return [valid, setUser];
}
