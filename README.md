install typings (typings are local) - node_modules/.bin/typings

build client code - npm run frontend

start server - npm run server

install node-typings - 'node_modules/.bin/typings install dt~node --global --save'

# Api methods


# Registration
http://localhost:3333/api/registration/

body - username, password, type (0 or 1)

headers - Content-Type = application/x-www-form-urlencoded


# Login
http://127.0.0.1:3333/login

body - username, password

headers - Content-Type = application/x-www-form-urlencoded


# Logout
http://127.0.0.1:3333/logout

empty


# Get all users
http://127.0.0.1:3333/api/user

(auth)

> "id": 25,

> "username": name,


# Edit user data
http://127.0.0.1:3333/api/user

(auth)

> "id": number (required),

> "phone": string,

> "firstname": string
