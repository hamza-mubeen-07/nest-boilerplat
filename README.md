##Setup "LIVE"
1. Setup env according to example file
2. Build your image using "docker/docker-compose-prod.yml"
3. Now run your container.

##Setup "LOCAL"
1. Duplicate example env
2. Build your image
```
docker-compose -f docker-compose-local.yml build
```
> In case of build errors use "--no-cache" flag.
3. Setup container for the image
```
docker-compose -f docker-compose-local.yml up -d
```
4. To build and run at the same time use this
```
docker-compose -f docker-compose-local.yml up --build -d
```
5. RUN this first time and on each lock changes made by the peers to create/update node_modules on host
```
npm ci
```
6. Only in case of external db, remove deploy command from compose file, put migration folder in gitignore and run this command inside container.
```
npx prisma migrate dev
```
> Please DON'T run in this in production!!!

##Package Installations
For installing packages use (This will install packages and update both package files)
```
npm i <package>
```
> Always review package-lock.json changes before committing.

##Migrations and seeding
First make your changes to the model then run this command.

Make sure to provide a proper name to this migration. (run in container)
```
npx prisma migrate dev --name <name>
```
To reset DB run (this will drop, rerun migrations and then seed local db)
```
npx prisma migrate reset
```
> NEVER RUN THIS FOR PRODUCTION!!!

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker useful commands
```sh

# Prune (ask DevOps first)
$ docker system prune --volumes

# Login to the container
$ docker-compose exec app sh

# Get the container ID
$ docker ps

# View logs
$ docker logs <container id>

# Enter the container (In alpine, use sh because bash is not installed by default)
$ docker exec -it <container id> /bin/sh
```

## Directory structure

#### Each module will have its own directory under ``src`` i.e to achieve micro-service architecture

```bash
# <repo-root>/src/<app-module>
```

#### ORM Prisma will be managed outside the ``src`` , so that it will be available globally and will have following DIR Structure
```bash
# <repo-root>/prisma/models/<models>
# <repo-root>/prisma/repositories/<repositories>
# <repo-root>/prisma/migrations/<migrations>
# <repo-root>/prisma/seeders/<seeders>
```

## How deployments are working

All deployment related files are present in docker directory.
- Compose files includes configuration for required containers.
- Docker files includes information about building app.
- Nginx folder contains all configs that will be copied to nginx container. (make sure to change domain links)

## Update
Update package version information in package.json  
```
npx npm-check-updates "/nestjs*/" -u
```
Don't use "--legacy-peer-deps" or "--force" flag. Make your changes to package file according to the error displayed.
