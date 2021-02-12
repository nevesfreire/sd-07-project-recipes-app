import copy from 'clipboard-copy';

function shareClicker(page, setCopied, id) {
  const url = `http://localhost:3000/${page}/${id}`;
  console.log(url);
  setCopied(true);
  return copy(url);
}

export default shareClicker;
