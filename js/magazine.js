/* magazine.js — magazine 페이지 인터랙션 */
(function () {
  "use strict";

  /* Category filter */
  const filterTabs = document.querySelectorAll(".mag-filter__tab");
  const cards = document.querySelectorAll(".mag-card");
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      const f = tab.dataset.filter;
      cards.forEach((card) => {
        card.style.display =
          f === "all" || card.dataset.category === f ? "" : "none";
      });
    });
  });
})();
