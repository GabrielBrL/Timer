const {
    ipcMain
} = require('electron');
const data = require("./data");

let submenus = [];

module.exports = {
    submenuInicial: null,
    templateInicial: null,
    geraMenu(win) {
        let template = [{
            label: 'Cursos',
            submenu: submenus
        }]
        this.geraMenuPrincipalTemplate().forEach(templateMenuPrincipal => {
            template.push(templateMenuPrincipal)
        });

        let cursos = data.pegaNomeCursos();

        cursos.forEach((curso) => {
            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    win.send('curso-trocado', curso);
                }
            }
            submenus.push(menuItem);
        });
        this.submenuInicial = submenus;
        this.templateInicial = template;
        return template;

    },
    adicionaCursoMenu(nomeCurso, win) {
        this.submenuInicial.push({
            label: nomeCurso,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('curso-trocado', nomeCurso);
            }
        })

        return this.templateInicial;
    },
    geraMenuPrincipalTemplate() {
        let templateMenu = [{
                label: 'View',
                submenu: [{
                        role: 'reload'
                    },
                    {
                        role: 'toggledevtools'
                    }
                ]
            },

            {
                label: 'Window',
                submenu: [{
                        role: 'minimize',
                        accelerator: 'Alt+M'
                    },                    
                    {
                        role: 'close'
                    }
                ]
            },

            {
                label: 'Sobre',
                submenu: [{
                    label: 'Sobre o Alura Timer',
                    click: () => {
                        ipcMain.emit('abrir-janela-sobre');
                    },
                    accelerator: 'CmdOrCtrl+I'
                }]
            }
        ]
        if (process.platform == 'darwin') {
            templateMenu.unshift({
                label: app.getName(),
                submenu: [{
                    label: 'Estou rodando no Mac!'
                }]
            })
        }
        return templateMenu;
    }
}