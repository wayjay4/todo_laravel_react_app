# Todo App

A Todo demo application to illustrate Laravel with Inertia/React using Docker.

![TodoApp_screenshot.png](public/images/TodoApp_screenshot.png)

Backend Framework:
- **Laravel v10.40.0 (PHP v8.3.1):** https://laravel.com/docs/10.x/installation#docker-installation-using-sail
  with Docker, Breeze, Inertia, React, and PHP Unit testing scaffolding

Frontend Framework:
- **React v8.2.0:** https://react.dev/

Frontend installed packages:
- **Prop Types (typechecking):** https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
- **React Transition Group (defining entering and exiting transitions):** https://reactcommunity.org/react-transition-group/

Note: using client-side local storage to save todo data in this version.

## Installation

Install Docker (v4.26.1)

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

Install PHP dependencies (composer v2.6.6):

```sh
sail composer install
```

Install NPM dependencies (npm v10.3.0):

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

You're ready to go! Visit Todo App in your browser:

http://localhost

