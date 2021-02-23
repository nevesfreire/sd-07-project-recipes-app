export default function getListFromLocal(setFinishedList) {
  const list = JSON.parse(localStorage.getItem('doneRecipes'));
  if (list) setFinishedList(list);
}
