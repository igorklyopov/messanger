// ====== Sidebar refs ======>
const dialogListRef = document.querySelector('.js-dialog-list');
const searchDialogInputRef = document.getElementById('search-dialog');

// ====== Chat view ref ======>
const chatViewRef = document.getElementById('chat-view');

// ====== Participant count ref ======>
const participantCountRef = document.querySelector('.js-participant-count');

function showApp() {
  getDialogsAll()
    .then(dialogsData => {
      const user = JSON.parse(localStorage.getItem('user'));

      const USER_NAME = user.name;
      const USER_AVATAR = user.avatar || USER_AVATAR_DEFAULT;
      const DIALOGS = dialogsData;
      pageWrapRef.classList.remove('is-hidden');

      // ====== Sidebar ======>

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
            const lastMessage =
              contactMessages[contactMessages.length - 1].message;

            const interlocutor = participants.filter(
              name => name !== USER_NAME,
            )[0];

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

        const dialogItemsRefs =
          document.getElementsByClassName('js-dialog-item');

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
        showParticipantCount(selectedDialogId);
      }

      showDialogList(DIALOGS);
      // <====== Sidebar END ======

      // ====== Chat ======>

      // ====== Show dialog ======>

      function showDialog(id, oldMessagesCount = 0) {
        const dialog = DIALOGS.find(item => item.id === id);

        function makeMessagesMarkup(data) {
          return data.map(({ id, author, message, time }) => {
            const isUserAuthor = author.name === USER_NAME;

            const formattedTime = new Date(time).toLocaleString('Ru-ru', {
              hour: 'numeric',
              minute: 'numeric',
            });

            const userMessageMarkup = `
      <div id="${id}" class="message user-message js-message">
              <div class="message-content">
                <p class="message-text">
                  ${message}
                </p>
                <span class="message-time">${formattedTime}</span>
              </div>
              <picture class="message-author-avatar">
                <!-- <source
                  srcset="
                    ./images/avatars/user-avatar.png    1x,
                    ./images/avatars/user-avatar@2x.png 2x
                  "
                /> -->
                <img
                  src="${author.avatar}"
                  alt="${author.name} avatar"
                  width=""
                  height=""
                  class="message-author-avatar-img"
                />
              </picture>
            </div>
      `;

            const contactMessageMarkup = `
      <div id="${id}" class="message contact-message js-message">
                  <picture class="message-author-avatar">
                    <!-- <source
                      srcset="
                        ./images/avatars/avatar-3.jpg    1x,
                        ./images/avatars/avatar-3@2x.jpg 2x
                      "
                    /> -->
                    <img
                      src="${author.avatar}"
                      alt="${author.name} avatar"
                      width=""
                      height=""
                      class="message-author-avatar-img"
                    />
                  </picture>
                  <div class="message-content">
                    <p class="message-text">
                      ${message}
                    </p>
                    <span class="message-time">${formattedTime}</span>
                  </div>
                </div>
      `;

            if (isUserAuthor) {
              return userMessageMarkup;
            } else {
              return contactMessageMarkup;
            }
          });
        }

        let messagesMarkup = [];
        const newMessagesData = dialog.messages.slice(oldMessagesCount);

        if (oldMessagesCount > 0) {
          messagesMarkup = makeMessagesMarkup(newMessagesData);
        } else {
          messagesMarkup = makeMessagesMarkup(dialog.messages);
        }

        const formattedMessagesMarkup = formatMarkupString(
          messagesMarkup,
          'div',
        );

        if (oldMessagesCount > 0) {
          chatViewRef.insertAdjacentHTML('beforeend', formattedMessagesMarkup);
        } else {
          chatViewRef.innerHTML = formattedMessagesMarkup;
          chatViewRef.scrollTop = chatViewRef.scrollHeight;
          chatViewRef.dataset.openDialog = dialog.id;

          localStorage.setItem('last_dialog', dialog.id);
        }
      }
      // <====== END Show dialog ======

      const inputMessageRef = document.getElementById('message');
      const sendMessageBtnRef = document.querySelector('.js-send-message-btn');
      const closeAppBtnRef = document.querySelector('.js-close-app-btn');

      inputMessageRef.addEventListener('input', onInputMessage);
      sendMessageBtnRef.addEventListener('click', onMessageBtnClick);
      closeAppBtnRef.addEventListener('click', hideApp);

      

      function showParticipantCount(id) {
        const currentDialog = DIALOGS.find(dialog => dialog.id === id);

        const participantCount = currentDialog.participants.length;
        const participantCountStr = participantCount.toString();
        const lastNumber = participantCountStr.charAt(
          participantCountStr.length - 1,
        );
        const participantCountDescr =
          lastNumber >= 5 ? 'участников' : 'участника';

        participantCountRef.innerText = `${participantCount} ${participantCountDescr}`;
      }

      function onInputMessage(e) {
        e.target.value;

        e.target.value.trim() === ''
          ? (sendMessageBtnRef.disabled = true)
          : (sendMessageBtnRef.disabled = false);
      }

      function onMessageBtnClick(e) {
        e.preventDefault();

        const oldMessagesCount =
          chatViewRef.querySelectorAll('.js-message').length;

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

        const currentDialog = DIALOGS.find(
          dialog => dialog.id === currentDialogId,
        );

        currentDialog.messages.push(newMessage);

        showDialog(currentDialogId, oldMessagesCount);

        inputMessageRef.value = '';
        sendMessageBtnRef.disabled = true;
        chatViewRef.scrollTop = chatViewRef.scrollHeight;
      }

      const lastDialogId = localStorage.getItem('last_dialog');
      if (lastDialogId) {
        showDialog(lastDialogId);
        showParticipantCount(lastDialogId);
      }
      // <====== Chat END ======
    })
    .catch(err => console.log(err));
}

function hideApp() {
  pageWrapRef.classList.add('is-hidden');
  
  dialogListRef.innerHTML = '';
  chatViewRef.innerHTML = '';
  participantCountRef.innerHTML = '';

  logOut();
}

const isLogged = isLoggedIn();
