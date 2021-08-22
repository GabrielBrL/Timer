const { app, BrowserWindow, ipcMain, Menu, globalShortcut } = require('electron');
const data = require ('./data');
const templateGenerator = require('./template');

let mainWindow = null;

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    })

    const templateMenu = templateGenerator.geraMenu(mainWindow);
    const menu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(menu);

    globalShortcut.register('CmdOrCtrl+Shift+S', ()=>{
        mainWindow.send('atalho-iniciar-parar');
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () =>{
    app.quit();
});

let sobreWindow = null;
ipcMain.on('abrir-janela-sobre', ()=>{
    if(sobreWindow == null){
        sobreWindow = new BrowserWindow({
            width:300,
            height: 220,
            alwaysOnTop: true,
            frame: false
        });
        sobreWindow.on('closed', ()=>{
            sobreWindow = null;
        });
    }
    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado)=>{
    console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`);
    data.salvaDados(curso,tempoEstudado);
});

ipcMain.on('curso-adicionado', (event, novoCurso) => {
    let menuNovoCurso = templateGenerator.adicionaCursoMenu(novoCurso, mainWindow);
    let menuNovo = Menu.buildFromTemplate(menuNovoCurso);
    Menu.setApplicationMenu(menuNovo);
});