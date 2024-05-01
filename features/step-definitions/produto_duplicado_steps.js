// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Given, When, Then, BeforeAll } = require('@cucumber/cucumber');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Categoria = require('../support/categoria.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Produto = require('../support/produto.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('node:assert');

const categoria = new Categoria();
let categoriaDado = '';
let categoriaTest = '';

const produto = new Produto();
let produtoDado = '';
let produtoRegistrado = '';

BeforeAll(async function () {
  categoriaDado = categoria.retornarDadosCategoriaFake();
  categoriaTest = await categoria.criarCategoria(
    categoriaDado.nome,
    categoriaDado.descricao,
  );
});

Given(
  'O usuário cria um produto e retornar a mensagem de sucesso para o cadastro do produto {string}',
  async function (mensagem) {
    produtoDado = produto.retornarDadosProdutoFake();
    produtoRegistrado = await produto.criarProduto(
      produtoDado.nome,
      produtoDado.valorUnitario,
      produtoDado.descricao,
      produtoDado.imagemUrl,
      categoriaTest.body.id,
    );
    assert.strictEqual(produtoRegistrado.mensagem, mensagem);
  },
);

When('Tentar criar outro produto com o mesmo nome', async function () {
  produtoRegistrado = await produto.criarProduto(
    produtoDado.nome,
    produtoDado.valorUnitario,
    produtoDado.descricao,
    produtoDado.imagemUrl,
    categoriaTest.body.id,
  );
});

Then(
  'Deve ser retornado um erro {string} com status code {int} e mensagem {string} para produtos duplicados',
  function (error, status_code, mensagem) {
    assert.deepEqual(produtoRegistrado.message, mensagem);
    assert.deepEqual(produtoRegistrado.error, error);
    assert.strictEqual(produtoRegistrado.statusCode, status_code);
  },
);
