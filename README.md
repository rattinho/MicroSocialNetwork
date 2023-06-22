# SocialNasah

### Instalação via Docker
(Atualizado 2023)

##### 1. Buildar container

```sh
docker build -t socialnasah .
```

##### 2. Criar volume
```sh
docker volume create app-socialnasah-vol
```

##### 5. Iniciar container
```sh
docker run -d -p 3000:3000 --name SocialNasah -v app-socialnasah-vol:/app/dados socialnasah
```
