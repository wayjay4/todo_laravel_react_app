# Todo App

A Todo demo application to illustrate Laravel with Inertia/React.

![TodoApp_screenshot.png](public/images/TodoApp_screenshot.png)

Backend Framework:
- **Laravel v10.40.0 (PHP v8.3.1):** https://laravel.com/docs/10.x/installation#docker-installation-using-sail
  with Breeze, Inertia, React, and PHP Unit testing scaffolding

Frontend Framework:
- **React v8.2.0:** https://react.dev/

Frontend installed packages:
- **Prop Types (typechecking):** https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
- **React Transition Group (defining entering and exiting transitions):** https://reactcommunity.org/react-transition-group/

Note:
- using client-side local storage to save todo data
- using react prop passing (basic state management)

## Installation

Clone the repo locally:

```sh
git clone https://github.com/wayjay4/todo_laravel_react_app.git todoapp
```

Go into todoapp dir:

```sh
cd todoapp
```

Install PHP dependencies (composer v2.6.6):

```sh
composer install
```

Install NPM dependencies (node v21.6.0, npm v10.3.0):

```sh
npm install
```

Build assets:

```sh
npm run build
```

Setup configuration:

```sh
cp .env.example .env
```

Generate application key:

```sh
php artisan key:generate
```

Create a MySql database. You can also use another database (SQLite, Postgres), simply update your configuration accordingly.

- open .env file and change db settings as needed
- make database as needed

Note: this step is not required for application to work, as we are not utilizing a database

![env_conf_mysql_setting_screenshot.png](public/images/env_conf_mysql_setting_screenshot.png)

![mysql_make_database_screenshot.png](public%2Fimages%2Fmysql_make_database_screenshot.png)

Run database migrations and seeder:

```sh
php artisan migrate
```

Run the dev server (the output will give the address):

```sh
php artisan serve
```

You're ready to go! Visit Todo App in your browser:
