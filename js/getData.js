async function getDialogsAll() {
  let response = await fetch(`${BASE_URL}/data/dialogs.json`);

  let data = await response.json();
  return data.dialogs;
}





