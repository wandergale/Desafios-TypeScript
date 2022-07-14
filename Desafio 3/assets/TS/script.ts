const btnAtualiza = document.querySelector('.atualizar-saldo') as HTMLButtonElement;
const btnLimpar = document.querySelector('.limpar-saldo') as HTMLButtonElement;
const soma = document.querySelector('.soma') as HTMLInputElement;
const campoSaldo = document.querySelector('.campo-saldo') as HTMLSpanElement;

let saldoTotal = 0;

limpaSaldo();

function somarSaldo(valor: number): void {
    saldoTotal += valor;
    campoSaldo.innerHTML = saldoTotal.toString();
    limpaSoma();
}


function limpaSaldo() {
    campoSaldo.innerHTML = '0';
}

function limpaSoma() {
    soma.value = "";
    soma.focus();
}

btnAtualiza?.addEventListener('click', () => {
    somarSaldo(Number(soma.value));
})

btnLimpar?.addEventListener('click', () => {
    saldoTotal = 0;
    limpaSaldo();
    soma.focus();
})

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        somarSaldo(Number(soma.value))
    }
})