# Desafio Anestech

## 1 - Getting Started

1.1 - Create two database schemas, one for dev and the second one for testing.

1.2 - Create a .env file following this template:
```
PORT=
DB_USERNAME=
DB_PASSWORD=
DATABASE=
DB_HOST=
SECRET=
DB_TEST_USERNAME=
DB_TEST_PASSWORD=
DATABASE_TEST=
DB_HOST_TEST=
```

### 1.3 - Installing
```
$ npm install
```

### 1.4 - Setting up the db

1.4.1 - Run this command to migrate into the testing db and seeding mock data.
```
$ npm run db:test
```

1.4.2 - Run this command to migrate into the dev db and seeding a admin user.
```
$ npm run db:dev
```

### 2 - Running
```
$ npm start
```
.
### 3 - Testing
```
$ npm test
```

### 4 - Routes
4.1 - Users routes:
* /signup [POST] - Signs up a user and returns a token.
* /user [POST] - Creates a agent user.
* /users [GET] - Returns all users.
* /user [PATCH] - Updates an specific user.
* /user/:user_id [DELETE] - Delete a specific user.

4.2 - Tasks routes:
* /task [POST] - Creates a task.
* /tasks [POST] - Gets all tasks, can be order by userId, createdAt and status. And can be filtered by description and status.
* /tasks [PATCH] - Updates the description of a task.
* /start-task/:task_id/:user_id [GET] - Starts a open task.
* /end-task/:task_id/:user_id [GET] - End a started task.

4.3 - Indicators routes:
* /indicator/finished/:start_date/:end_date [GET] - Gets the total num of finished tasks by user and total.
* /indicator/average/:start_date/:end_date [GET] - Gets all tasks by user and returns the avg of finished tasks.
* /indicator/average-time-open/:start_date/:end_date [GET] - Gets the average time a tasks takes between open and started.
* /indicator/average-time-open/:start_date/:end_date [GET] - /indicator/average-time-finished/:start_date/:end_date.


## Obs

The admin account seeded is: email: admin@admin.com.br, password: admin

