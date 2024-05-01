# language: pt
Funcionalidade: Categoria

  Cenário: Deve ser possível criar uma categoria com sucesso
    Dado O usuário cria uma nova categoria
    Quando Retornar a mensagem de sucesso para o cadastro da categoria "Categoria criada com sucesso"
    Então A categoria deve estar registrada no banco de dados

  Cenário: Deve ser retornado um Conflict error ao tentar criar uma categoria com um nome já registrado
    Dado O usuário cria uma categoria e retornar a mensagem de sucesso para o cadastro da categoria "Categoria criada com sucesso"
    Quando Tentar criar outra categoria com o mesmo nome
    Então Deve ser retornado um erro "Conflict" com status code 409 e mensagem "Existe uma categoria com esse nome" para categorias duplicadas
