// ====== User menu ======>

const openUserMenuBtnRef = document.querySelector('.js-open-user-menu-btn');
const closeUserMenuBtnRef = document.querySelector('.js-close-user-menu-btn');
const userMenuRef = document.querySelector('.js-user-menu');
const changeAvatarBtnRef = document.querySelector('.js-change-avatar-btn');

openUserMenuBtnRef.addEventListener('click', openUserMenu);
closeUserMenuBtnRef.addEventListener('click', closeUserMenu);
changeAvatarBtnRef.addEventListener('click', openModal);

function openUserMenu() {
  userMenuRef.classList.remove('is-hidden');
}

function closeUserMenu() {
  userMenuRef.classList.add('is-hidden');
}

// <====== Change user avatar ======

const canvasAvatarRef = document.getElementById('canvas-avatar');
const addImgFormRef = document.getElementById('add-img-form');
const saveImgBtnRef = addImgFormRef.querySelector('.js-load-img-btn');

const { saveButton, cancelButton, loadAvatar } = addImgFormRef;

saveButton.addEventListener('click', saveAvatarImg);
cancelButton.addEventListener('click', resetAddAvatar);

function toggleLoadImgBtn() {
  saveImgBtnRef.classList.toggle('is-hidden');
}

function toggleCanvasAvatar() {
  canvasAvatarRef.classList.toggle('is-hidden');
}

function resetAddAvatar() {
  toggleCanvasAvatar();
  toggleLoadImgBtn();
  toggleAddAvatarButtons();
}

function toggleAddAvatarButtons() {
  saveButton.classList.toggle('is-hidden');
  cancelButton.classList.toggle('is-hidden');
}

async function editImg() {
  const context = canvasAvatarRef.getContext('2d');
  const originalImage = await loadImg(USER_AVATAR_DEFAULT);
  const mouse = getMouse(canvasAvatarRef);
  const imageParams = {
    offsetX: 0,
    offsetY: 0,
    scale: 1,
  };

  let image = originalImage;

  toggleCanvasAvatar();
  toggleAddAvatarButtons();

  canvasAvatarRef.width = 280;
  canvasAvatarRef.height = 280;

  loadAvatar.addEventListener('change', addImg);

  update();

  function update() {
    requestAnimationFrame(update);

    clearCanvas();

    if (mouse.leftKeyDown) {
      imageParams.offsetX += mouse.dx;
      imageParams.offsetY += mouse.dy;
    }

    if (mouse.wheel) {
      imageParams.scale -= mouse.wheel / 10000;
    }

    context.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      imageParams.offsetX,
      imageParams.offsetY,
      image.width * imageParams.scale,
      image.height * imageParams.scale,
    );

    mouse.update();
  }

  function clearCanvas() {
    canvasAvatarRef.width = canvasAvatarRef.width;
  }

  function addImg(e) {
    const [file] = e.target.files;
    const fileReader = new FileReader();

    if (file.size > 300 * 1024) {
      console.log('very big!');
    } else {
      toggleLoadImgBtn();
      toggleCanvasAvatar();
      toggleAddAvatarButtons();

      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const newImage = new Image();

        newImage.onload = () => {
          originalImage = image = newImage;
        };
        image.src = fileReader.result;
      };
    }
  }
}

const isCanvasHidden = canvasAvatarRef.classList.contains('is-hidden');

if (!isCanvasHidden) editImg();

//-----------------

function saveAvatarImg(e) {
  e.preventDefault();

  const linkAvatarEl = document.createElement('a');
  linkAvatarEl.href = canvasAvatarRef.toDataURL('image/jpg');
  linkAvatarEl.setAttribute('download', 'user-avatar.jpg');
  linkAvatarEl.click();
}

function loadImg(src) {
  const promise = new Promise((resolve, reject) => {
    try {
      const image = new Image();

      image.onload = () => resolve(image);
      image.src = src;
    } catch (error) {
      return reject(error);
    }
  });

  return promise;
}

function getMouse(element) {
  const mouse = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    leftKeyDown: false,
    wheel: 0,
  };
  mouse.update = () => {
    mouse.dx = 0;
    mouse.dy = 0;
    mouse.wheel = 0;
  };

  element.addEventListener('mousemove', e => {
    const rect = element.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouse.dx = x - mouse.x;
    mouse.dy = y - mouse.y;

    mouse.x = x;
    mouse.y = y;
  });

  element.addEventListener('mousedown', e => {
    if (e.button === 0) {
      mouse.leftKeyDown = true;
    }
  });

  element.addEventListener('mouseup', e => {
    if (e.button === 0) {
      mouse.leftKeyDown = false;
    }
  });

  element.addEventListener('mousewheel', e => {
    mouse.wheel = e.deltaY;

    e.stopPropagation();
  });

  return mouse;
}
// <====== Change user avatar ======
