const chatViewRef = document.getElementById('chat-view');

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

  const formattedMessagesMarkup = formatMarkupString(messagesMarkup, 'div');

  if (oldMessagesCount > 0) {
    chatViewRef.insertAdjacentHTML('beforeend', formattedMessagesMarkup);
  } else {
    chatViewRef.innerHTML = formattedMessagesMarkup;
    chatViewRef.scrollTop = chatViewRef.scrollHeight;
    chatViewRef.dataset.openDialog = dialog.id;

    localStorage.setItem('last_dialog', dialog.id);
  }
}
