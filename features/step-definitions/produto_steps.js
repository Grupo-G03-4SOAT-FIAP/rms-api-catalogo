// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Given, Then, When, BeforeAll } = require('@cucumber/cucumber');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Categoria = require('../support/categoria.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Produto = require('../support/produto.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('node:assert');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

const categoria = new Categoria();
let categoriaDado = '';
let categoriaTest = '';
let categoriaPesquisa = '';

const produto = new Produto();
let produtoDado = '';
let produtoRegistrado = '';
let produtoDuplicado = '';
let produtoCategoriaInexistente = '';
let produtoNovo = '';
let produtoAtualizado = '';
let produtoError = '';
let produtoRemovido = '';
let produtoPesquisado = '';
let todosProdutos = '';
let produto1 = '';
let produto2 = '';
let produto3 = '';
let produtosCategoria = '';

BeforeAll(async function () {
  categoriaDado = categoria.retornarDadosCategoriaFake();
  categoriaTest = await categoria.criarCategoria(
    categoriaDado.nome,
    categoriaDado.descricao,
  );
});

Given('O usuário crie um produto', async function () {
  produtoDado = produto.retornarDadosProdutoFake();
  produtoRegistrado = await produto.criarProduto(
    produtoDado.nome,
    produtoDado.valorUnitario,
    produtoDado.descricao,
    produtoDado.imagemUrl,
    categoriaTest.body.id,
  );
  assert.strictEqual(produtoRegistrado.mensagem, 'Produto criado com sucesso');
});

Given(
  'O usuário tente criar um produto com uma categoria inexistente',
  async function () {
    const data = produto.retornarDadosProdutoFake();
    produtoCategoriaInexistente = await produto.criarProduto(
      data.nome,
      data.valorUnitario,
      data.descricao,
      data.imagemUrl,
      faker.string.uuid(),
    );
  },
);

Then(
  'Deve ser retornado um erro {string} com o status code {int} e mensagem {string} para produtos com categoria inexistente',
  function (error, status, mensagem) {
    assert.strictEqual(produtoCategoriaInexistente.error, error);
    assert.strictEqual(produtoCategoriaInexistente.statusCode, status);
    assert.strictEqual(produtoCategoriaInexistente.message, mensagem);
  },
);

Then('O produto deve estar registrado no banco de dados', async function () {
  const produtoSalvo = await produto.retornarProdutoPorId(
    produtoRegistrado.body.id,
  );
  assert.deepStrictEqual(produtoSalvo.nome, produtoRegistrado.body.nome);
  assert.deepStrictEqual(
    produtoSalvo.descricao,
    produtoRegistrado.body.descricao,
  );
});

When('Tentar criar outro produto com o mesmo nome', async function () {
  produtoDuplicado = await produto.criarProduto(
    produtoDado.nome,
    produtoDado.valorUnitario,
    produtoDado.descricao,
    produtoDado.imagemUrl,
    categoriaTest.body.id,
  );
});

Then(
  'Deve ser retornado um erro {string} com status code {int} e mensagem {string} para produtos duplicados',
  async function (error, status_code, mensagem) {
    assert.deepEqual(produtoDuplicado.message, mensagem);
    assert.deepEqual(produtoDuplicado.error, error);
    assert.strictEqual(produtoDuplicado.statusCode, status_code);
  },
);

When('Editar uma produto', async function () {
  produtoNovo = produto.retornarDadosProdutoFake();
  produtoAtualizado = await produto.editarProduto(produtoRegistrado.body.id, {
    nome: produtoNovo.nome,
  });
  assert.deepEqual(
    produtoAtualizado.mensagem,
    'Produto atualizado com sucesso',
  );
  assert.deepEqual(produtoAtualizado.body.id, produtoRegistrado.body.id);
  assert.deepEqual(
    produtoAtualizado.body.nome.toUpperCase(),
    produtoNovo.nome.toUpperCase(),
  );
  assert.deepEqual(
    produtoAtualizado.body.descricao,
    produtoRegistrado.body.descricao,
  );
});

Then('o produto deve ser atualizado no banco de dados', async function () {
  const produtoSalvo = await produto.retornarProdutoPorId(
    produtoRegistrado.body.id,
  );
  assert.deepEqual(produtoSalvo.nome, produtoAtualizado.body.nome);
  assert.deepEqual(produtoSalvo.descricao, produtoAtualizado.body.descricao);
});

Given('O usuário tente atualizar um produto inexistente', async function () {
  produtoNovo = produto.retornarDadosProdutoFake();
  produtoError = await produto.editarProduto(faker.string.uuid(), produtoNovo);
});

Then(
  'Deve ser retornado um erro {string} com o status code {int} e a mensagem {string} para produtos inexistentes',
  async function (error, status_code, mensagem) {
    assert.deepEqual(produtoError.message, mensagem);
    assert.deepEqual(produtoError.error, error);
    assert.strictEqual(produtoError.statusCode, status_code);
  },
);

When(
  'O usuário tente atualizar um produto com o mesmo nome de outro existente',
  async function () {
    let produtoTest = produto.retornarDadosProdutoFake();
    let produtoRegistroNovo = await produto.criarProduto(
      produtoTest.nome,
      produtoTest.valorUnitario,
      produtoTest.descricao,
      produtoTest.imagemUrl,
      categoriaTest.body.id,
    );

    produtoError = await produto.editarProduto(produtoRegistrado.body.id, {
      nome: produtoRegistroNovo.body.nome,
    });
  },
);

Then(
  'Deve ser retornado um erro {string} com o status code {int} e a mensagem {string} para atualizaçao de produtos duplicados',
  function (error, status_code, mensagem) {
    assert.deepEqual(produtoError.message, mensagem);
    assert.deepEqual(produtoError.error, error);
    assert.strictEqual(produtoError.statusCode, status_code);
  },
);

When('O usuário remover um produto', async function () {
  produtoRemovido = await produto.removerProdutoPorId(
    produtoRegistrado.body.id,
  );
});

Then(
  'Deve ser retornada a mensagem {string} quando remover um produto',
  function (mensagem) {
    assert.strictEqual(produtoRemovido.mensagem, mensagem);
  },
);

Then(
  'Deve ser retornado um erro {string} com status code {int} e mensagem {string} quando buscar produto não encontrado ou removido',
  async function (error, status_code, mensagem) {
    const prodError = await produto.retornarProdutoPorId(
      produtoRegistrado.body.id,
    );
    assert.deepEqual(prodError.error, error);
    assert.deepEqual(prodError.statusCode, status_code);
    assert.deepEqual(prodError.message, mensagem);
  },
);

Given('O usuário tente remover um produto não registrado', async function () {
  produtoError = await produto.removerProdutoPorId(faker.string.uuid());
});

When('Realizar a pesquisa pelo id do produto', async function () {
  produtoPesquisado = await produto.retornarProdutoPorId(
    produtoRegistrado.body.id,
  );
});

Then('Deve ser retornado os dados do produto', function () {
  // Write code here that turns the phrase above into concrete actions
  assert.deepEqual(produtoPesquisado.id, produtoRegistrado.body.id);
  assert.deepEqual(produtoPesquisado.nome, produtoRegistrado.body.nome);
  assert.deepEqual(
    produtoPesquisado.descricao,
    produtoRegistrado.body.descricao,
  );
  assert.deepEqual(
    produtoPesquisado.valorUnitario,
    produtoRegistrado.body.valorUnitario,
  );
  assert.deepEqual(
    produtoPesquisado.imagemUrl,
    produtoRegistrado.body.imagemUrl,
  );
});

Given('O usuário tente pesquisar um produto não registrado', async function () {
  produtoPesquisado = await produto.retornarProdutoPorId(faker.string.uuid());
});

Given('O usuário liste todos os produtos', async function () {
  todosProdutos = await produto.retornarTodosProdutos();
});

Then('Deve ser retornado um array com os objetos dos produtos', function () {
  const lastItem = todosProdutos.length - 1;
  assert.ok(typeof todosProdutos === 'object');
  assert.ok(todosProdutos.length > 1);
  assert('id' in todosProdutos[lastItem]);
  assert('nome' in todosProdutos[lastItem]);
  assert('descricao' in todosProdutos[lastItem]);
  assert('valorUnitario' in todosProdutos[lastItem]);
  assert('imagemUrl' in todosProdutos[lastItem]);
  assert('categoria' in todosProdutos[lastItem]);
});

Given('Tenha alguns produtos da mesma categoria', async function () {
  let data = categoria.retornarDadosCategoriaFake();
  categoriaPesquisa = await categoria.criarCategoria(data.nome, data.descricao);

  let produtoTest1 = produto.retornarDadosProdutoFake();
  produto1 = await produto.criarProduto(
    produtoTest1.nome,
    produtoTest1.valorUnitario,
    produtoTest1.descricao,
    produtoTest1.imagemUrl,
    categoriaPesquisa.body.id,
  );

  let produtoTest2 = produto.retornarDadosProdutoFake();
  produto2 = await produto.criarProduto(
    produtoTest2.nome,
    produtoTest2.valorUnitario,
    produtoTest2.descricao,
    produtoTest2.imagemUrl,
    categoriaPesquisa.body.id,
  );

  let produtoTest3 = produto.retornarDadosProdutoFake();
  produto3 = await produto.criarProduto(
    produtoTest3.nome,
    produtoTest3.valorUnitario,
    produtoTest3.descricao,
    produtoTest3.imagemUrl,
    categoriaPesquisa.body.id,
  );
});

When('O usuário listar os produtos da categoria', async function () {
  produtosCategoria = await produto.retornarTodosProdutosPorCategoria(
    categoriaPesquisa.body.id,
  );
});

Then(
  'Deve ser retornado um array com os objetos dos produtos da categoria pesquisada',
  async function () {
    assert.ok(typeof produtosCategoria === 'object');
    assert.ok(produtosCategoria.length == 3);
    assert.deepEqual(produtosCategoria, [
      produto1.body,
      produto2.body,
      produto3.body,
    ]);
  },
);

Given(
  'O usuário tentar listar produtos de uma categoria inexistente',
  async function () {
    produtoError = await produto.retornarTodosProdutosPorCategoria(
      faker.string.uuid(),
    );
  },
);
