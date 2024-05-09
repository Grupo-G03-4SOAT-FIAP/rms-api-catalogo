// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Given, Then, When } = require('@cucumber/cucumber');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Categoria = require('../support/categoria.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('node:assert');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

const categoria = new Categoria();
let categoriaData = '';
let categoriaRegistrada = '';
let categoriaError = '';
let categoriaNova = '';
let categoriaAtualizada = '';
let categoriaRemovida = '';
let todasCategorias = '';
let categoriaPesquisada = '';

Given('O usuário cria uma nova categoria', async function () {
  categoriaData = categoria.retornarDadosCategoriaFake();
  categoriaRegistrada = await categoria.criarCategoria(
    categoriaData.nome,
    categoriaData.descricao,
  );
  assert.strictEqual(
    categoriaRegistrada.mensagem,
    'Categoria criada com sucesso',
  );
});

Given(
  'O usuário busque uma categoria com id não registrado no banco',
  async function () {
    categoriaError = await categoria.retornarCategoriaPorId(
      faker.string.uuid(),
    );
  },
);

Given(
  'o usuário tenta remover uma categoria não registrada no banco',
  async function () {
    categoriaError = await categoria.removerCategoriaPorId(faker.string.uuid());
  },
);

Given('O usuário lista todas as categorias', async function () {
  todasCategorias = await categoria.retornarTodasCategorias();
});

When('Tentar criar outra categoria com o mesmo nome', async function () {
  categoriaError = await categoria.criarCategoria(categoriaData.nome, 'teste');
});

When('Editar uma categoria', async function () {
  categoriaNova = categoria.retornarDadosCategoriaFake();
  categoriaAtualizada = await categoria.editarCategoria(
    categoriaRegistrada.body.id,
    {
      nome: categoriaNova.nome,
    },
  );
  assert.deepEqual(
    categoriaAtualizada.mensagem,
    'Categoria atualizada com sucesso',
  );
  assert.deepEqual(categoriaAtualizada.body.id, categoriaRegistrada.body.id);
  assert.deepEqual(
    categoriaAtualizada.body.nome.toUpperCase(),
    categoriaNova.nome.toUpperCase(),
  );
  assert.deepEqual(
    categoriaAtualizada.body.descricao,
    categoriaRegistrada.body.descricao,
  );
});

When('O usuário remover uma categoria', async function () {
  categoriaRemovida = await categoria.removerCategoriaPorId(
    categoriaRegistrada.body.id,
  );
});

When('Realizar a pesquisa pelo id da categoria', async function () {
  categoriaPesquisada = await categoria.retornarCategoriaPorId(
    categoriaRegistrada.body.id,
  );
});

Then(
  'Deve ser retornada a mensagem {string} quando remover uma categoria',
  async function (string) {
    assert.strictEqual(categoriaRemovida.mensagem, string);
    categoriaError = await categoria.retornarCategoriaPorId(
      faker.string.uuid(),
    );
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

Then(
  'Deve ser retornado um erro {string} com status code {int} e mensagem {string} quando buscar categoria não encontrada ou removida',
  async function (error, status_code, mensagem) {
    assert.deepEqual(categoriaError.message, mensagem);
    assert.deepEqual(categoriaError.error, error);
    assert.strictEqual(categoriaError.statusCode, status_code);
  },
);

Then(
  'Deve ser retornado um erro {string} com status code {int} e mensagem {string} quando tentar remover uma categoria não registrada',
  function (error, status_code, mensagem) {
    assert.deepEqual(categoriaError.message, mensagem);
    assert.deepEqual(categoriaError.error, error);
    assert.strictEqual(categoriaError.statusCode, status_code);
  },
);

Then(
  'Deve ser retornado um erro {string} com status code {int} e mensagem {string}',
  async function (error, status_code, mensagem) {
    assert.deepEqual(categoriaError.message, mensagem);
    assert.deepEqual(categoriaError.error, error);
    assert.strictEqual(categoriaError.statusCode, status_code);
  },
);

Then('A categoria deve ser atualizada no banco de dados', async function () {
  const categoriaSalva = await categoria.retornarCategoriaPorId(
    categoriaRegistrada.body.id,
  );
  assert.deepEqual(categoriaSalva.nome, categoriaAtualizada.body.nome);
  assert.deepEqual(
    categoriaSalva.descricao,
    categoriaAtualizada.body.descricao,
  );
});

Then(
  'Deve ser retornado um array com os objetos das categorias',
  async function () {
    const lastItem = todasCategorias.length - 1;
    assert.ok(typeof todasCategorias === 'object');
    assert.ok(todasCategorias.length > 1);
    assert('id' in todasCategorias[lastItem]);
    assert('nome' in todasCategorias[lastItem]);
    assert('descricao' in todasCategorias[lastItem]);
  },
);

Then('Deve ser retornado os dados da categoria', function () {
  assert.strictEqual(categoriaPesquisada.id, categoriaRegistrada.body.id);
  assert.strictEqual(categoriaPesquisada.nome, categoriaRegistrada.body.nome);
  assert.strictEqual(
    categoriaPesquisada.descricao,
    categoriaRegistrada.body.descricao,
  );
});
