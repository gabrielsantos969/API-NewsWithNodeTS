# API News
![Badge in Production](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)
![Badge in Version](http://img.shields.io/static/v1?label=Versão&message=1.0.0&color=GREEN&style=for-the-badge)

> ### This is an API created for learning purposes which simulates a news CRUD.

>[!WARNING]
> The link below takes you to the same README but in Portuguese.
>
>[README in Portuguese](README_PT)

## Tools 🛠️

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-00000F?style=flat&logo=mysql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)
![Git](https://img.shields.io/badge/-Git-E34F26?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-100000?style=flat&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/-Visual%20Studio%20Code-333333?style=flat&logo=visual-studio-code&logoColor=007ACC)

## Recommendations 💡

>[!IMPORTANT]
>
> It is recommended that you have the tools below and the project installed on your machine, so that it works correctly:
>
> - Mysql 8.0
> - Node 18
> - Visual Studio or another IDE
> - git 2.43.0
> - Postman

## Get project 📥

> Open your git bash in a folder of your choice and paste the command below to have the project on your computer.

``` bash
git clone https://github.com/gabrielsantos969/API-InventoryManagementSystemTS.git
```

## Contribute to the Project 

> You can contribute to this project at any time with code improvements or necessary implementations.
>
>If you don't know how to do it, below is a link to a post on Linkedin that I made, with the aim of showing you step by step how to contribute to any project.
>
> 🔗 [How to contribute to a project on Github with Fork and Pull](https://www.linkedin.com/posts/gabriel-santos-b53632196_github-git-tecnologia-activity-7209626258278649856-g_wr?utm_source=share&utm_medium=member_desktop)

## Installation & Configuration ⚙️

### Installation 📥
> To start the project, perform the necessary installation with the command below which will install all the resources used in this project.

```bash
    npm install
```
---

### Configuration ⚙️

> Configure the port and host to run it in __.env__, if you don't add anything, it comes by default at __PORT=3000__ and __HOST=http://localhost__ in __[Server](src/server.ts)__.

```.env
PORT=
HOST=
```

---

> Configure the __.env__ to connect to your database, some information if not added is placed by default in __[Configuração Banco de Dados](src/config/connect.ts)__.

```.env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_PORT=
```

## Database

>[!IMPORTANT]
>
> It is recommended that you use MySQL as the database on which the scripts were created based on.
>
> Here is the installation link:  [MySQL Installer 8.0.37](https://dev.mysql.com/downloads/installer/ "https://dev.mysql.com/downloads/installer/")

> After installing MySQL and configuring the workbench to be able to use the database, run the scripts that are at the root of the project (__[Scripts](/scripts/)__) to have all the tables that the API has, so that it works correctly.

## Putting it to run 🎉

> We separate it to run in two ways, which is as dev and compiled.

### __Running in dev mode__ 🏃‍♂️💨
```bash
npm run dev
```

### Compiling project 📥
```bash
npm run build
```

### __Running in compiled mode__ 🏃‍♂️💨
```bash
npm run start
```

## API Routes:

### GET /v1/news
- Description: Returns a list with all registered news, page, total pages, message, status and success. There is a limitation of 50 pieces of data that it brings per page.
- Parameters: page. Ex: /v1/news?page=2
- Example answer:
```json
{
    "message": "2 news.",
    "success": true,
    "status": 200,
    "page": 2,
    "totalPages": 2,
    "prevPage": "/v1/news?page=1",
    "date": [
        {
            "id": 4,
            "title": "Borders 1",
            "description": " Lorem Ipsum passages, and more recently with desktop publishing software",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book .",
            "date_pub": "2024-07-04T13:48:43.000Z"
        },
        {
            "id": 5,
            "title": "Frontiers 3",
            "description": "Lorem Ipsum passages, and more recently with desktop publishing software",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book .",
            "date_pub": "2024-07-04T13:48:46.000Z"
        }
    ]
}
```

### GET /v1/news/getById/1
- Description: Returns the news requested according to the ID.
- Parameters: id - Number.
- Example answer:
```json
{
    "message": "News ID: 1 found.",
    "success": true,
    "status": 200,
    "date": [
        {
            "id": 1,
            "title": "Borders",
            "description": "Lorem Ipsum passages, and more recently with desktop publishing software",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book .",
            "date_pub": "2024-07-04T13:29:06.000Z"
        }
    ]
}
```

### GET /v1/news/getByTitle/Fron
- Description: Returns the news that was requested according to the title placed in the parameter.
- Parameters: title - String.
- Example answer:
```json
{
    "message": "News ID: 'Fron' found.",
    "success": true,
    "status": 200,
    "date": [
        {
            "id": 1,
            "title": "Borders",
            "description": "Lorem Ipsum passages, and more recently with desktop publishing software",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book .",
            "date_pub": "2024-07-04T13:29:06.000Z"
        }
    ]
}
```

### POST /v1/news
- Description: Registers a new news item in the database.
- Parameters: title - String, description - String, text - String, categoryIds - Number[].
- Example of body:
```json
{
    "date": {
        "title": "Frontiers 5",
        "description": "Lorem Ipsum passages, and more recently with desktop publishing software",
        "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book ."
    },
    "categoryIds": [1, 5, 9]
}
```
- Example answer:
```json
{
    "message": "News published successfully.",
    "success": true,
    "status": 201
}
```

### PUT /v1/news/update/2
- Description: Updates a news item according to the news ID and the chosen data, you can edit all or just one of the body fields below.
- Parameters: title - String, description - String, text - String, categoryIds - Number[].
- Example of body:
```json
{
    "date": {
        "title": "Frontiers 5",
        "description": "Lorem Ipsum passages, and more recently with desktop publishing software",
        "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book ."
    },
    "categoryIds": [1, 9]
}
```
- Example answer:
```json
{
    "message": "News updated successfully.",
    "success": true,
    "status": 200
}
```

### DELETE /v1/news/delete/2
- Description: Deletes a news item using its iID.
- Parameters: id - Number.
- Example answer:
```json
{
    "message": "News ID: 2 deleted successfully.",
    "success": true,
    "status": 200
}
```

# Author
|Nome|Email|Function|Course|
| -------- | --------  |-------- | -------- |
|Gabriel Santos|gabrielsantos98898@gmail.com|Back-end|Computer Science|


[<img src="https://github.com/gabrielsantos969.png" width=115 > <br> <sub> Gabriel Santos </sub>](https://github.com/gabrielsantos969) |
| :---: |  

[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/gabrielsantos969)](https://github.com/gabrielsantos969)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabriel-santos-b53632196/)](https://www.linkedin.com/in/gabriel-santos-b53632196/)