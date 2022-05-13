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
//   return await fetch('../data/user.json').then(
//     res => res.json(),
//   );
// }

// const userData = getData();
//  console.log(userData);
