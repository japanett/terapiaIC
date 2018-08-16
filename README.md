# API service for my Undergraduate Research project
## This project is intended to rehabilitate kids motor functions through virtual games, which are being developed by a physiotherapist and a group of students using Leap Motion. My part is to receive data from the game and display it to the physiotherapist through a mobile application that is being developed using Ionic Framework. 

## Documentation

## User endpoint

#### Create new user
```http
POST /api/user/create
```
```json
{
	"name":"Jhon Daenerys Snow",
	"login":"dany",
	"password":"6@Nine",
	"email":"daenerys@targaryan.net"
}
```
##### Response
```json
{
    "message": "Terapeuta Jhon Daenerys Snow criado.",
    "success": true,
    "login": "etnapaj"
}
```
#### User authentication
```http
POST /api/auth
```
```json
{
	"login":"dany",
	"password":"6@Nine"
}
```
##### Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
    "success": true,
    "data": {
        "login": "dany",
        "id": "5b5a8a00af3a90114cbb00ee"
    }
}
```
#### Update user information
```http
PUT /api/user
```
```json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
	"name":"New Name",
	"email":"n3W3M4aiL@gmail.com"
}
```
##### Response
```json
{
    "message": "Atualizado com sucesso",
    "success": true
}
```
#### Get user information
```http
GET /api/user
```
```json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
}
```
##### Response
```json
{
    "data": {
        "_id": "5b73a0490af1fc31884e7c80",
        "login": "dany",
        "password": "62256e3e61d93f25aa1a83a2ae1035da",
        "email": "daenerys@targaryan.net",
        "name": "Jhon Daenerys Snow",
        "pacients": [
            {
                "active": false,
                "toPlay": [],
                "name": "marcos rio d ejaneiro",
                "identifier": "6c60a"
            },
            {
                "active": true,
                "toPlay": [
                    {
                        "config": "mao direita",
                        "ordem": 1,
                        "gameID": 1,
                        "idToPlay": "22b2d0b0-a042-11e8-a216-7bd1cd177fea"
                    },
                    {
                        "config": "mao esquerda",
                        "ordem": 2,
                        "gameID": 1,
                        "idToPlay": "25bd9fb0-a042-11e8-a216-7bd1cd177fea"
                    },
                    {
                        "config": "ambas",
                        "ordem": 3,
                        "gameID": 1,
                        "idToPlay": "2826d780-a042-11e8-a216-7bd1cd177fea"
                    }
                ],
                "name": "larissa hildebrand sux",
                "identifier": "77584"
            }
        ],
        "__v": 0
    },
    "success": true
}
```
#### Delete user
```http
DELETE /api/user/delete
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
}
```
##### Response
```json
{
    "message": "account dany deleted",
    "success": true
}
```
#### Create pacient
```http
PUT /api/user/pacients
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
	"name":"larissa hildebrand sux",
	"age":21,
	"sexo":"feminino",
	"patologia":"patologia exemplo2",
	"objetivo": "ser um creme"
}
```
##### Response
```json
{
    "message": "dany added pacient larissa hildebrand sux",
    "pacient_identifier": "77584",
    "success": true
}
```
#### Add games to pacient's list
```http
PUT /api/user/pacients/games/77584(pacient identifier)
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
    "toPlay":1,
    "config":"ambas",
	"ordem":3
}
```
##### Response
```json
{
    "message": "Adicionado jogos para o Paciente: 77584",
    "success": true
}
```
#### Delete pacient
```http
DELETE /api/user/pacients/77584  (pacient identifier)
```
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
}
```
##### Response
```json
{
    "message": "Paciente excluído",
    "success": true
}
```
#### Update Pacient
```http
PUT /api/user/pacients/6c60a(pacient identifier)
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
  	"name":"marcos rio d ejaneiro",
    "sexo":"indefinido",
    "age": 24,
    "active": false,
    "objetivo": "objetivo indefinido",
    "patologia": "nao sei"
}
```
##### Response
```json
{
    "message": "Paciente atualizado com sucesso",
    "success": true
}
```
#### Get pacient information
```http
GET /api/user/pacients/c2d3b(pacient identifier)
```
```http
GET /api/user/pacients/ (all pacients)
```
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
}
```
##### Response
```json
{
    "data": [
        {
            "medic": {
                "id": "5b73a0490af1fc31884e7c80"
            },
            "games": {
                "gameMaca": []
            },
            "active": false,
            "_id": "5b73a44d206c6d1e28788cd9",
            "name": "marcos rio d ejaneiro",
            "age": 24,
            "sexo": "indefinido",
            "patologia": "nao sei",
            "objetivo": "objetivo indefinido",
            "identifier": "6c60a",
            "toPlay": [],
            "__v": 0
        },
        {
            "medic": {
                "id": "5b73a0490af1fc31884e7c80"
            },
            "games": {
                "gameMaca": []
            },
            "active": true,
            "_id": "5b73a9500499502f08187d36",
            "name": "larissa hildebrand sux",
            "age": 21,
            "sexo": "feminino",
            "patologia": "patologia exemplo2",
            "objetivo": "ser um creme",
            "identifier": "77584",
            "toPlay": [
                {
                    "ordem": 1,
                    "gameID": 1,
                    "config": "mao direita",
                    "idToPlay": "22b2d0b0-a042-11e8-a216-7bd1cd177fea"
                },
                {
                    "ordem": 2,
                    "gameID": 1,
                    "config": "mao esquerda",
                    "idToPlay": "25bd9fb0-a042-11e8-a216-7bd1cd177fea"
                },
                {
                    "ordem": 3,
                    "gameID": 1,
                    "config": "ambas",
                    "idToPlay": "2826d780-a042-11e8-a216-7bd1cd177fea"
                }
            ],
            "__v": 0
        }
    ],
    "success": true
}
```
#### FIX--Remove pacient game of toPlay list
```http
PUT /api/user/pacients/games/delete/77584 (pacient identifier)
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
    "gameid":"2826d780-a042-11e8-a216-7bd1cd177fea"
}
```
##### Response
```json
{
    "message": "Removido jogo undefined do paciente: 775484",
    "success": true
}
```

## User endpoint

#### Pacient authentication
```http
POST /api/pacient/auth
```
```json
{
	"identifier":"cd404"
}
```
##### Response
```json
{
    "message": "Paciente paciente de teste logado",
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYWNpZW50X2lkIjoiNWI2OGFlNTgyNDRjYmUwM2M4MjYwOTU5IiwibWVkaWNfaWQiOiI1YjY4YWRhZTI0NGNiZTAzYzgyNjA5NTgiLCJpZGVudGlmaWVyIjoiY2Q0MDQiLCJpYXQiOjE1MzM2ODk3MDAsImV4cCI6MTUzMzc3NjEwMH0.mvM1vQJGM_ENkk8DnOitS_Zn-WXCOWLTKJ2Noz20VBU",
    "data": {
        "medic_id": "5b68adae244cbe03c8260958",
        "identifier": "cd404"
    }
}
```
#### Get Pacient information
```http
GET /api/pacient/
```
```json
{
"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYWNpZW50X2lkIjoiNWI2OGFlNTgyNDRjYmUwM2M4MjYwOTU5IiwibWVkaWNfaWQiOiI1YjY4YWRhZTI0NGNiZTAzYzgyNjA5NTgiLCJpZGVudGlmaWVyIjoiY2Q0MDQiLCJpYXQiOjE1MzM4NTk0MzAsImV4cCI6MTUzMzk0NTgzMH0.Zq4ICbaTamUMUb5PiBR-9PVgminOI_CxUw4J_Fpn1qw"
}
```
##### Response
```json
{
    "data":  {
        "medic": {
            "id": "5b73a0490af1fc31884e7c80"
        },
        "games": {
               "gameMaca": []
            },
        "active": true,
        "_id": "5b73a9500499502f08187d36",
        "name": "larissa hildebrand sux",
        "age": 21,
        "sexo": "feminino",
        "patologia": "patologia exemplo2",
        "objetivo": "ser um creme",
        "identifier": "77584",
        "toPlay": [
            {
                "ordem": 1,
                "gameID": 1,
                "config": "mao direita",
                "idToPlay": "22b2d0b0-a042-11e8-a216-7bd1cd177fea"
            },
            {
                "ordem": 2,
                "gameID": 1,
                "config": "mao esquerda",
                "idToPlay": "25bd9fb0-a042-11e8-a216-7bd1cd177fea"
            },
            {
                "ordem": 3,
                "gameID": 1,
                "config": "ambas",
                "idToPlay": "2826d780-a042-11e8-a216-7bd1cd177fea"
            }
        ],
    },
    "success": true
}
```
#### Play game (put game information)
```http
PUT /api/pacient/games
```
```json
{
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYWNpZW50X2lkIjoiNWI2OGFlNTgyNDRjYmUwM2M4MjYwOTU5IiwibWVkaWNfaWQiOiI1YjY4YWRhZTI0NGNiZTAzYzgyNjA5NTgiLCJpZGVudGlmaWVyIjoiY2Q0MDQiLCJpYXQiOjE1MzM4NjQ2MjMsImV4cCI6MTUzMzk1MTAyM30.RyDWo4Hmaw2VRqvzz0qhaWpBt_BGU7r--eq6yZ39qPE",
	"gameID": 1,
    "seconds": 123,
    "acertos":25,
    "error": {
        "mao": 0,
        "caixa": 2
    }
}
```
##### Response
```json
{
    "message": "Informações do jogo Jogo da maçã para o paciente cd404 atualizada",
    "success": true
}

## User(medic) functionalities:
- CREATE pacient
- GET his own data
- GET pacients list
- GET single pacient data
- UPDATE user data
- UPDATE pacient data
- Set a game on the pacient's toPlay list
- Remove a game of the pacient's toPlay list
- DELETE pacient
- DELETE account

## Pacient functionalities:
- POST game information (play game)
- GET pacient data


## To do:
- Clean code
- Bug hunting

## Fix:
- (Create user) Sending email even when the request response != 201
- A user can delete another user's pacient
- Remove pacient game to play(not working)