const pageWrapRef = document.getElementById('page-wrap');
const headerRef = document.getElementById('header');
const mainRef = document.getElementById('main');

const hideAppBtnRef = document.querySelector('.js-hide-app-btn');
const changePageSizeBtnRef = document.querySelector('.js-change-page-size-btn');

hideAppBtnRef.addEventListener('click', toggleAppVisible);
changePageSizeBtnRef.addEventListener('click', toggleFullScreen);

const isFullScreen = () =>
  pageWrapRef.clientWidth === document.body.clientWidth &&
  pageWrapRef.clientHeight === document.body.clientHeight;

const fullscreen = localStorage.getItem('fullscreen');

function makeFullScreen() {
  pageWrapRef.style.width = document.body.clientWidth + 'px';
  pageWrapRef.style.height = document.body.clientHeight + 'px';
  mainRef.style.height =
    document.body.clientHeight - headerRef.offsetHeight + 'px';
  mainRef.style.maxHeight =
    document.body.clientHeight - headerRef.offsetHeight + 'px';

  localStorage.setItem('fullscreen', 'yes');
}

function makeSmallScreen() {
  pageWrapRef.style.width = null;
  pageWrapRef.style.height = null;
  mainRef.style.height = null;
  mainRef.style.maxHeight = null;

  localStorage.setItem('fullscreen', 'no');
}

function toggleFullScreen() {
  if (isFullScreen()) {
    makeSmallScreen();
    return;
  } else {
    makeFullScreen();
  }

  unwrapApp();
}

if (fullscreen === 'yes') {
  makeFullScreen();
}

function toggleAppVisible() {
  if (
    pageWrapRef.classList.contains('is-rollup') &&
    mainRef.classList.contains('is-rollup')
  ) {
    unwrapApp();
  } else {
    rollUpApp();
  }
}

function rollUpApp() {
  pageWrapRef.classList.add('is-rollup');
  mainRef.classList.add('is-rollup');

  makeSmallScreen();
}

function unwrapApp() {
  pageWrapRef.classList.remove('is-rollup');
  mainRef.classList.remove('is-rollup');
}
