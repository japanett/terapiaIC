# API service for my Undergraduate Research project
## This project is intended to rehabilitate kids motor functions through virtual games, which are being developed by a physiotherapist and a group of students using Leap Motion. My part is to receive data from the game and display it to the physiotherapist. 

## Documentation

#### User endpoint
#### Create a new user(medic)
```http
POST /api/user/create --creates new user(medic)
```
```
{
	"name":{
		"first":"zoka",
		"last":"japanet"
	},
	"login":"etnapaj",
	"password":"123@teste",
	"email":"etnapaj@gmail.com"
}
```
##### Response
```
{
    "message": "Terapeuta zoka japanet criado.",
    "success": true,
    "login": "etnapaj"
}
```
#### User authentication
```http
POST /api/auth
```
```
{
	"login":"etnapaj",
	"password":"123@teste"
}
```
##### Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
    "success": true,
    "data": {
        "login": "etnapah",
        "id": "5b5a8a00af3a90114cbb00ee"
    }
}
```
#### Update user information
```http
PUT /api/user
```
```
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
	"name":{
		"first":"new",
		"last":"name"
	},
	"login":"login2",
	"password":"n3Wp4sS",
	"email":"n3W3M4aiL@gmail.com"
}
```
##### Response
```
{
    "message": "Atualizado com sucesso",
    "success": true
}
```
#### Get user information
```http
GET /api/user
```
```
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
}
```
##### Response
```
{
  "data": {
  "name":{
    "first":"zoka",
    "last":"japanet"
   },
  "login":"etnapaj",
  "password":"123@teste",
  "email":"etnapaj@gmail.com",
  "_id": "5b5a8a00af3a90114cbb00ee",
  "password": "62256e3e61d93f25aa1a83a2ae1035da",
  "email": "gabrielkenzo@gmail.com",
  "pacients": [],
  "__v": 0
  },
  "success": true
}
```
#### Delete user
```http
DELETE /api/user/delete
```
```
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
}
```
##### Response
```
{
    "success": true
}
```
#### Create pacient
```http
PUT /api/user/pacients
```
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
	"name":{
    "first":"paciente",
    "last":"teste"
  },
  "age":7,
  "sexo":"femenino",
  "patologia":"patologia exemplo",
  "objetivo": "objetivo do paciente"
}
```
##### Response
```
{
  "message": "etenapaj added pacient paciente teste",
  "pacient_identifier": "c2d3b",
  "success": true
}
```
#### Add games to pacient's list
```http
PUT /api/user/pacients/games/c2d3b(pacient identifier)
```
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
"toPlay":1(id of the game to be played"
}
```
##### Response
```
{
    "message": "Adicionado jogos para o Paciente: c2d3b",
    "success": true
}
```
#### Delete pacient
```http
DELETE /api/user/pacients/c2d3b(pacient identifier)
```
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
}
```
##### Response
```
{
    "message": "Paciente excluído",
    "success": true
}
```
#### !!! FIX- ta quebrando,Update Pacient
```http
PUT /api/user/pacients/c2d3b(pacient identifier)
```
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
  "name":{
    "first":"tete",
		"last":"dede"
	},
  "age":7,
	"sexo":"femenino",
	"patologia":"patologia exemplo",
	"objetivo": "objetivo do paciente",
	"active":true
}
```
##### Response
```
{
    "message": "Paciente atualizado com sucesso",
}
```
#### Get pacient information
```http
GET /api/user/pacients/c2d3b(pacient identifier)
```
```http
GET /api/user/pacients/ (all pacients)
```
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg"
}
```
##### Response
```
{
    "data": [
        {
            "name": {
                "first": "paciente",
                "last": "teste"
            },
            "medic": {
                "id": "5b5a8a00af3a90114cbb00ee"
            },
            "games": {
                "gameMaca": []
            },
            "_id": "5b5a9bb8b56111060cc28f87",
            "age": 7,
            "sexo": "femenino",
            "patologia": "patologia exemplo",
            "objetivo": "objetivo do paciente",
            "identifier": "c2d3b",
            "toPlay": [
                {
                    "gameID": 1
                }
            ],
            "__v": 0
        }
    ],
    "success": true
}
```
#### FIX--Remove pacient game of toPlay list - ta vindo undefined*
```http
PUT /api/user/pacients/games/delete/c2d3b (pacient identifier)
```
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImJsZW8iLCJpZCI6IjViNWE4YTAwYWYzYTkwMTE0Y2JiMDBlZSIsImlhdCI6MTUzMjY2MTUyNCwiZXhwIjoxNTMyNzQ3OTI0fQ.7fZ_vieDKgpi_hVSCX1__mTlpZQ6KgvmcvBYjUl7qVg",
  "toPlay":1
}
```
##### Response
```
{
    "message": "Removido jogo undefined do paciente: c2d3b",
    "success": true
}
```
#falta fazer as rotas do pacient
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
- A user can delete another user's pacient
- toPlay[] can have duplicate gameID's