# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Install PostgresQL

PostgresQL: https://www.postgresql.org/

## Installing NPM modules

```
npm install
```
Or
```
npm install --legacy-peer-deps
```

## Running application locally

First of all you need to create a `.env` file
```
// .env
PORT=4000

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h

DB_USERNAME=postgres
DB_HOST=localhost // For local check it should be localhost!
DB_NAME=homelibrary
DB_PASSWORD=admin
DB_PORT=5432

DATABASE_URL="postgresql://${PG_DB_USERNAME}:${PG_DB_PASSWORD}@${PG_HOST}:${PG_DB_PORT}/${PG_DB_NAME}?schema=public"
```

Then you need to create a new PostgresQL database. Be shure that PostgresQL installed on your machine.

Execute this command to create a new database
```
npm run database:create
```
Then execute this command
```
npx prisma generate
```
And now you should use this command (be shure that in the `.env` file `DB_HOST=localhost`)
```
npm run database:init
```
If you want to generate some initial database values use this command
```
npm run database:seed
```
```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
