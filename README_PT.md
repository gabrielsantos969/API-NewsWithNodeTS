# API News
![Badge concluido](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)
![Badge em Versão](http://img.shields.io/static/v1?label=Versão&message=1.0.0&color=GREEN&style=for-the-badge)

> ### Está é uma API criada no intuito de aprendizagem a qual simula um CRUD de noticias.

>[!WARNING]
> O link abaixo leva para o mesmo README só que na lingua inglesa.
>
>[README in English](README)

## Ferramentas 🛠️

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-00000F?style=flat&logo=mysql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)
![Git](https://img.shields.io/badge/-Git-E34F26?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-100000?style=flat&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/-Visual%20Studio%20Code-333333?style=flat&logo=visual-studio-code&logoColor=007ACC)

## Recomendações 💡

>[!IMPORTANT]
>
> É recomendável que você tenha as ferramentas abaixo e o projeto instalado em sua maquina, para que ele funcione de forma correta:
>
> - Mysql 8.0
> - Node 18
> - Visual Studio or another IDE
> - git 2.43.0
> - Postman

## Pegar projeto 📥

> Abra seu git bash em uma pasta de sua preferência e cole o comando abaixo para ter o projeto em seu computador.

``` bash
git clone https://github.com/gabrielsantos969/API-InventoryManagementSystemTS.git
```

## Contribua para o projeto

> Você pode contribuir com este projeto a qualquer momento com melhorias de código ou implementações necessárias.
>
>Se você não sabe como fazer, segue abaixo o link de um post no Linkedin que fiz, com o objetivo de mostrar passo a passo como contribuir em qualquer projeto.
>
> 🔗 [Como contribuir para um projeto no Github com Fork e Pull](https://www.linkedin.com/posts/gabriel-santos-b53632196_github-git-tecnologia-activity-7209626258278649856-g_wr?utm_source=share&utm_medium=member_desktop)

## Instalação e Configuração ⚙️

### Instalação 📥
> Para iniciar o projeto, execute a instalação necessária com o comando abaixo que irá instalar todos os recursos utilizados neste projeto.

```bash
    npm install
```
---

### Configuração ⚙️

> Configure a porta e o host para executá-lo em __.env__, se você não adicionar nada, ele vem por padrão em __SERVER_PORT=3000__ e __SERVER_HOST=http://localhost__ em __src/server.ts__.

```.env
PORT=
HOST=
```

---

> Configure o __.env__ para se conectar ao seu banco de dados, algumas informações, se não forem adicionadas, são colocadas por padrão em __src/config/connect.ts__.

```.env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_PORT=
```

## Banco de dados

>[!IMPORTANT]
>
> É recomendado que você use MySQL como banco de dados no qual os scripts foram criados.
>
> Aqui está o link de instalação:  [MySQL Installer 8.0.37](https://dev.mysql.com/downloads/installer/ "https://dev.mysql.com/downloads/installer/")

> Após instalar o MySQL e configurar o workbench para poder utilizar o banco de dados, execute os scripts que estão na raiz do projeto para ter todas as tabelas que a API possui, para que funcione corretamente.

## Colocando para funcionar🎉

> Separamos para rodar de duas formas, que é como dev e compilada.

### __Rodando no mode dev__ 🏃‍♂️💨
```bash
npm run dev
```

### Compilando projeto 📥
```bash
npm run compile
```

### __Rodando no modo de produção__ 🏃‍♂️💨
```bash
npm run start
```

## Rotas da API:

### GET /v1/news
- Descrição: Retorna uma lista com todas as noticias cadastradas, pagina, paginas totais, mensagem, status e success. A uma limitação de 50 dados que ele trás por pagina.
- Parêmetros: page. Ex: /v1/news?page=2
- Exemplo de resposta:
```json
{
    "message": "2 news.",
    "success": true,
    "status": 200,
    "page": 2,
    "totalPages": 2,
    "prevPage": "/v1/news?page=1",
    "data": [
        {
            "id": 4,
            "title": "Fronteiras 1",
            "description": " Lorem Ipsum passages, and more recently with desktop publishing software",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "date_pub": "2024-07-04T13:48:43.000Z"
        },
        {
            "id": 5,
            "title": "Fronteiras 3",
            "description": "Lorem Ipsum passages, and more recently with desktop publishing software",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "date_pub": "2024-07-04T13:48:46.000Z"
        }
    ]
}
```

### GET /v1/news/getById/1
- Descrição: Retorna a noticia a qual foi solicitada conforme o ID.
- Parêmetros: id - Number.
- Exemplo de resposta:
```json
{
    "message": "News ID: 1 found.",
    "success": true,
    "status": 200,
    "data": [
        {
            "id": 1,
            "title": "Fronteiras",
            "description": "Lorem Ipsum passages, and more recently with desktop publishing software",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "date_pub": "2024-07-04T13:29:06.000Z"
        }
    ]
}
```

### GET /v1/news/getByTitle/Fron
- Descrição: Retorna a noticia a qual foi solicitada conforme o titulo colocado no parâmetro.
- Parêmetros: title - String.
- Exemplo de resposta:
```json
{
    "message": "News ID: 'Fron' found.",
    "success": true,
    "status": 200,
    "data": [
        {
            "id": 1,
            "title": "Fronteiras",
            "description": "Lorem Ipsum passages, and more recently with desktop publishing software",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "date_pub": "2024-07-04T13:29:06.000Z"
        }
    ]
}
```

### POST /v1/news
- Descrição: Registra uma nova noticia no banco de dados.
- Parêmetros: title - String, description - String, text - String, categoryIds - Number[].
- Exemplo de body:
```json
{
    "data": {
        "title": "Fronteiras 5",
        "description": "Lorem Ipsum passages, and more recently with desktop publishing software",
        "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "categoryIds": [1, 5, 9]
}
```
- Exemplo de resposta:
```json
{
    "message": "News published successfully.",
    "success": true,
    "status": 201
}
```

### PUT /v1/news/update/2
- Descrição: Atualiza uma noticia comforme o ID da noticia e os dados escolhidos, você pode editar todos ou apenas um dos campos de body abaixo.
- Parêmetros: title - String, description - String, text - String, categoryIds - Number[].
- Exemplo de body:
```json
{
    "data": {
        "title": "Fronteiras 5",
        "description": "Lorem Ipsum passages, and more recently with desktop publishing software",
        "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    "categoryIds": [1, 9]
}
```
- Exemplo de resposta:
```json
{
    "message": "News updated successfully.",
    "success": true,
    "status": 200
}
```

### DELETE /v1/news/delete/2
- Descrição: Deleta uma noticia pelo seu iID.
- Parêmetros: id - Number.
- Exemplo de resposta:
```json
{
    "message": "News ID: 2 deleted successfully.",
    "success": true,
    "status": 200
}
```

# Autor
|Nome|Email|Função|Curso|
| -------- | --------  |-------- | -------- |
|Gabriel Santos|gabrielsantos98898@gmail.com|Back-end|Ciências da Computação|


[<img src="https://github.com/gabrielsantos969.png" width=115 > <br> <sub> Gabriel Santos </sub>](https://github.com/gabrielsantos969) |
| :---: |  

[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/gabrielsantos969)](https://github.com/gabrielsantos969)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabriel-santos-b53632196/)](https://www.linkedin.com/in/gabriel-santos-b53632196/)