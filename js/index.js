// showModalLogin();
// showApp();
// (() => {

// })();

let isLoggedIn = true;

if (isLoggedIn) {
  showApp();
} else {
  hideApp();
  showModalLogin();
}

// ===========================

// async function getData() {
//   return await fetch(`${BASE_URL}/data/dialogs.json`).then(res => res.json());
// }

// const userData = getData();
// console.log(userData);
