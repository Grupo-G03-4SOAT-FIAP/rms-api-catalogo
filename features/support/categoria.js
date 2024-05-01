require('dotenv/config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

class Categoria {
  retornarDadosCategoriaFake() {
    const nome = `Categoria ${faker.string.uuid()}`;
    const descricao = `Descricão ${faker.string.uuid()}`;
    return {
      nome: nome,
      descricao: descricao,
    };
  }

  async criarCategoria(nome, descricao) {
    const categoriaData = {
      nome,
      descricao,
    };

    const response = await request(process.env.BASE_URL)
      .post('/categoria')
      .send(categoriaData)
      .then((response) => {
        return response.body;
      });

    return response;
  }

  async retornarCategoriaPorId(categoriaId) {
    const response = await request(process.env.BASE_URL)
      .get(`/categoria/${categoriaId}`)
      .then((response) => {
        return response.body;
      });

    return response;
  }
}

module.exports = Categoria;
