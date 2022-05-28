const bodyRef = document.getElementById('body');

function showModalLogin() {
  const modalLoginMarkup = `
  <div id="modal-login" class="modal-login">
        <button
          type="button"
          aria-labelledby="close"
          id="modal-login-close-btn"
          class="button close-button"
        >
          <svg
            height="512px"
            style="enable-background: new 0 0 512 512"
            version="1.1"
            viewBox="0 0 512 512"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="icon-cross"
          >
            <path
              d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"
            />
          </svg>
        </button>
        <section class="login">
          <div class="logo">
            <picture>
              <source
                srcset="./images/logo/logo.png 1x, ./images/logo/logo@2x.png 2x"
              />
              <img
                src="./images/logo/logo.png"
                alt="logo"
                width="85"
                height="66"
                class="logo-img"
              />
            </picture>
          </div>
          <h2 class="login-title">Авторизация</h2>
          <p class="login-description">
            Введите пожалуйста своё фио и пароль для дальнейшей авторизации
          </p>
          <form id="login-form" class="login-form">
            <label class="login-input-label">
              <span class="visually-hidden">Введите своё имя</span>
              <input
                type="text"
                name="userNameInput"
                id="login-input-name"
                placeholder="Введите своё имя"
                required
                maxlength="200"
                autofocus
                class="login-input"
              />
            </label>
            <label class="login-input-label">
              <span class="visually-hidden">Введите пароль</span>
              <input
                type="password"
                name="passwordInput"
                id="login-input-password"
                placeholder="Введите пароль"
                required
                maxlength="8"
                class="login-input"
              />
            </label>
            <button type="submit" name="loginBtn" class="button basic-btn enter-button">Войти</button>
          </form>
        </section>
      </div>
`;

  bodyRef.insertAdjacentHTML('afterbegin', modalLoginMarkup);

  const modalLoginRef = document.getElementById('modal-login');
  const modalLoginCloseBtnRef = document.getElementById(
    'modal-login-close-btn',
  );
  const loginFormRef = document.getElementById('login-form');

  const { userNameInput, passwordInput, loginBtn } = loginFormRef;

  modalLoginCloseBtnRef.addEventListener('click', closeLoginModal);
  loginBtn.addEventListener('click', logIn);

  function closeLoginModal() {
    modalLoginRef.remove();

    modalLoginCloseBtnRef.removeEventListener('click', closeLoginModal);
  }

  function logIn(e) {
    e.preventDefault();

    const userName = userNameInput.value.trim();
    const userPassword = passwordInput.value.trim();

    if (userName === '' || userPassword === '') {
      return;
    }

    const userCredentials = {
      name: userName,
      password: userPassword,
    };

    // for test
    localStorage.setItem('user', JSON.stringify(userCredentials));

    if (isLoggedIn()) {
      closeLoginModal();
      showApp();
    }
  }
}

function logOut() {
  localStorage.setItem('user', '');
  showModalLogin();
}
