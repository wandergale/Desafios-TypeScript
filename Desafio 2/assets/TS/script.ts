interface Pessoa {
    nome: string;
    idade: number;
    profissao: 'atriz' | 'Atriz' | 'Padeiro' | 'padeiro';
}

const pessoa1: Pessoa = {
    nome: 'maria',
    idade: 29,
    profissao: 'atriz'
}

const pessoa2: Pessoa = {
    nome: 'roberto',
    idade: 19,
    profissao: 'Padeiro'
}

const pessoa3: Pessoa = {
    nome: 'laura',
    idade: 32,
    profissao: 'Atriz'
}

const pessoa4: Pessoa = {
    nome: 'carlos',
    idade: 19,
    profissao: 'padeiro'
}