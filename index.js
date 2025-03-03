let currentPage = 0;
const poems = [];
let isFlipping = false;

function initializeBook() {
  document.body.innerHTML = `
    <div class="book">
      <div class="book-spine"></div>
      <div id="page-container" class="page-wrapper">
        <div class="page-list"></div>
      </div>
      <div class="button-container">
        <button id="prevPage" class="nav-button">◀ Previous</button>
        <button id="nextPage" class="nav-button">Next ▶</button>
      </div>
    </div>
  `;
}

function updateBook() {
  const container = document.querySelector(".page-list");
  container.innerHTML = poems
    .map(
      (poetry, index) => `
      <div class="page ${index < currentPage ? "flipped" : ""}" 
           id="page-${index}" 
           style="z-index: ${poems.length - index}">
        <div class="page-front">
          <div class="page-content">
            <h2>${poetry.title}</h2>
            <div class="content-scroll">
              ${poetry.content.map((line) => `<p>${line}</p>`).join("")}
            </div>
          </div>
        </div>
        <div class="page-back">
          <div class="page-content"></div>
        </div>
      </div>
    `
    )
    .join("");
}

function flipPage(forward) {
  if (isFlipping) return;

  const pages = document.querySelectorAll(".page");

  if (forward && currentPage < pages.length - 1) {
    isFlipping = true;
    const currentPageElement = pages[currentPage];

    currentPageElement.style.zIndex = poems.length - currentPage;
    currentPageElement.classList.add("flipped");

    setTimeout(() => {
      currentPage++;
      isFlipping = false;
      updateButtonState();
    }, 600);
  } else if (!forward && currentPage > 0) {
    isFlipping = true;
    const previousPageElement = pages[currentPage - 1];

    previousPageElement.style.zIndex = poems.length - (currentPage - 1);
    previousPageElement.classList.remove("flipped");

    setTimeout(() => {
      currentPage--;
      isFlipping = false;
      updateButtonState();
    }, 600);
  }

  updateButtonState();
}

function updateButtonState() {
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  prevButton.disabled = currentPage === 0 || isFlipping;
  nextButton.disabled = currentPage === poems.length - 1 || isFlipping;
}

function loadPoetry(index) {
  fetch(`poetries/${index}.json`)
    .then((res) => res.json())
    .then((poetry) => {
      poems.push(poetry);
      updateBook();
      updateButtonState();
    })
    .catch((err) => console.error("Error loading poetry:", err));
}

function initEvents() {
  for (let i = 1; i <= 23; i++) {
    loadPoetry(i);
  }

  document
    .getElementById("prevPage")
    .addEventListener("click", () => flipPage(false));
  document
    .getElementById("nextPage")
    .addEventListener("click", () => flipPage(true));
}

document.addEventListener("DOMContentLoaded", function () {
  initializeBook();
  initEvents();
});
