# language: pt
Funcionalidade: Categoria

  Cenário: Deve ser possível criar uma categoria com sucesso
    Dado O usuário cria uma nova categoria
    Então A categoria deve estar registrada no banco de dados

  Cenário: Deve ser retornado um Conflict error ao tentar criar uma categoria com um nome já registrado
    Dado O usuário cria uma nova categoria
    Quando Tentar criar outra categoria com o mesmo nome
    Então Deve ser retornado um erro "Conflict" com status code 409 e mensagem "Existe uma categoria com esse nome"

  Cenário: Deve ser possível editar uma categoria
    Dado O usuário cria uma nova categoria
    Quando Editar uma categoria
    Então A categoria deve ser atualizada no banco de dados

  Cenário: Deve ser retornado um Not Found Error se buscar uma categoria que não exista
    Dado O usuário busque uma categoria com id não registrado no banco
    Então Deve ser retornado um erro "Not found" com status code 404 e mensagem "Categoria informada não existe" quando buscar categoria não encontrada ou removida

  Cenário: Deve ser possível remover uma categoria
    Dado O usuário cria uma nova categoria
    Quando O usuário remover uma categoria
    Então Deve ser retornada a mensagem "Categoria excluída com sucesso" quando remover uma categoria
    E Deve ser retornado um erro "Not found" com status code 404 e mensagem "Categoria informada não existe" quando buscar categoria não encontrada ou removida

  Cenário: Deve ser retornado Not Found Error se tentar remover uma categoria não registrada
    Dado o usuário tenta remover uma categoria não registrada no banco
    Então Deve ser retornado um erro "Not found" com status code 404 e mensagem "Categoria informada não existe" quando tentar remover uma categoria não registrada

  Cenário: Deve ser possível listar todas as categorias
    Dado O usuário lista todas as categorias
    Então Deve ser retornado um array com os objetos das categorias

  Cenário: Deve ser possível pesquisar uma categoria
    Dado O usuário cria uma nova categoria
    Quando Realizar a pesquisa pelo id da categoria
    Então Deve ser retornado os dados da categoria
