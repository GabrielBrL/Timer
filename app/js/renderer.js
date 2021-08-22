const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let btnAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

window.onload = () =>{
    
    data.pegaDados(curso.textContent)
        .then((dados)=>{
            tempo.textContent = dados.tempo;
        })
}

linkSobre.addEventListener('click', function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
botaoPlay.addEventListener('click', function(){
    if(play){
        timer.parar(curso.textContent);
        play = false;
        new Notification('Alura Timer', {
            body: `O curso ${curso.textContent} parou!`,
            icon: 'img/stop-button.png'
        });
    }else{
        timer.iniciar(tempo);
        play = true;
        new Notification('Alura Timer', {
            body: `O curso ${curso.textContent} iniciou!`,
            icon: 'img/play-button.png'
        });
    }
    imgs.reverse();
    botaoPlay.src = imgs[0];
});

ipcRenderer.on('curso-trocado', (event, nomeCurso)=>{
    timer.parar(curso.textContent);
    data.pegaDados(nomeCurso)
        .then((dados) => {
            tempo.textContent = dados.tempo;
        }).catch((error)=>{
            console.log('O curso ainda não foi setado!');
            tempo.textContent = '00:00:00';
        })
    curso.textContent = nomeCurso;
});

btnAdicionar.addEventListener('click', ()=>{

    if(campoAdicionar.value == ''){
        console.log('Campo curso vazio');
        return;
    }

    let novoCurso = campoAdicionar.value;
    curso.textContent = novoCurso;
    tempo.textContent = '00:00:00'
    campoAdicionar.value = '';
    ipcRenderer.send('curso-adicionado', novoCurso);
});

ipcRenderer.on('atalho-iniciar-parar', ()=>{
    let click = new MouseEvent('click');
    botaoPlay.dispatchEvent(click);
})