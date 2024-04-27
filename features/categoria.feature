# language: pt
Funcionalidade: Categoria

  Cenário: Deve ser possível criar uma categoria com sucesso
  Dado O usuário cria uma categoria
  Quando Retornar a mensagem de sucesso para o cadastro da categoria "Categoria criada com sucesso"
  Então A categoria deve estar registrada no banco de dados
