function hide(id) {
  document.getElementById(id).style.display = "none";
}

function show(id) {
  console.info("show", id);
  var page = document.getElementById(id);
  console.info("show page", page);
  page.style.display = "block";
}
function showpoezia1() {
  hide("poezia2");
  hide("poezia3");
  hide("poezia4");
  hide("poezia5");
  hide("poezia6");
  hide("poezia7");
  hide("poezia8");
  show("poezia1");
}

function showpoezia2() {
  hide("poezia1");
  hide("poezia3");
  hide("poezia4");
  hide("poezia5");
  hide("poezia6");
  hide("poezia7");
  hide("poezia8");
  show("poezia2");
}
function showpoezia3() {
  hide("poezia1");
  hide("poezia2");
  hide("poezia4");
  hide("poezia5");
  hide("poezia6");
  hide("poezia7");
  hide("poezia8");
  show("poezia3");
}
function showpoezia4() {
  hide("poezia1");
  hide("poezia2");
  hide("poezia3");
  hide("poezia5");
  hide("poezia6");
  hide("poezia7");
  hide("poezia8");
  show("poezia4");
}

function showpoezia5() {
  hide("poezia1");
  hide("poezia2");
  hide("poezia3");
  hide("poezia4");
  hide("poezia6");
  hide("poezia7");
  hide("poezia8");
  show("poezia5");
}

function showpoezia6() {
  hide("poezia1");
  hide("poezia2");
  hide("poezia3");
  hide("poezia4");
  hide("poezia5");
  hide("poezia7");
  hide("poezia8");
  show("poezia6");
}

function showpoezia7() {
  hide("poezia1");
  hide("poezia2");
  hide("poezia3");
  hide("poezia4");
  hide("poezia5");
  hide("poezia6");
  hide("poezia8");
  show("poezia7");
}

function showpoezia8() {
  hide("poezia1");
  hide("poezia2");
  hide("poezia3");
  hide("poezia4");
  hide("poezia5");
  hide("poezia6");
  hide("poezia7");
  show("poezia8");
}

showpoezia1();
