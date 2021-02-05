export default function getKeys(arr, str) {
  return Object.entries(arr).filter((key) => (
    key[0].includes(str) && !!key[1]
  ));
}
