const chatViewRef = document.getElementById('chat-view');

function showDialog(id) {
  const dialog = DIALOGS.find(item => item.id === id);

  const messagesMarkup = dialog.messages.map(
    ({ id, author, message, time }) => {
      const isUserAuthor = author.name === USER_NAME;

      const formattedTime = new Date(time).toLocaleString('Ru-ru', {
        hour: 'numeric',
        minute: 'numeric',
      });

      const userMessageMarkup = `
      <div id="${id}" class="message user-message">
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
      <div id="${id}" class="message contact-message">
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
    },
  );

  const formattedMessagesMarkup = formatMarkupString(messagesMarkup, 'div');

  chatViewRef.innerHTML = formattedMessagesMarkup;
  chatViewRef.dataset.openDialog = dialog.id;
  localStorage.setItem('last_dialog', dialog.id);
}
