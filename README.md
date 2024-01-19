# Todo App

A Todo demo application to illustrate Laravel with Inertia/React using Docker.

## Installation

Install Docker

https://www.docker.com/

Clone the repo locally:

```sh
git clone https://github.com/wayjay4/todo_laravel_react_app.git todoapp
cd todoapp
```

Start Docker Container

```sh
sail up
```

Install PHP dependencies:

```sh
sail composer install
```

Install NPM dependencies:

```sh
sail npm install
```

Build assets:

```sh
sail npm run build
```

Setup configuration:

```sh
cp .env.example .env
```

Generate application key:

```sh
sail artisan key:generate
```

Run database migrations:

```sh
sail artisan migrate
```

Run database seeder:

```sh
sail artisan db:seed
```

You're ready to go! Visit Todo App in your browser:

http://localhost

