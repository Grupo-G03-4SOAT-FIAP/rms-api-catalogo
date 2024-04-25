// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Given, Then, When } = require('@cucumber/cucumber');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Categoria = require('./step-definitions/categoria.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('node:assert');

const categoria = new Categoria();
let categoriaRegistrada = '';

Given('O usuário cria uma categoria', async function () {
  const categoriaData = categoria.retornarDadosCategoriaFake();
  categoriaRegistrada = await categoria.criarCategoria(
    categoriaData.nome,
    categoriaData.descricao,
  );
});

When(
  'Retornar a mensagem de sucesso para o cadastro da categoria {string}',
  async function (mensagem) {
    assert.strictEqual(categoriaRegistrada.mensagem, mensagem);
  },
);

Then('A categoria deve estar registrada no banco de dados', async function () {
  const categoriaSalva = await categoria.retornarCategoriaPorId(
    categoriaRegistrada.body.id,
  );
  assert.deepEqual(categoriaSalva.nome, categoriaRegistrada.body.nome);
  assert.deepEqual(
    categoriaSalva.descricao,
    categoriaRegistrada.body.descricao,
  );
});
