const BASE_URL = location.origin;

async function getDialogsAll() {
  let response = await fetch(`${BASE_URL}/data/dialogs.json`);

  let data = await response.json();

  return data.dialogs;
}

async function getUser({ name, password }) {
  let response = await fetch(`${BASE_URL}/data/users.json`);

  let data = await response.json();

  const currentUser = data.users.find(
    user => user.name === name && user.password === password,
  );

  if (currentUser) {
    delete currentUser.password;

    return currentUser;
  }
}
