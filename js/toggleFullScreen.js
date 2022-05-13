const pageWrapRef = document.getElementById('page-wrap');
const headerRef = document.getElementById('header');
const mainRef = document.getElementById('main');

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
}

if (fullscreen === 'yes') {
  makeFullScreen();
}

const changePageSizeBtnRef = document.querySelector('.js-change-page-size-btn');

changePageSizeBtnRef.addEventListener('click', toggleFullScreen);
