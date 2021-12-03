# Perfect Beer API

API desenvolvida para definir qual é a cerveja perfeita, de acordo com a temperatura.
Teste solicitado pela empresa Be Growth.

## Entidades

| Entidades | Atributos |
| - | - |
| beer_styles | id, name, minimum_temperature, maximum_temperature, created_at, updated_at |


## Funcionalidades

- [x] CRUD de estilos de cerveja (criar, listar, editar, excluir e importar via CSV)
- [x] Retornar a cerveja ideal junto com uma playlist do Spotify, dada a temperatura
- [x] Se houver mais de uma cerveja retornada, classificar por ordem alfabética
- [x] Se não houver playlist do Spotify o status 204 na playlist
- [x] Se houver erro na consulta do Spotify o status deve ser 500

## Iniciando o projeto

Após clonar o projeto, é necessário atualizar as dependências.

### Comandos de execução

```bash
# Baixar dependências Javascript
yarn

# Executar as migrations (lembrar de criar o ORM Config conforme instruções em "Configurações adicionais")
yarn typeorm migration:run

# Executar a aplicação
yarn dev:server
```

### Comandos para executar com docker-compose

Outra alternativa para executar o projeto é utilizando Docker Compose, conforme abaixo:

```bash
# Gerar container e iniciar a aplicação
docker-compose up -d
```

Abaixo tem uns comandos adicionais que podem ser úteis com Docker Compose

```bash
# Parar execução e remover o container
docker-compose down

# Parar execução (sem remover o container)
docker-compose stop

# Iniciar execução (com container já criado)
docker-compose start

# Reiniciar execução
docker-compose restart

# Verificar logs
docker logs perfect_beer_api -f

# Acessar container
docker exec -it perfect_beer_api /bin/bash
```

### Configurações adicionais

- Variáveis ambiente: criar arquivo *.env* com o conteúdo de *.env.example*, para utilizar as variáveis ambientes do sistema, preenchendo todos os valores necessários
- Keys do spotify disponíveis em https://developer.spotify.com/ (necessário efetuar login na plataforma para gerar)
- Banco de dados: criar arquivo *ormconfig.json* com o conteúdo de *ormconfig.example.json* e configurar com os dados de usuário e senha do banco de dados
- Se estiver usando o container do docker-compose, é necessário colocar o IP conforme o resultado do comando abaixo:
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' perfect_beer_postgres
```
- No *docker-compose.yml* e *ormconfig.example.json* já tem um usuário e senha de banco de dados, caso sinta vontade, pode alterar para uma que preferir

## Recursos utilizados

- Express
- Typescript
- TDD com Jest
- Multer
- Swagger
- Tsyringe
- Postgres
- TypeORM
- Docker e Docker Compose

## Rotas disponíveis

Para informações detalhadas, executar a aplicação e abrir a URL *http://localhost:3333/api-docs*. Abaixo tem a tabela contendo todas as rotas, seus métodos e possíveis status de retorno.

| Método | Rota | Possíveis status de retorno |
| - | - | - |
| POST | /beer_styles | 201, 400, 500 |
| GET | /beer_styles | 200, 500 |
| GET | /beer_styles/:id | 200, 404, 500 |
| PUT | /beer_styles/:id | 200, 400, 404, 500 |
| DELETE | /beer_styles | 200, 404, 500 |
| POST | /beer_styles | 204, 500 |
| POST | /beer_styles | 200, 404, 500 |

## Conexão com Spotify

As credenciais do Spotify podem ser obtidas através do link *https://developer.spotify.com/dashboard/*. É necessário efetuar login com uma conta Spotify e criar um projeto para obter o CLIENT e o SECRET IDs.

Além do retorno padrão descrito na documentação da API, existem dois possíveis casos a serem retornados pela API do Spotify, descritos abaixo:

1 Nenhuma playlist encontrada
```json
{
  "beerStyle": "some beer style",
  "playlist": {
    "status": 204,
    "message": "No playlist found!"
  }
}
```

2. Erro na consulta de dados: ocorre quando a API do Spotify retorna um status diferente de sucesso (200) na consulta
```json
{
  "beerStyle": "some beer style",
  "playlist": {
    "status": 500,
    "message": "Error on playlist search!",
  }
}
```