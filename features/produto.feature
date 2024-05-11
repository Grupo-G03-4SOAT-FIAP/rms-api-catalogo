# language: pt
Funcionalidade: Produto

  Cenário: Deve ser possível criar um produto com sucesso
    Dado O usuário crie um produto
    Então O produto deve estar registrado no banco de dados

  Cenário: Deve ser retornado um Conflict error ao tentar criar um produto com um nome já registrado
    Dado O usuário crie um produto
    Quando Tentar criar outro produto com o mesmo nome
    Então Deve ser retornado um erro "Conflict" com status code 409 e mensagem "Existe um produto com esse nome" para produtos duplicados
  
  Cenário: Deve ser retornado um erro Not Found Error se tentar criar um produto com uma categoria que não existe
    Dado O usuário tente criar um produto com uma categoria inexistente
    Então Deve ser retornado um erro "Not found" com o status code 404 e mensagem "Categoria informada não existe" para produtos com categoria inexistente

  Cenário: Deve ser possível editar um produto
    Dado O usuário crie um produto
    Quando Editar uma produto
    Então o produto deve ser atualizado no banco de dados

  Cenário: Deve ser retornado um erro Not Found Error se tentar atualizar um produto inexistente
    Dado O usuário tente atualizar um produto inexistente
    Então Deve ser retornado um erro "Not found" com o status code 404 e a mensagem "Produto informado não existe" para produtos inexistentes

  Cenário: Deve ser retornado um erro Conflict se tentar atualizar um produto com o mesmo nome de outro existente
    Dado O usuário crie um produto
    Quando O usuário tente atualizar um produto com o mesmo nome de outro existente
    Então Deve ser retornado um erro "Conflict" com o status code 409 e a mensagem "Existe um produto com esse nome" para atualizaçao de produtos duplicados

  Cenário: Deve ser possível remover um produto
    Dado O usuário crie um produto
    Quando O usuário remover um produto
    Então Deve ser retornada a mensagem "Produto excluído com sucesso" quando remover um produto
    E Deve ser retornado um erro "Not found" com status code 404 e mensagem "Produto informado não existe" quando buscar produto não encontrado ou removido

  Cenário: Deve retornar um erro Not Found Error ao tentar remover um produto não registrado
    Dado O usuário tente remover um produto não registrado
    Então Deve ser retornado um erro "Not found" com o status code 404 e a mensagem "Produto informado não existe" para produtos inexistentes

  Cenário: Deve ser possível pesquisar um produto
    Dado O usuário crie um produto
    Quando Realizar a pesquisa pelo id do produto
    Então Deve ser retornado os dados do produto

  Cenário: Deve ser retornado um erro Not Found Erro ao tentar pesquisar um produto não registrado
    Dado O usuário tente pesquisar um produto não registrado
    Então Deve ser retornado um erro "Not found" com o status code 404 e a mensagem "Produto informado não existe" para produtos inexistentes

  Cenário: Deve ser possível retornar todos os produtos cadastrados
    Dado O usuário liste todos os produtos
    Então Deve ser retornado um array com os objetos dos produtos

  Cenário: Deve ser possível listar os produtos por categoria
    Dado Tenha alguns produtos da mesma categoria
    Quando O usuário listar os produtos da categoria
    Então Deve ser retornado um array com os objetos dos produtos da categoria pesquisada

  Cenário: Deve ser retornado o erro Not Found Error ao tentar retornar produtos de uma categoria inexistente
    Dado O usuário tentar listar produtos de uma categoria inexistente
    Então Deve ser retornado um erro "Not found" com o status code 404 e mensagem "Categoria informada não existe" para produtos com categoria inexistente
