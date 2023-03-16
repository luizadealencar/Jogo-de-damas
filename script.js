const tamanhoCelula = 50;
let pecaId = 0;
document.querySelector('#tabuleiro').append(criaTabuleiro());

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');
    tabela.setAttribute('id', 'tabela');
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
    imagem.dataset.cor = cor;
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
    const destino = ev.target

    // verifica se a peca pode ser movida pelo jogador atual
    if (peca.dataset.cor === jogadorAtual) {
        destino.appendChild(peca);
        // atualiza a cor do jogador atual
        jogadorAtual = jogadorAtual === 'black' ? 'red' : 'black';
    }
}

//verifica se uma dada celula esta sem peca
function ehVazia(linha, coluna) {
    return tabela.rows[linha].cells[coluna].childNodes.length == 0;
}

//!precisa verificar antes se a peca existe
function excluiPecaTabela(tabela, linha, coluna) {
    if (ehVazia(linha, coluna)) return alert('Nao ha peca para excluir');
    tabela.rows[linha].cells[coluna].removeChild(tabela.rows[linha].cells[coluna].firstChild);
}


// ------------------------JOGANDO
let tabela = document.querySelector('#tabela');
let jogadorAtual = 'black';
// while (jogoNaoAcabou) {

// }
