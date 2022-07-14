"use strict";
const btnAtualiza = document.querySelector('.atualizar-saldo');
const btnLimpar = document.querySelector('.limpar-saldo');
const soma = document.querySelector('.soma');
const campoSaldo = document.querySelector('.campo-saldo');
let saldoTotal = 0;
limpaSaldo();
function somarSaldo(valor) {
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
btnAtualiza === null || btnAtualiza === void 0 ? void 0 : btnAtualiza.addEventListener('click', () => {
    somarSaldo(Number(soma.value));
});
btnLimpar === null || btnLimpar === void 0 ? void 0 : btnLimpar.addEventListener('click', () => {
    saldoTotal = 0;
    limpaSaldo();
    soma.focus();
});
document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        somarSaldo(Number(soma.value));
    }
});
