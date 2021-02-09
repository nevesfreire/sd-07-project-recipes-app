const copyLink = (id, type) => {
  const granted = 'granted';
  const prompt = 'prompt';
  navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
    if (result.state === granted || result.state === prompt) {
      navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    }
  });
};

export default copyLink;
// solução encontrada no stackOverFlow.
