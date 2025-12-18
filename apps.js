const menu = document.getElementById("menu");
const win = document.getElementById("vmWin");
const editor = document.getElementById("editor");
const term = document.getElementById("terminal");

function toggleMenu(){menu.style.display = menu.style.display ? "" : "block";}
function openVM(){
  win.style.display = "block";
  term.textContent = "PWRLinux / JPCLinux\nRestricted Mode\n";
}

function openFile(name){
  if(!name) return;
  fetch("files/" + name)
    .then(r => r.text())
    .then(t => editor.value = t);
}

/* Drag window */
function drag(e){
  let x=e.clientX,y=e.clientY;
  document.onmousemove=ev=>{
    win.style.left = win.offsetLeft + ev.clientX - x + "px";
    win.style.top  = win.offsetTop  + ev.clientY - y + "px";
    x=ev.clientX;y=ev.clientY;
  };
  document.onmouseup=()=>document.onmousemove=null;
}
