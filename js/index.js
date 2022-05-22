// showModalLogin();
// showApp();

let isLoggedIn = true;

if (isLoggedIn) {
  showApp();
} else {
  hideApp();
  showModalLogin();
}

showDialogList(DIALOGS);

const lastDialogId = localStorage.getItem('last_dialog');
if (lastDialogId) {
  showDialog(lastDialogId);
}

// ==========================>
// console.log('window.screen', window.screen);
// console.log('document.URL', document.URL);
// console.log('navigator', navigator);
// console.log('location', location);
// console.log('history', history);
// <=========================


