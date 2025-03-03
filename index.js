let currentPage = 0;
const poems = [];

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
      <div class="page ${
        index === currentPage ? "active" : ""
      }" id="page-${index}">
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

  updatePagePositions();
}

function updatePagePositions() {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page, index) => {
    if (index < currentPage) {
      // Pages before current go to the left
      page.style.transform = "rotateY(-180deg)";
      page.style.zIndex = poems.length - index;
    } else if (index === currentPage) {
      // Current page
      page.style.transform = "rotateY(0deg)";
      page.style.zIndex = poems.length;
    } else {
      // Pages after current go to the right
      page.style.transform = "rotateY(0deg)";
      page.style.zIndex = poems.length - index;
    }
  });
}

function flipPage(forward) {
  const pages = document.querySelectorAll(".page");

  if (forward && currentPage < pages.length - 1) {
    const currentPageElement = pages[currentPage];
    currentPageElement.style.transform = "rotateY(-180deg)";
    currentPage++;
    updatePagePositions();
  } else if (!forward && currentPage > 0) {
    currentPage--;
    const currentPageElement = pages[currentPage];
    currentPageElement.style.transform = "rotateY(0deg)";
    updatePagePositions();
  }

  updateButtonState();
}

function updateButtonState() {
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  prevButton.disabled = currentPage === 0;
  nextButton.disabled = currentPage === poems.length - 1;
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
