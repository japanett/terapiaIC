# API service for my Undergraduate Research project

<p align="center">
  <img src="https://raw.githubusercontent.com/japanett/clashAPI/master/app_v2.png">
</p>

I also developed the Front-End (Ionic 3) that this API feeds. 
It's repository is right <a href="https://github.com/japanett/appTerapia" target="_blank">here</a>.

## Endpoints:

Admin
- POST api/admin/login
- PATCH api/admin/users/reset-passwords
- GET api/admin/users

Paciente
- GET api/pacient
- POST api/pacient/auth
- PUT api/pacient/games

Terapeuta
- POST api/auth
- GET api/user
- PUT api/user
- POST api/user/create
- DELETE api/user/delete
- PATCH api/user/change-password
- GET api/user/:email/recover-password

- POST api/user/pacients
- GET api/user/pacients/:id/games
- GET api/user/pacients/?:identifier
- PUT api/user/pacients/:identifier
- DELETE api/user/pacient/:identifier

- GET api/user/:id/games/:id
- PATCH api/user/:id/games/:id
- DELETE api/user/:id/games/:id

- PUT api/user/games/pacientId
- PUT api/user/:pacientId/games/:id
- PUT api/user/pacients/games/:identifier


## Pacient endpoints

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
#### Get Pacient
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
        "_id": "5bc785c54110140046e71ead",
        "name": "Daenrys targeryan",
        "age": 19,
        "sexo": "feminino",
        "patologia": "Too hot dragon",
        "objetivo": "Be the queen of westeros",
        "identifier": "742ef2",
        "medic": "5bc774959f38ab00301c3f68",
        "games": [
            {
                "gameID": "3",
                "config": "1,2,3",
                "title": "Bola na Caixa",
                "time":"",
                "imersiveMode": true,
            },
            {
                "gameID": "1",
                "config": "1,2,3,T",
                "title": "Jogo da Mercearia",
                "time":"540",
                "imersiveMode": false,
            }
        ],
        "__v": 0
    },
    "success": true
}
```
#### Play game
```http
PUT /api/pacient/games
```
```json
{
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYWNpZW50X2lkIjoiNWJjNzg1YzU0MTEwMTQwMDQ2ZTcxZWFkIiwiaWRlbnRpZmllciI6Ijc0MmVmMiIsImlhdCI6MTUzOTgyMTQzOCwiZXhwIjoxNTM5OTA3ODM4fQ.ZEadUaCky1aLtMS5PltIg-zgBkE067mvmrgJ9yOpMqo",
	"config":"1,2,3",
	"score": {
		"esquerda":2,
		"direita": 3,
		"cruzada": 5
	},
	"erros":{
		"esquerda":3,
		"direita": 4,
		"cruzada": 6
	},
	"time":180,
    "gameID":1,
    "imersiveMode": false,
}
```
##### Response
```json
{
    "message": "",
    "success": true
}
```

## User endpoint

#### Create new user
```http
POST /api/user/create
```
```json
{
	"name":"Jhon Daenerys Snow",
	"login":"dany",
	"password":"6@Six",
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
	"password":"6@Six"
}
```
##### Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
    "success": true
}
```
#### Export DB to CSV
```http
GET /api/user/report
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
}
```
##### Response
```json
{
    "message": "CSV ENVIADO COM SUCESSO",
    "success": true,
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
POST /api/user/pacients
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
PUT /api/user/pacients/games/:pacientIdentifier
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
    "toPlay":1,
    "config":"1,2,3",
    "time":"540",
    "imersiveMode":true
}
```
##### Response
```json
{
    "message": "Adicionado jogos para o Paciente: 77584",
    "success": true
}
```
#### Update Pacient Game Config
```http
PUT /api/user/games/:pacientIdentifier
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
    "gameID":1,
    "config":"3,2,1",
    "time":"540",
    "imersiveMode":false
}
```
##### Response
```json
{
    "message": "Jogo atualizado",
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
            "_id": "5bc785c54110140046e71ead",
            "name": "Daenrys targeryan",
            "age": 19,
            "sexo": "feminino",
            "patologia": "Too hot dragon",
            "objetivo": "Be the queen of westeros",
            "identifier": "742ef2",
            "medic": "5bc774959f38ab00301c3f68",
            "games": [
                {
                    "time": "300",
                    "imersiveMode": true,
                    "gameID": "2",
                    "config": "1,2,3",
                    "title": "Invasão Espacial"
                },
                {
                    "time": "300",
                    "imersiveMode": false,
                    "gameID": "1",
                    "config": "1,2,3",
                    "title": "Jogo da Mercearia"
                }
            ],
            "__v": 0
        },
        {
            "active": true,
            "_id": "5bc78fc6301d7300722b6fd1",
            "name": "Jhon Snow targeryan",
            "age": 19,
            "sexo": "masculino",
            "patologia": "Too hot dragon",
            "objetivo": "Be the queen of westeros",
            "identifier": "4963a4",
            "medic": "5bc774959f38ab00301c3f68",
            "games": [],
            "__v": 0
        }
    ],
    "success": true
}
```
#### Remove pacient game of list to play
```http
PUT /api/user/:pacientidentifier/games/:gameID
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
##### Get pacient's played games report
```http
GET /api/user/pacients/:identifier/games
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
            "score": {
                "esquerda": 2,
                "direita": 3,
                "cruzada": 5
            },
            "error": {
                "esquerda": 3,
                "direita": 4,
                "cruzada": 6
            },
            "date": "2018-10-18T00:01:04.685Z",
            "time": 180,
            "_id": "5bc7cd40199b27003ef33692",
            "pacient": "742ef2",
            "title": "Bola na Caixa",
            "gameID": 3,
            "config": "1,2,3",
            "imersiveMode": true,
            "observation":"observacao feita pelo medico"
            "__v": 0
        }
    ],
    "success": true
}
```
##### Delete game report
```http
DELETE /api/user/:pacientIdentifier/games/:gameId
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
}
```
##### Response
```json
{
    "success": true
}
```
#### Set game report observation
```http
PATCH /api/user/:pacientIdentifier/games/:gameId
```
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
    "observation":"teste mudanca"   
}
```
##### Response
```json
{
    "message": "Game observation updated",
    "success": true
}
```
## Observations
- mao esquerda = 1
- mao direita = 2
- mao cruzada = 3

## To do:
- Refactor and redesign everything, this s*** is ugly
- Bug hunt

## Fix:
- (Create user) Sending email even when the request response != 201
- A user can delete another user's pacient