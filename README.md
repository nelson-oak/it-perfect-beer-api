# Perfect Beer API

API desenvolvida para definir qual é a cerveja perfeita, de acordo com a temperatura.
Teste solicitado pela empres Be Growth.

## Entidades

| Entidades | Atributos |
| - | - |
| beer_style | id, name, minimum_temperature, maximum_temperature |


## Funcionalidades

- [ ] CRUD de estilos de cerveja (criar, editar, excluir, listar e importar via CSV)
- [ ] Retornar a cerveja ideal junto com uma playlist do Spotify, dada a temperatura
- [ ] Se houver mais de uma cerveja retornada, classificar por ordem alfabética
- [ ] Se não houver playlist do Spotify o status 204 na playlist

## Iniciando o projeto

Após clonar o projeto, é necessário atualizar as dependências.

### Comandos para atualizar e executar a aplicação

```bash
yarn
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
# Parar execução e emover o container
docker-compose down

# Parar execução (sem remover o container)
docker-compose stop

# Iniciar execução (com container já criado)
docker-compose start

# Reiniciar execução
docker-compose restart

# Verificar logs
docker logs nome_container -f

# Acessar container
docker exec -it perfect_beer_api /bin/bash
```

### Configurações adicionais

- Variáveis ambiente: criar arquivo *.env* com o conteúdo de *.env.example*, para utilizar as variáveis ambientes do sistema, preenchendo todos os valores necessários
- Banco de dados: criar arquivo *ormconfig.json* com o conteúdo de *ormconfig.example.json* e configurar com os dados de usuário e senha do banco de dados
- Se estiver usando o container do docker-compose, é necessário colocar o IP conforme o resultado do comando abaixo:
```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' perfect_beer_postgres
```
- No *docker-compose.yml* já tem um usuário e senha de banco de dados, caso sinta vontade, pode alterar para uma que preferir

## Recursos utilizados

- Express
- Typescript
- TDD com Jest
- Docker e Docker Compose
- Postgres
- TypeORM

## Rotas disponíveis

