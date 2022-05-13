const inputMessageRef = document.getElementById('message');
const sendMessageBtnRef = document.querySelector('.js-send-message-btn');
const closeAppBtnRef = document.querySelector('.js-close-app-btn');

inputMessageRef.addEventListener('input', onInputMessage);
sendMessageBtnRef.addEventListener('click', onMessageBtnClick);
closeAppBtnRef.addEventListener('click', hideApp);

const participantCountRef = document.querySelector('.js-participant-count');

function showApp() {
  pageWrapRef.classList.remove('is-hidden');
}

function hideApp() {
  pageWrapRef.classList.add('is-hidden');
}

// ====================
const getParticipantCount = id => {
  const currentDialog = DIALOGS.find(dialog => dialog.id === id);

  return currentDialog.participants.length;
};

const participantCount = getParticipantCount('d1');
const participantCountStr = participantCount.toString();
const last = participantCountStr.charAt(participantCountStr.length - 1);
const participantCountDescr = last >= 5 ? 'участников' : 'участника';

participantCountRef.innerText = `${participantCount} ${participantCountDescr}`;

// ====================
function onInputMessage(e) {
  e.target.value;
  // console.log(e.target.value);

  e.target.value.trim() === ''
    ? (sendMessageBtnRef.disabled = true)
    : (sendMessageBtnRef.disabled = false);
}

function onMessageBtnClick(e) {
  e.preventDefault();

  if (inputMessageRef.value.trim() === '') {
    return;
  }

  const newMessage = {
    id: Date.now() + 1,
    author: USER_NAME,
    message: inputMessageRef.value.trim(),
    time: Date.now(),
  };

  const currentDialogId = 'd1';

  const currentDialog = DIALOG.find(dialog => dialog.id === currentDialogId);
  console.log(currentDialog);
  currentDialog.messages.push(newMessage);

  inputMessageRef.value = '';
  sendMessageBtnRef.disabled = true;

  console.log(newMessage);
}

// ====================

const dialogListRef = document.querySelector('.js-dialog-list');

function showDialogList(data) {
  const dialogItemsMarkup = data.map(
    ({ id, image, participants, messages }) => {
      const contactMessages = messages.filter(
        message => message.author.name !== USER_NAME,
      );
      const lastMessage = contactMessages[contactMessages.length - 1].message;

      const interlocutor = participants.filter(name => name !== USER_NAME)[0];

      return `
    <li id="${id}" class="dialog-item js-dialog-item" >
              <picture class="contact-avatar">
                <!-- <source
                  srcset="
                    ./images/avatars/avatar-3.jpg    1x,
                    ./images/avatars/avatar-3@2x.jpg 2x
                  "
                /> -->
                <img
                  src="${image}"
                  alt="${interlocutor}"
                  width=""
                  height=""
                  class="contact-avatar-img"
                />
              </picture>
              <div class="dialog-info">
                <p class="contact-name">${interlocutor}</p>
                <p class="contact-last-message">${lastMessage}</p>
              </div>
            </li>
    `;
    },
  );

  const formattedDialogItemsMarkup = formatMarkupString(
    dialogItemsMarkup,
    'li',
  );

  dialogListRef.insertAdjacentHTML('beforeend', formattedDialogItemsMarkup);
}

showDialogList(DIALOGS);

const dialogItemsRefs = document.getElementsByClassName('js-dialog-item');

Array.from(dialogItemsRefs).map(item =>
  item.addEventListener('click', onContactItemClick),
);

function onContactItemClick(e) {
  const selectedDialogId = e.currentTarget.id;
  const openDialog = chatViewRef.dataset.openDialog;

  if (selectedDialogId === openDialog) {
    return;
  }

  showDialog(selectedDialogId);
}

// ====================
const lastDialogId = localStorage.getItem('last_dialog');
if (lastDialogId) {
  showDialog(lastDialogId);
}
