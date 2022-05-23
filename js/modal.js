function openModal() {
  modalAddImgRef.classList.add('is-open');

  const closeModalBtnRef = modalAddImgRef.querySelector('.js-close-modal-btn');

  closeModalBtnRef.addEventListener('click', onCloseModalBtnClick);
  window.addEventListener('keydown', closeModalAlt);
  window.addEventListener('click', closeModalAlt);
}

function closeModal() {
  modalAddImgRef.classList.remove('is-open');
}

function onCloseModalBtnClick() {
  closeModal();

  closeModalBtnRef.removeEventListener('click', onCloseModalBtnClick);
}

function closeModalAlt(e) {
  if (e.target.classList.contains('js-modal') || e.key === 'Escape') {
    closeModal();

    window.removeEventListener('keydown', closeModalAlt);
    window.removeEventListener('click', closeModalAlt);
  }
}
