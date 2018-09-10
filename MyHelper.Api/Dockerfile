FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 5000/tcp

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
ENV ASPNETCORE_URLS=http://+:5000
COPY MyHelper.Api.csproj MyHelper.Api/
RUN dotnet restore MyHelper.Api/MyHelper.Api.csproj
WORKDIR /src/MyHelper.Api
COPY . .
RUN dotnet build MyHelper.Api.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish MyHelper.Api.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .

ENTRYPOINT ["dotnet", "MyHelper.Api.dll" , "--urls", "http://*:5000", "--environment", "Docker"]
