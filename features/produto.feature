# language: pt
Funcionalidade: Produto

  Cenário: Deve ser possível criar um produto com sucesso
  Dado O usuário crie um produto
  Quando Retornar a mensagem de sucesso para o cadastro do produto "Produto criado com sucesso"
  Então O produto deve estar registrado no banco de dados
