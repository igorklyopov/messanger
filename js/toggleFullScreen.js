const pageWrapRef = document.getElementById('page-wrap');
const headerRef = document.getElementById('header');
const mainRef = document.getElementById('main');

const hideAppBtnRef = document.querySelector('.js-hide-app-btn');
const changePageSizeBtnRef = document.querySelector('.js-change-page-size-btn');

hideAppBtnRef.addEventListener('click', toggleAppVisible);
changePageSizeBtnRef.addEventListener('click', toggleFullScreen);

const isFullScreen = () => localStorage.getItem('fullscreen') === 'yes';

document.documentElement.addEventListener('fullscreenchange', () => {
  if (isFullScreen() && pageWrapRef.offsetHeight > document.body.offsetHeight) {
    makeSmallScreen();
  }
});

function makeFullScreen() {
  pageWrapRef.style.width = window.screen.availWidth + 'px';
  pageWrapRef.style.height = window.screen.availHeight + 'px';
  mainRef.style.height = window.screen.availHeight + 'px';
  mainRef.style.maxHeight = window.screen.availHeight + 'px';

  document.body.requestFullscreen();

  pageWrapRef.addEventListener('fullscreenerror', () => {
    makeSmallScreen();
  });

  localStorage.setItem('fullscreen', 'yes');
}

function makeSmallScreen() {
  pageWrapRef.style.width = null;
  pageWrapRef.style.height = null;
  mainRef.style.height = null;
  mainRef.style.maxHeight = null;

  document.exitFullscreen().catch(err => console.log(err));

  localStorage.setItem('fullscreen', 'no');
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    makeFullScreen();
  } else if (document.fullscreenEnabled) {
    makeSmallScreen();
  }

  unwrapApp();
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
}

function unwrapApp() {
  pageWrapRef.classList.remove('is-rollup');
  mainRef.classList.remove('is-rollup');
}
