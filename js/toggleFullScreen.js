const pageWrapRef = document.getElementById('page-wrap');
const headerRef = document.getElementById('header');
const mainRef = document.getElementById('main');

function toggleFullScreen() {
  if (
    pageWrapRef.clientWidth === document.body.clientWidth &&
    pageWrapRef.clientHeight === document.body.clientHeight
  ) {
    pageWrapRef.style.width = null;
    pageWrapRef.style.height = null;
    mainRef.style.height = null;
    mainRef.style.maxHeight = null;

    return;
  }
  pageWrapRef.style.width = document.body.clientWidth + 'px';
  pageWrapRef.style.height = document.body.clientHeight + 'px';
  mainRef.style.height =
    document.body.clientHeight - headerRef.offsetHeight + 'px';
  mainRef.style.maxHeight =
    document.body.clientHeight - headerRef.offsetHeight + 'px';
}

const changePageSizeBtnRef = document.querySelector('.js-change-page-size-btn');

changePageSizeBtnRef.addEventListener('click', toggleFullScreen);
