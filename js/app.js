function showApp() {
  pageWrapRef.classList.remove('is-hidden');
}

function hideApp() {
  pageWrapRef.classList.add('is-hidden');
}

// ====== Sidebar ======>
const dialogListRef = document.querySelector('.js-dialog-list');
const searchDialogInputRef = document.getElementById('search-dialog');

searchDialogInputRef.addEventListener('input', onSearchDialogInput);

function onSearchDialogInput(e) {
  const searchQuery = e.target.value.trim().toLowerCase();
  const filteredDialogs = getFilteredDialogs(DIALOGS, searchQuery);

  if (searchQuery !== '') {
    showDialogList(filteredDialogs);
  } else {
    showDialogList(DIALOGS);
  }
}

function getFilteredDialogs(data = [], searchQuery = '') {
  const filtered = data.reduce((acc, dialog) => {
    for (const name of dialog.participants) {
      if (name.toLowerCase().includes(searchQuery)) acc.push(dialog);
    }

    return acc;
  }, []);

  return filtered;
}

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
                  alt="${interlocutor} avatar"
                  width="50"
                  height="50"
                  class="contact-avatar-img"
                />
              </picture>
              <div class="dialog-info">
                <p class="contact-name js-contact-name">${interlocutor}</p>
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

  dialogListRef.innerHTML = formattedDialogItemsMarkup;

  const dialogItemsRefs = document.getElementsByClassName('js-dialog-item');

  Array.from(dialogItemsRefs).map(item =>
    item.addEventListener('click', onContactItemClick),
  );
}

function onContactItemClick(e) {
  const selectedDialogId = e.currentTarget.id;
  const openDialog = chatViewRef.dataset.openDialog;

  if (selectedDialogId === openDialog) {
    return;
  }

  showDialog(selectedDialogId);
}

// <====== Sidebar END ======

// ====== Chat ======>
const inputMessageRef = document.getElementById('message');
const sendMessageBtnRef = document.querySelector('.js-send-message-btn');
const closeAppBtnRef = document.querySelector('.js-close-app-btn');

inputMessageRef.addEventListener('input', onInputMessage);
sendMessageBtnRef.addEventListener('click', onMessageBtnClick);
closeAppBtnRef.addEventListener('click', hideApp);

const participantCountRef = document.querySelector('.js-participant-count');

const getParticipantCount = id => {
  const currentDialog = DIALOGS.find(dialog => dialog.id === id);

  return currentDialog.participants.length;
};

const participantCount = getParticipantCount('d1');
const participantCountStr = participantCount.toString();
const last = participantCountStr.charAt(participantCountStr.length - 1);
const participantCountDescr = last >= 5 ? 'участников' : 'участника';

participantCountRef.innerText = `${participantCount} ${participantCountDescr}`;

function onInputMessage(e) {
  e.target.value;

  e.target.value.trim() === ''
    ? (sendMessageBtnRef.disabled = true)
    : (sendMessageBtnRef.disabled = false);
}

function onMessageBtnClick(e) {
  e.preventDefault();

  const oldMessagesCount = chatViewRef.querySelectorAll('.js-message').length;

  if (inputMessageRef.value.trim() === '') {
    return;
  }

  const newMessage = {
    id: Date.now() + 1,
    author: {
      name: USER_NAME,
      avatar: USER_AVATAR,
    },
    message: inputMessageRef.value.trim(),
    time: Date.now(),
  };

  const currentDialogId = chatViewRef.dataset.openDialog;

  const currentDialog = DIALOGS.find(dialog => dialog.id === currentDialogId);

  currentDialog.messages.push(newMessage);

  showDialog(currentDialogId, oldMessagesCount);

  inputMessageRef.value = '';
  sendMessageBtnRef.disabled = true;
}

// <====== Chat END ======
