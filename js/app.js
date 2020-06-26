const API_KEY = 'd94451ddf4cf444c85ff907f953c9184';

function exibeNoticias() {
    let divTela = document.getElementById('tela-noticia');
    let texto = '';

    // Montar texto HTML das noticias
    let dados = JSON.parse(this.responseText);
    for (i = 0; i < dados.articles.length; i++) {
        let noticia = dados.articles[i];
        let data = new Date(noticia.publishedAt);

        texto = texto + `
            <div class="box-noticia row no-gutters">
                <div class="col-md-4">
                    <img src="${noticia.urlToImage}" class="card-img" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title"><a href="${noticia.url}" target="_blank">${noticia.title}</a></h5>
                        <p class="card-text"><small class="text-muted">${data.toLocaleDateString()} - ${noticia.source.name}</small></p>
                        <p class="card-text">${noticia.content}</p>
                    </div>
                </div>
            </div>
        `;
    };

    // Preencher a DIV com o texto HTML
    divTela.innerHTML = texto;
}

function executaPesquisa() {
    let query = document.getElementById('txtPesquisa').value;

    let divTela = document.getElementById('tela-titulo');
    let texto = '';

    // Montar título HTML da fonte
    texto = texto + `
        <nav class="navbar navbar-light bg-light">
            <a class="titulo-nav navbar-brand">Pesquisa: <strong>${query}</strong></a>
            
            <button type="button" class="btn-salvar btn btn-warning btn-primary" data-toggle="modal" data-target="#exampleModal">
                Salvar
            </button>

            
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Pesquisas Salvas</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-default">Título do
                                        menu</span>
                                </div>
                                <input id="txtTitulo" type="text"   class="form-control hsimp-level">
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-default">Texto de Pesquisa</span>
                                </div>
                                <input id="txtDescricao" type="text" class="form-control hsimp-level">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary"
                                data-dismiss="modal">Cancelar</button>
                            <button id="btnSalvar" type="button" class="btn btn-primary" data-dismiss="modal" onclick="salvarPesquisa();exibePesquisasSalvas()">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;
    divTela.innerHTML = texto;

    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.open('GET', `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
    xhr.send();
}

function carregaMain() {
    let divTela = document.getElementById('tela-titulo');
    let texto = '';
    divTela.innerHTML = texto;

    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=br&apiKey=${API_KEY}`);
    xhr.send();
}

function carregaFonte(botao) {
    let fonte = botao.value;
    let nome = botao.innerHTML;

    let divTela = document.getElementById('tela-titulo');
    let texto = '';

    // Montar título HTML da fonte
    texto = texto + `
        <nav class="navbar navbar-light bg-light" style="
        padding: 4px 0px;">
            <a class="titulo-nav navbar-brand">Fonte: <strong>${nome}</strong></a>
        </nav>
    `;
    divTela.innerHTML = texto;

    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.open('GET', `http://newsapi.org/v2/everything?domains=${fonte}&apiKey=${API_KEY}`)
    xhr.send();
}

function carregaPesquisa(botao) {
    let pesquisa = botao.value;
    let nome = botao.innerHTML;

    let divTela = document.getElementById('tela-titulo');
    let texto = '';

    // Montar título HTML da pesquisa
    texto = texto + `
        <nav class="navbar navbar-light bg-light" style="
        padding: 4px 0px;">
            <a class="titulo-nav navbar-brand">Pesquisa salva: <strong>${nome}</strong></a>
        </nav>
    `;
    divTela.innerHTML = texto;

    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.open('GET', `https://newsapi.org/v2/everything?q=${pesquisa}&apiKey=${API_KEY}`);
    xhr.send();
}

let salvas = [];
function salvarPesquisa() {
    let id, titulo, descricao, pesquisa;

    if (localStorage.length === 0) {
        titulo = document.getElementById('txtTitulo').value;
        descricao = document.getElementById('txtDescricao').value;
        pesquisa = document.getElementById('txtPesquisa').value;

        localStorage.setItem('pesquisasSalvas', JSON.stringify({ pesquisasSalvas: [{ titulo, descricao, pesquisa }] }));
    } else {
        titulo = document.getElementById('txtTitulo').value;
        descricao = document.getElementById('txtDescricao').value;
        pesquisa = document.getElementById('txtPesquisa').value;

        salvas = JSON.parse(localStorage.getItem('pesquisasSalvas')) || [];

        salvas.pesquisasSalvas.push({ titulo, descricao, pesquisa });
        console.log(salvas);

        localStorage.setItem('pesquisasSalvas', JSON.stringify(salvas));
    }
};

function exibePesquisasSalvas() {
    let divTela = document.getElementById('pesquisas-salvas');
    let texto = '';

    salvas = JSON.parse(localStorage.getItem('pesquisasSalvas'));

    if (salvas.pesquisasSalvas.length === 0) {
        localStorage.removeItem('pesquisasSalvas');
    } else {
        texto = texto + `
            <div class="card-header">
                Pesquisas Salvas
            </div>
            <ul class="list-group list-group-flush">
        `;
    }
    for (i = 0; i < salvas.pesquisasSalvas.length; i++) {
        let titulo = salvas.pesquisasSalvas[i].titulo;
        let pesquisa = salvas.pesquisasSalvas[i].pesquisa;

        texto = texto + `
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" value="${pesquisa}" class="btn btn-secondary"
                    onclick="carregaPesquisa(this);">${titulo}</button>
                <button type="button" value="${i}" class="btn-close btn btn-secondary btn-lg active"
                    onclick="removePesquisaSalva(${i});"><i
                    class="fas fa-times"></i></button>
            </div>
        `;
    };
    texto = texto + `
        </ul>
    `;

    // Preencher a DIV com o texto HTML
    divTela.innerHTML = texto;
}

function removePesquisaSalva(id) {
    salvas = JSON.parse(localStorage.getItem('pesquisasSalvas'));
    salvas.pesquisasSalvas.splice(id, 1);
    localStorage.setItem('pesquisasSalvas', JSON.stringify(salvas));
    exibePesquisasSalvas();
}

document.getElementById('btnPesquisa').addEventListener('click', executaPesquisa);

document.getElementById('logo').addEventListener('click', carregaMain);

onload = carregaMain();

onload = exibePesquisasSalvas();