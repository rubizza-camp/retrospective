# Retrospective

## Development instructions

1. Install docker:  [docker engine install](https://docs.docker.com/engine/install/ "docker engine install")


2. Install docker-compose: [docker compose install](https://docs.docker.com/compose/install/ "docker compose install")


3. Clone the project: https://github.com/cybergizer-hq/retrospective

4. Prepare:
``` bash
docker-compose run runner bundle install
docker-compose run runner yarn install
```

5. Create and setup postgres db:
```
docker-compose run runner bundle exec rails db:create db:setup
RAILS_ENV=test docker-compose run runner bundle exec rails db:create db:setup
```

6. Run app:
``` bash
docker-compose up -d rails
docker-compose up -d webpacker
```

run Rails console if needed:
```
docker-compose run runner
```

7. In order to skip Alfred login and login with the first seed user
   put `SKIP_ALFRED=true` in your .env file

8. Run specs:
```
RAILS_ENV=test docker-compose run runner bundle exec rspec
```
