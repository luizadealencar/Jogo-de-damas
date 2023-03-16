const tamanhoCelula = 50;
let pecaId = 0;
document.querySelector('#tabuleiro').append(criaTabuleiro());
let tabela = document.createElement('table');


function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');
    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
            linha.append(celula);
            
            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;
            if (i % 2 == j % 2) {
                celula.addEventListener('dragover', allowDrop)
                celula.addEventListener('drop', drop)
                celula.style.backgroundColor = 'black';
                if (i * 8 + j <= 24) {
                    celula.append(criaPeca('black'));
                } else if (i * 8 + j >= 40) {
                    celula.append(criaPeca('red'));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
    
    return tabela;
}

function criaPeca(cor) {
    let imagem = document.createElement('img');
    imagem.id = pecaId++
    imagem.setAttribute('src', `img/${cor}.png`);
    imagem.setAttribute('width', `${tamanhoCelula - 4}px`);
    imagem.setAttribute('height', `${tamanhoCelula - 4}px`);
    imagem.setAttribute('draggable', "true")
    imagem.addEventListener('dragstart', drag)
    return imagem;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("pecaid", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("pecaid");
    const peca = document.getElementById(data);
    ev.target.appendChild(peca);
    if (peca.dataset.cor === 'black' && event.target.dataset.linha === '7') {
        tornarDama(peca);
    } else if (peca.dataset.cor === 'red' && event.target.dataset.linha === '0') {
        tornarDama(peca);
    }
    const celulaOrigem = document.getElementById(peca.parentElement.id);
    const celulaDestino = event.target;

    if (movimentoValido(celulaOrigem, celulaDestino)) {
        const pecaAdversaria = getPecaAdversaria(celulaOrigem, celulaDestino);
    if (pecaAdversaria) {
        celulaAdversaria.removeChild(pecaAdversaria);
    }
    celulaDestino.appendChild(peca);
  }
}

//verifica se uma dada celula está sem peça
function ehVazia(linha,coluna){
    return tabela.rows[linha].cells[coluna].childNodes.length == 0;
}

function excluiPeca(tabela,linha,coluna){}

function tornarDama(peca) {
    peca.classList.add('dama');
}