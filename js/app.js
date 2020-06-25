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
                                <input id="txtTitulo" type="text" class="form-control hsimp-level">
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
                            <button id="btnSalvar" type="button" class="btn btn-primary" data-dismiss="modal" onclick="salvarPesquisa()">Salvar</button>
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
        <nav class="navbar navbar-light bg-light">
            <a class="titulo-nav navbar-brand"><strong>${nome}</strong></a>
            
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
                                <input type="text" class="form-control hsimp-level">
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-default">Texto de Pesquisa</span>
                                </div>
                                <input type="text" class="form-control hsimp-level">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary"
                                data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-warning">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;
    divTela.innerHTML = texto;

    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.open('GET', `http://newsapi.org/v2/everything?domains=${fonte}&apiKey=${API_KEY}`)
    xhr.send();
}

document.getElementById('btnPesquisa').addEventListener('click', executaPesquisa);

document.getElementById('logo').addEventListener('click', carregaMain);

onload = carregaMain();




// Local Storage
function salvarPesquisa() {
    let salvas = [];
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

/*function salvarPesquisa() {
    let id = localStorage.length;
    let titulo = document.getElementById('txtTitulo').value;
    let descricao = document.getElementById('txtDescricao').value;
    let pesquisa = document.getElementById('txtPesquisa').value;

    localStorage.setItem('pesquisasSalvas', JSON.stringify({ pesquisasSalvas: [{ id, titulo, descricao, pesquisa }] }));
    //localStorage.setItem('pesquisasSalvas', JSON.stringify({ pesquisasSalvas: [{ id, titulo, descricao, pesquisa }, { id: 1, titulo: "teste", descricao: "testando", pesquisa: "TESTE" }] }));

    let salvas = JSON.parse(localStorage.getItem('pesquisasSalvas'));


    console.log(salvas.pesquisasSalvas[0].pesquisa);
    console.log(salvas);
};*/