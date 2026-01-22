const initConnectionModal = () => {
  const modal = document.getElementById("connection-modal");
  const openModalButton = document.getElementById("open-connection-modal");
  const closeModalButton = document.getElementById("close-connection-modal");
  const cancelModalButton = document.getElementById("cancel-connection-modal");
  const connectionForm = document.getElementById("connection-form");

  const openModal = () => {
    if (!modal) {
      return;
    }
    modal.classList.remove("is-hidden");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    if (!modal) {
      return;
    }
    modal.classList.add("is-hidden");
    modal.setAttribute("aria-hidden", "true");
  };

  openModalButton?.addEventListener("click", openModal);
  closeModalButton?.addEventListener("click", closeModal);
  cancelModalButton?.addEventListener("click", closeModal);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  connectionForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
};

export default initConnectionModal;
