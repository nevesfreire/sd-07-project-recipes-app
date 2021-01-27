function setLocal(local) {
  return ({
    type: 'SETLOCAL',
    value: local,
  });
}

export default setLocal;
