# Nest JS Boilerplate

This is a [Nest Js](https://github.com/nestjs/nest) project configured for use with Docker

## Installation

Ensure also that [Docker is installed](https://docs.docker.com/engine/install) on your work station



## Using Docker


## Using Docker Compose
```sh
# Build the docker image
$ docker-compose build

# Start and login to the container
$ docker-compose up -d
$ docker-compose exec app sh
```

## Other useful Docker commands
```sh
# Get the container ID
$ docker ps

# View logs
$ docker logs <container id>

# Enter the container (In alpine, use sh because bash is not installed by default)
$ docker exec -it <container id> /bin/sh
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


## Maintain following directory structure

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
