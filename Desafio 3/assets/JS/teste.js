const campoSaldo = document.querySelector('.campo-saldo');


const valorCampoSaldo = Number(campoSaldo.innerHTML);
valorCampoSaldo.innerHTML = 0;

console.log(typeof campoSaldo.innerHTML, campoSaldo.innerHTML)
console.log(typeof valorCampoSaldo, valorCampoSaldo)