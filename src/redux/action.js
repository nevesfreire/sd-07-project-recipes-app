function setLocal(local) {
  return ({
    type: 'SETLOCAL',
    value: local,
  });
}

function setReceitas(local) {
  return ({
    type: 'SETRECEITAS',
    value: local,
  });
}

export { setLocal, setReceitas };
