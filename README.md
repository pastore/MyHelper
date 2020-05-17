# MyHelper

The open source project built in order to help people organize and plan their affairs and tasks.
In future plan to make social network from one.

[![Build Status](https://dev.azure.com/PavloHrudiev/MyHelper/_apis/build/status/pastore.MyHelper?branchName=master)](https://dev.azure.com/PavloHrudiev/MyHelper/_build/latest?definitionId=1&branchName=master) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pastore_MyHelper&metric=alert_status)](https://sonarcloud.io/dashboard?id=pastore_MyHelper)

**Live demo**
----------------
[myhelper.life](https://myhelper.life)

**Technologies**
----------------
1. ASP.NET Core 3.1
2. Angular 9
3. Angular Material
4. Postgres 10
5. Nginx
6. Linux
7. Entity Framework Core
8. RabbitMQ and MassTransit
9. Docker

**Quick start**
----------------
1) **Docker**
   1. Make sure that Docker is installed
   2. Open terminal and type 
        - docker-compose build
        - docker-compose run start-dependencies
        - docker-compose up

2) **Manually**

    **ASP.NET Core**

    1. Make sure that **ASP Core 3.1** is installed 
    2. Make sure that **Postresql 10** is installed 
    3. Clone or fork repository
    4. Make sure that you in **MyHelper.API** folder
    5. Open cmd and type => dotnet restore
    6. Update database , in cmd type => 
        - dotnet ef database update
    7. In cmd type => dotnet run 

    **Angular 9**

    1. Make sure that you in **MyHelper.ClientApp** folder
    2. Open cmd and type => npm install
    3. Add url your server to environment.ts file
    4. In cmd type npm run open

    **RabbitMQ and MassTransit**

    1. Make sure that Erlang is installed
    2. Make sure that RabbitMQ is installed
    3. Install MassTransit.RabbitMQ =>
        - PM> Install-Package MassTransit.RabbitMQ.

**Contribution**
----------------

If you want to join and practice on new technologies.
You are welcome!
