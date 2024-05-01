# language: pt
Funcionalidade: Produto

  Cenário: Deve ser possível criar um produto com sucesso
    Dado O usuário crie um produto
    Quando Retornar a mensagem de sucesso para o cadastro do produto "Produto criado com sucesso"
    Então O produto deve estar registrado no banco de dados

  Cenário: Deve ser retornado um Conflict error ao tentar criar um produto com um nome já registrado
    Dado O usuário cria um produto e retornar a mensagem de sucesso para o cadastro do produto "Produto criado com sucesso"
    Quando Tentar criar outro produto com o mesmo nome
    Então Deve ser retornado um erro "Conflict" com status code 409 e mensagem "Existe um produto com esse nome" para produtos duplicados
