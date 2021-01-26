export function setItem(itemName, value) {
  localStorage.getItem(itemName, value);
}
export function getItem(itemName) {
  return localStorage.getItem(itemName);
}
