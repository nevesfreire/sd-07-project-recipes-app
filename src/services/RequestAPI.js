const RequestData = async (URL) => {
  try {
    const promisse = await fetch(URL);
    const result = promisse.json();
    return result;
  } catch (err) { return 'Erro'; }
};

export default RequestData;
