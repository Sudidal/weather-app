const closeBtn = document.querySelector(".close-btn");
const dialog = document.querySelector(".settings-dialog");

closeBtn.addEventListener("click", () => {
  closeMenu();
});

function openMenu() {
  dialog.show();
}
function closeMenu() {
  dialog.close();
}

export { openMenu };
