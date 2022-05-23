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
