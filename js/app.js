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
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a>Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">${nome}</li>
            </ol>
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