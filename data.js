const jsonfile = require('jsonfile-promised');
const fs = require('fs');
const { spaces } = require('jsonfile-promised');



module.exports = {
    salvaDados(curso, tempoEstudado){
        let arquivoCurso = __dirname + '/data/'+ curso + '.json';
        if(fs.existsSync(arquivoCurso)){
            this.adicionaTempoCurso(arquivoCurso, tempoEstudado);
        }else{
            this.criaArquivoCurso(arquivoCurso, {})
                .then(()=>{
                    this.adicionaTempoCurso(arquivoCurso, tempoEstudado);
                })
        }
    },
    adicionaTempoCurso(arquivoCurso, tempoEstudado){
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado
        }
        jsonfile.writeFile(arquivoCurso, dados, {spaces:2})
                .then(()=>{
                    console.log('Tempo salvo');
                }).catch((error)=>{
                    console.log(error);
                });
    },
    criaArquivoCurso(nomeArquivo, conteudoArquivo){
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
                .then(()=>{
                    console.log('Arquivo Criado');
                }).catch((error)=>{
                    console.log(error);
                });
    },
    pegaDados(curso){
        let arquivoCurso = __dirname + '/data/'+ curso + '.json';
        return jsonfile.readFile(arquivoCurso);
    },
    pegaNomeCursos(){
        let arquivos = fs.readdirSync(__dirname + '/data/');
        let cursos = arquivos.map((arquivo)=>{
            return arquivo.substr(0, arquivo.lastIndexOf('.'));
        });
        return cursos;
    }
}