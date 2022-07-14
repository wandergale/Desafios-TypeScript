// 3f301be7381a03ad8d352314dcc3ec1d
let valueApiKey: string;
let requestToken: string;
let valueUsername: string;
let valuePassword: string;
let sessionId: string;
let listId = '7101979';

const loginBtn = document.querySelector('#login-button') as HTMLButtonElement;
const searchBtn = document.querySelector('#search-button') as HTMLButtonElement;
const searchContainer = document.querySelector('#search-container') as HTMLElement;

loginBtn?.addEventListener('click', async () => {
    await criaRequestToken();
    await logar();
    await criaSessao();
})

searchBtn.addEventListener('click', async () => {
    const lista = document.querySelector("#lista") as HTMLUListElement;
    if (lista) {
        lista.outerHTML = "";
    }

    const query = document.querySelector('#search') as HTMLInputElement;
    const valueQuery = query?.value;

    const listaDeFilmes = await procuraFilme(valueQuery);

    const ul = document.createElement('ul') as HTMLUListElement;
    ul.setAttribute('id', 'lista');

    for (const item of listaDeFilmes.result) {
        const li = document.createElement('li') as HTMLElement;
        li.appendChild(document.createTextNode(item.original_title));
        ul.appendChild(li)
    }
    console.log(listaDeFilmes);
    searchContainer.appendChild(ul);
})

function preencherSenha() {
    let password = document.querySelector('#senha') as HTMLInputElement;
    valuePassword = password?.value;
    validateLoginButton();
}

function preencherLogin() {
    let username = document.querySelector('#login') as HTMLInputElement;
    valueUsername = username?.value;
    validateLoginButton(); 
}

function preencherApi() {
    let apiKey = document.querySelector('#api-key') as HTMLInputElement;
    valueApiKey = apiKey?.value;
    validateLoginButton();
}

function validateLoginButton() {
    if (valuePassword && valueUsername && valueApiKey) {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
}

class HttpClient { 
    static async get({url, method, body = null}) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(method, url, true)

            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    })
                }
            }
            request.onerror = () => {
                reject({
                    status: request.status,
                    statusText: request.statusText
                })
            }

            if (body) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                var body = JSON.stringify(body);
            }
            request.send(body)
        })
    }
}

async function procuraFilme(valueQuery) {
    valueQuery = encodeURI(valueQuery);
    console.log(valueQuery);
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${valueApiKey}&query=${valueQuery}`,
        method: "GET"
    })
    console.log(result)
    return result
}

async function adicionaFilme(filmeId: any) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${valueApiKey}&language=en-US`,
        method: "GET"
    })
    console.log(result);
}

async function criaRequestToken() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${valueApiKey}`,
        method: "GET"
    })
    try {
        if (result.request_token instanceof any) {

        }
    } catch(e) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
}

async function logar() {
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${valueApiKey}`,
        method: "POST",
        body: {
            valueUsername: `${valueUsername}`,
            valuePassword: `${valuePassword}`,
            requestToken: `${requestToken}`
        }
    })
}

async function criaSessao() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${valueApiKey}&request_token=${requestToken}`,
        method: "GET"
    })
    sessionId = result.session_id;
}

async function criaLista(nomeDaLista: string, descricao: string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list?api_key=${valueApiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            name: nomeDaLista,
            description: descricao,
            language: 'pt-br'
        }
    })
    console.log(result)
}

async function adicionarFilmeNaLista(filmeId: string, listaId: string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${valueApiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            media_id: filmeId
        }
    })
    console.log(result)
}

async function pegarLista() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${valueApiKey}`,
        method: "GET"
    })
    console.log(result)
}