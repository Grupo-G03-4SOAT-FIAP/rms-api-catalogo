require('dotenv/config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

class Produto {
  retornarDadosProdutoFake() {
    const nome = `${faker.commerce.product()} - ${faker.string.uuid()}`;
    const descricao = faker.commerce.productDescription();
    const valorUnitario = parseFloat(faker.commerce.price());
    const imagemUrl = faker.image.url();
    return {
      nome: nome,
      valorUnitario: valorUnitario,
      descricao: descricao,
      imagemUrl: imagemUrl,
    };
  }

  async criarProduto(nome, valorUnitario, descricao, imagemUrl, categoriaId) {
    const produtoData = {
      nome: nome,
      valorUnitario: valorUnitario,
      descricao: descricao,
      imagemUrl: imagemUrl,
      categoriaId: categoriaId,
    };

    const response = await request(process.env.BASE_URL)
      .post('/produto')
      .send(produtoData)
      .then((response) => {
        return response.body;
      });

    return response;
  }

  async retornarPategoriaPorId(produtoId) {
    const response = await request(process.env.BASE_URL)
      .get(`/produto/${produtoId}`)
      .then((response) => {
        return response.body;
      });

    return response;
  }
}

module.exports = Produto;
