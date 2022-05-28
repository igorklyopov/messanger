// for test ===>

function isLoggedIn() {
  return localStorage.getItem('user') !== '';
}

// <=== ===

if (isLoggedIn()) {
  showApp();
} else {
  hideApp();
}

showDialogList(DIALOGS);

const lastDialogId = localStorage.getItem('last_dialog');
if (lastDialogId) {
  showDialog(lastDialogId);
  showParticipantCount(lastDialogId);
}
