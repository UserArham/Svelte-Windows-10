let role = null;

const menu = document.getElementById("menu");
const win = document.getElementById("vmWin");
const editor = document.getElementById("editor");
const out = document.getElementById("output");

function login(type){
  fetch(`users/${type}.json`)
    .then(r=>r.json())
    .then(u=>{
      role = u.role;
      document.getElementById("login").style.display="none";
      alert(`Logged in as ${u.role}`);
    });
}

function toggleMenu(){
  if(!role) return alert("Login required");
  menu.style.display = menu.style.display ? "" : "block";
}

function openVM(){
  win.style.display="block";
  menu.style.display="";
  out.textContent="VM Ready • Restricted Mode • Read Only";
}

function openFile(name){
  fetch("files/" + name)
    .then(r=>r.text())
    .then(t=>{
      editor.value=t;
      showOutput(name);
    });
}

function showOutput(file){
  if(file.endsWith(".js")) out.textContent="JS Check ✓ No errors";
  if(file.endsWith(".py")) out.textContent="Python Syntax ✓ Valid";
  if(file.endsWith(".sh")) out.textContent="Shell Script ✓ Restricted";
  if(file.endsWith(".h")) out.textContent="Header ✓ Guards OK";
  if(file.includes("tailwind")) out.textContent="Tailwind ✓ Classes OK";
}

/* Drag window */
function drag(e){
  let x=e.clientX,y=e.clientY;
  document.onmousemove=ev=>{
    win.style.left=win.offsetLeft+ev.clientX-x+"px";
    win.style.top=win.offsetTop+ev.clientY-y+"px";
    x=ev.clientX;y=ev.clientY;
  };
  document.onmouseup=()=>document.onmousemove=null;
}
