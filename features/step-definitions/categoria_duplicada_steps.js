// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Given, Then, When } = require('@cucumber/cucumber');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Categoria = require('../support/categoria.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('node:assert');

const categoria = new Categoria();
let categoriaData = '';
let categoriaRegistrada = '';

Given(
  'O usuário cria uma categoria e retornar a mensagem de sucesso para o cadastro da categoria {string}',
  async function (mensagem) {
    categoriaData = categoria.retornarDadosCategoriaFake();
    categoriaRegistrada = await categoria.criarCategoria(
      categoriaData.nome,
      categoriaData.descricao,
    );
    assert.strictEqual(categoriaRegistrada.mensagem, mensagem);
  },
);

When('Tentar criar outra categoria com o mesmo nome', async function () {
  categoriaDupicada = await categoria.criarCategoria(
    categoriaData.nome,
    'teste',
  );
});

Then(
  'Deve ser retornado um erro {string} com status code {int} e mensagem {string} para categorias duplicadas',
  async function (error, status_code, mensagem) {
    assert.deepEqual(categoriaDupicada.message, mensagem);
    assert.deepEqual(categoriaDupicada.error, error);
    assert.strictEqual(categoriaDupicada.statusCode, status_code);
  },
);
