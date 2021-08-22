const { ipcRenderer, shell } = require('electron');
const process = require ('process');

let linkFechar = document.querySelector('#link-fechar');
let linkLinkedin = document.querySelector('#link-linkedin');
let versaoElectron = document.querySelector('#versao-electron');

window.onload = function (){
    versaoElectron.textContent = process.versions.electron;
}

linkFechar.addEventListener('click', function(){
    ipcRenderer.send('fechar-janela-sobre');
});

linkLinkedin.addEventListener('click', function(){
    shell.openExternal("https://www.linkedin.com/in/gabriel-lourenco-669401194/");
});