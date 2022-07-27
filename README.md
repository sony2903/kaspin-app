# Kaspin-app

Kaspin-app is a simple CRUD with **3rd Party API**.


# Installation
install package

> npm i

setting config.js in config/config.json

>    "development":  {
>    "username":  "postgres",
>    "password":  YOUR PASSWORD,
>    "database":  "kaspin_development",
>    "host":  "127.0.0.1",
>    "dialect":  "postgres"
>   }
   Create Database

> sequelize db:create

Run Migration

> sequelize db:migrate

Create .env from .env_temp

>    PORT=
>    PRIVATEKEY=
>    API=

Run application

> npm run start

## Endpoint
**--- Create Account first ---**

**Register**
Endpoint : localhost:port/user
Method : **POST**

>    Req.body :
>    {
>    nama: ...,
>    password: ...
>    }

**Login**
Endpoint : localhost:port/login
Method : **POST**

>     Req.body :
>     {
>     nama: ...,
>     password: ...
>     }
>     
>     Result :
>     {
>     token: ..........................
>     }

**FindKotaById**
Endpoint: localhost:port/findbyid
Method: **POST**

>    Req.body :
>    {
>    id : ........
>    }
>    
>    Req.headers :
>    {
>    token : ............
>    }
>    
>    Result :
>    {
>    status: "data",
>    data: [...], [...], .......
    
**FindKotaByKotaId**
Endpoint: localhost:port/findbykotaid
Method: **POST**

>    Req.body :
>    {
>    kota_id : ........
>    }
>    
>    Req.headers :
>    {
>    token : ............
>    }
>    
>    Result :
>    {
>    status: "data",
>    data: [...], [...], .......
>    }
