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
                "identifier": "cc9897"
            },
            {
                "identifier": "4c2eff"
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
	"name":"jhon snow",
	"age":21,
	"sexo":"masculino",
	"patologia":"patologia exemplo2",
	"objetivo": "recuperar o movimento da mao direita"
}
```
##### Response
```json
{
    "message": "dany added pacient jhon snow",
    "pacient_identifier": "77584",
    "success": true
}
```
#### Add games to pacient's list
```http
PUT /api/user/pacients/games/:identifier
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
    "toPlay":1,
	"config":"mao direita",
	"ordem":1
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
DELETE /api/user/pacients/:identifier
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
PUT /api/user/pacients/:identifier
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
	"name":"dany targeryan",
    "sexo":"indefinido",
    "age": 24,
    "active": false,
    "objetivo": "be the queen of westeros",
    "patologia": "idk"
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
GET /api/user/pacients/?:identifier
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
            "active": true,
            "_id": "5b7b74c9135f2613f4feb88d",
            "name": "jhon snow danyyy",
            "age": 21,
            "sexo": "feminino",
            "patologia": "patologia exemplo2",
            "objetivo": "recuperar o movimento da mao direita",
            "identifier": "cc9897",
            "medic": "5b7b718e135f2613f4feb88c",
            "games": [
                {
                    "idToPlay": "a4093e70-a4e7-11e8-9515-1f7ad2d13f37"
                }
            ],
            "__v": 0
        },
        {
            "active": true,
            "_id": "5b7b74d4135f2613f4feb88e",
            "name": "danyyy targeryan",
            "age": 21,
            "sexo": "feminino",
            "patologia": "patologia exemplo2",
            "objetivo": "recuperar o movimento da mao direita",
            "identifier": "4c2eff",
            "medic": "5b7b718e135f2613f4feb88c",
            "games": [
                {
                    "idToPlay": "ae83e440-a4e7-11e8-9515-1f7ad2d13f37"
                }
            ],
            "__v": 0
        }
    ],
    "success": true
}
```
#### Remove pacient game
```http
PUT /api/user/pacients/games/:pacientid/:gameid
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
}
```
##### Response
```json
{
    "message": "Jogo removido",
    "success": true
}
```
##### Get games
```http
GET /api/user/games
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
            "date": null,
            "score": null,
            "error": null,
            "time": null,
            "played": false,
            "_id": "5b7b7577135f2613f4feb892",
            "pacient": "acaf3f",
            "title": "Jogo da maca",
            "gameID": 1,
            "config": "mao direita",
            "ordem": 1,
            "medic": "5b7b715c135f2613f4feb88a",
            "idToPlay": "e7323cb0-a4e7-11e8-9515-1f7ad2d13f37",
            "__v": 0
        },
        {
            "date": null,
            "score": null,
            "error": null,
            "time": null,
            "played": false,
            "_id": "5b7b75c5135f2613f4feb894",
            "pacient": "b9463f",
            "title": "Jogo da maca",
            "gameID": 1,
            "config": "mao direita",
            "ordem": 1,
            "medic": "5b7b715c135f2613f4feb88a",
            "idToPlay": "159bf370-a4e8-11e8-9515-1f7ad2d13f37",
            "__v": 0
        }
    ],
    "success": true
}
```
##### Get pacient games
```http
GET /api/user/games/:pacientid
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
            "date": null,
            "score": null,
            "error": null,
            "time": null,
            "played": false,
            "_id": "5b7b7577135f2613f4feb892",
            "pacient": "acaf3f",
            "title": "Jogo da maca",
            "gameID": 1,
            "config": "mao direita",
            "ordem": 1,
            "medic": "5b7b715c135f2613f4feb88a",
            "idToPlay": "e7323cb0-a4e7-11e8-9515-1f7ad2d13f37",
            "__v": 0
        }
    ],
    "success": true
}
```
## Pacient endpoint

#### Authentication
```http
POST /api/pacient/auth
```
```json
{
	"identifier":"4c2eff"
}
```
##### Response
```json
{
    "message": "Paciente paciente de teste logado",
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYWNpZW50X2lkIjoiNWI2OGFlNTgyNDRjYmUwM2M4MjYwOTU5IiwibWVkaWNfaWQiOiI1YjY4YWRhZTI0NGNiZTAzYzgyNjA5NTgiLCJpZGVudGlmaWVyIjoiY2Q0MDQiLCJpYXQiOjE1MzM2ODk3MDAsImV4cCI6MTUzMzc3NjEwMH0.mvM1vQJGM_ENkk8DnOitS_Zn-WXCOWLTKJ2Noz20VBU",
    "data": {
        "identifier": "4c2eff"
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
    "data": {
        "active": true,
        "_id": "5b7b74d4135f2613f4feb88e",
        "name": "danyyy targeryan",
        "age": 21,
        "sexo": "feminino",
        "patologia": "patologia exemplo2",
        "objetivo": "recuperar o movimento da mao direita",
        "identifier": "4c2eff",
        "medic": "5b7b718e135f2613f4feb88c",
        "games": [
            {
                "idToPlay": "ae83e440-a4e7-11e8-9515-1f7ad2d13f37"
            }
        ],
        "__v": 0
    },
    "success": true
}
```
#### Get games
```http
GET /api/pacient/games
```
```json
{
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYWNpZW50X2lkIjoiNWI3Yjc0YzkxMzVmMjYxM2Y0ZmViODhkIiwiaWRlbnRpZmllciI6ImNjOTg5NyIsImlhdCI6MTUzNDg4NjU0OSwiZXhwIjoxNTM0OTcyOTQ5fQ.MvIgxzS549SvLLgdaNucoYfDYigLqK7KxlwTj4AycgI",
}
```
##### Response
```json
{
    "data": [
        {
            "date": "2018-08-21T21:34:40.680Z",
            "score": 22,
            "error": 3,
            "time": 33,
            "played": true,
            "_id": "5b7b7518135f2613f4feb890",
            "pacient": "4c2eff",
            "title": "Jogo da maca",
            "gameID": 1,
            "config": "mao direita",
            "ordem": 1,
            "medic": "5b7b718e135f2613f4feb88c",
            "idToPlay": "ae83e440-a4e7-11e8-9515-1f7ad2d13f37",
            "__v": 0
        }
    ],
    "success": true
}
```

#### Play game (update game information)
```http
PUT /api/pacient/games
```
```json
{
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYWNpZW50X2lkIjoiNWI3Yjc0YzkxMzVmMjYxM2Y0ZmViODhkIiwiaWRlbnRpZmllciI6ImNjOTg5NyIsImlhdCI6MTUzNDg4NjU0OSwiZXhwIjoxNTM0OTcyOTQ5fQ.MvIgxzS549SvLLgdaNucoYfDYigLqK7KxlwTj4AycgI",
	"acertos": 22,
	"erros":3,
	"time":33,
	"idToPlay":"a4093e70-a4e7-11e8-9515-1f7ad2d13f37"
}
```
##### Response
```json
{
    "message": "Informações do jogo atualizado com sucesso",
    "success": true
}
```

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