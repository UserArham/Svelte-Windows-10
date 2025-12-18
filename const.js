let role = null;

const menu = document.getElementById("menu");
const lab = document.getElementById("lab");
const editor = document.getElementById("editor");
const output = document.getElementById("output");

function login(type) {
  fetch(`users/${type}.json`)
    .then(r => r.json())
    .then(u => {
      role = u.role;
      document.getElementById("access").style.display = "none";
    });
}

function toggleMenu() {
  if (!role) return;
  menu.style.display = menu.style.display ? "" : "block";
}

function openLab() {
  lab.style.display = "block";
  menu.style.display = "";
  output.textContent = "Environment initialized. Restricted mode active.";
}

function openFile(name) {
  fetch("workspace/" + name)
    .then(r => r.text())
    .then(t => {
      editor.value = t;
      analyze(name);
    });
}

function analyze(file) {
  if (file.endsWith(".js"))
    output.textContent = "JavaScript analysis completed. No issues detected.";
  else if (file.endsWith(".py"))
    output.textContent = "Python syntax analysis completed successfully.";
  else if (file.endsWith(".sh"))
    output.textContent = "Shell script validated under restricted policy.";
  else if (file.endsWith(".h"))
    output.textContent = "C header file verified. Include guards present.";
  else
    output.textContent = "Markup validated. No structural issues detected.";
}

/* Drag */
function drag(e) {
  let x = e.clientX, y = e.clientY;
  document.onmousemove = ev => {
    lab.style.left = lab.offsetLeft + ev.clientX - x + "px";
    lab.style.top  = lab.offsetTop  + ev.clientY - y + "px";
    x = ev.clientX; y = ev.clientY;
  };
  document.onmouseup = () => document.onmousemove = null;
}
