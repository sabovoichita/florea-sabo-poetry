var activePage = "poezia1";

function $(selector) {
  return document.querySelector(selector);
}

function hide(id) {
  // console.info("hide", id);
  document.getElementById(id).style.display = "none";
}

function show(id) {
  // console.info("show", id);
  var page = document.getElementById(id);
  // console.debug("show page", page);
  page.style.display = "block";
}

function showpoezia(id) {
  hide(activePage);
  show(id);
  activePage = id;
}

function showPoetry(poetryNumber, poetry) {
  console.log("poetry", poetry);
  const insert = $(`#poezia${poetryNumber}`);
  const { title, content } = poetry;
  const textHTML = `<div class="designPoetry">
    <h2> <span class="nb">${poetryNumber}</span>${title}</h2>
    ${content.map((contentItem) => `<p>${contentItem}</p>`).join(" ")}
    <span>&copy; Floarea Sabo</span>
    </div>
  `;
  // console.warn("text:", textHTML);
  insert.innerHTML = textHTML;
}

function loadPoetries(poetryNumber) {
  // console.log("inside");
  fetch(`poetries/${poetryNumber}.json`)
    .then((r) => r.json())
    .then((poetry) => {
      // console.log("print in console %o", poetry, poetryNumber);
      showPoetry(poetryNumber, poetry);
    })
    .catch((error) => {
      console.error(`Error loading lesson ${poetryNumber}:`, error);
    });
}
function initEvents() {
  const numberOfLessons = 4;
  for (let i = 1; i <= numberOfLessons; i++) {
    loadPoetries(i);
  }
}
initEvents();
// showpoezia(activePage);
