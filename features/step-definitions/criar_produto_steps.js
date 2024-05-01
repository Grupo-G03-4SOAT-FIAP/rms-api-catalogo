// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Given, Then, When, BeforeAll } = require('@cucumber/cucumber');
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
let produtoRegistrado = '';

BeforeAll(async function () {
  categoriaDado = categoria.retornarDadosCategoriaFake();
  categoriaTest = await categoria.criarCategoria(
    categoriaDado.nome,
    categoriaDado.descricao,
  );
});

Given('O usuário crie um produto', async function () {
  const produtoDado = produto.retornarDadosProdutoFake();
  produtoRegistrado = await produto.criarProduto(
    produtoDado.nome,
    produtoDado.valorUnitario,
    produtoDado.descricao,
    produtoDado.imagemUrl,
    categoriaTest.body.id,
  );
});

When(
  'Retornar a mensagem de sucesso para o cadastro do produto {string}',
  async function (mensagem) {
    assert.strictEqual(produtoRegistrado.mensagem, mensagem);
  },
);

Then('O produto deve estar registrado no banco de dados', async function () {
  const produtoSalvo = await produto.retornarPategoriaPorId(
    produtoRegistrado.body.id,
  );
  assert.deepStrictEqual(produtoSalvo.nome, produtoRegistrado.body.nome);
  assert.deepStrictEqual(
    produtoSalvo.descricao,
    produtoRegistrado.body.descricao,
  );
});
