# Guide

## First run

1. Install [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).
2. Clone this repository.
3. Run `docker-compose up --build` in the root directory of this repository.
4. Open `localhost:3000` in your browser.

# Running in general

1. Run `docker-compose up` in the root directory of this repository.
2. Open `localhost:3000` in your browser.

# Seeding to database

1. Run `docker-compose exec {backend_container_name} npm run seed` in the root directory of this repository.
2. Wait until seeding is done.

Example: `docker-compose exec aaim2111_backend_1 npm run seed`
