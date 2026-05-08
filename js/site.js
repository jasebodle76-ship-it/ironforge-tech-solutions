document.addEventListener("DOMContentLoaded", () => {
  const river = document.querySelector(".binary-river");

  setTimeout(() => {
    if (river) {
      river.classList.add("river-flow");
    }
  }, 900);
});