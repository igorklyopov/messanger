const modalRef = document.querySelector('.js-modal');

function openModal() {
  const closeModalBtnRef = modalRef.querySelector('.js-close-modal-btn');
  modalRef.classList.add('is-open');

  closeModalBtnRef.addEventListener('click', onCloseModalBtnClick);
  window.addEventListener('keydown', closeModalAlt);
  window.addEventListener('click', closeModalAlt);
}

function closeModal() {
  modalRef.classList.remove('is-open');
}

function onCloseModalBtnClick() {
  closeModal();
}

function closeModalAlt(e) {
  if (e.target.classList.contains('js-modal') || e.key === 'Escape') {
    closeModal();

    window.removeEventListener('keydown', closeModalAlt);
    window.removeEventListener('click', closeModalAlt);
  }
}
