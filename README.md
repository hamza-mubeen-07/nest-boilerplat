
##Setup
1. Duplicate example env

2. Build your image
```
docker-compose build
```
3. Setup container for the image
```
docker-compose up -d
```

##Package Installations
Updating packages added by the peers. (This will install/update packages according to the updated package lock)
```
npm ci
```
> Prefer running these commands inside the container. Initially/rerunning the container  will also trigger this.

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
npm run resetDb
```

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

### Each module will have its own directory under ``src`` i.e to achieve micro-service architecture
```bash
# <repo-root>/src/user
# <repo-root>/src/country
# <repo-root>/src/category
# <repo-root>/src/activity
```

### ORM Prisma will be managed outside the ``src`` , so that it will be available globally and will have following DIR Structure 
```bash
# <repo-root>/prisma/models/<models>
# <repo-root>/prisma/repositories/<repositories>
# <repo-root>/prisma/migrations/<migrations>
# <repo-root>/prisma/seeders/<seeders>
```

## License
[MIT licensed](LICENSE)
