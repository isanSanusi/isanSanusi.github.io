/* Inisialisasi: menu mobile, tahun footer, render pertama */
addEventListener("hashchange",()=>route());
$("#bg").onclick=()=>{const o=$("#mn").classList.toggle("open");$("#bg").setAttribute("aria-expanded",o)};
addEventListener("keydown",e=>{if(e.key==="Escape")$("#mn").classList.remove("open")});
$("#yr").textContent=new Date().getFullYear();route(false);
