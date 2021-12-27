# Retrospective

## Development instructions

1. Install docker:  [docker engine install](https://docs.docker.com/engine/install/ "docker engine install")


2. Install docker-compose: [docker compose install](https://docs.docker.com/compose/install/ "docker compose install")

(Docker Desktop for Windows and Mac includes Compose along with other Docker apps, so Windows and Mac users do not need to install Compose separately.)

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

6. Add .env file to the root folder
```
DATABASE_URL=postgres://user:password@postgresql:5432/retrospective_development?max_connections=5
DATABASE_CLEANER_ALLOW_REMOTE_DATABASE_URL=true
```

In order to skip Alfred login and login with the first seed user put `SKIP_ALFRED=true` in your .env file also

7. For Mac M1 users:

   Change line 

   >config.file_watcher = ActiveSupport::EventedFileUpdateChecker

   to

   >config.file_watcher = ActiveSupport::FileUpdateChecker

   Add to docker-compose.yml

   services.app.rails:

   >platform: linux/amd64


8. Run app:
``` bash
docker-compose up -d rails
docker-compose up -d webpacker
```

run Rails console if needed:
```
docker-compose run runner
```

9. Run specs:
```
RAILS_ENV=test docker-compose run runner bundle exec rspec
```
