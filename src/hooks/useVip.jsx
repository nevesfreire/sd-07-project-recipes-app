import { useState } from 'react';

function vip(str = '') {
  const names = ['thay', 'thayrone', 'hamaji', 'wolf', 'murillo'];
  const valid = names.includes(str);
  return valid;
}

export default function useVip(valid = false) {
  const [user, setUser] = useState(false);

  valid = vip(user);

  return [valid, setUser];
}
