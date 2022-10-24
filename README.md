
# TODO-note-app

Basic MERN stack CRUD project which users can create, read, update and delete their saved notes.

*You can see the deployed version at the url below.*

https://todo-note-app-production.up.railway.app/


## Technologies
This project is created with:

### Frontend

* **React** as frontend framework
* **Material UI** as UI component framework
* **Formik** as form validation library
* **Axios** as API fetching library

### Backend

* **NodeJS** as backend programming language
* **Express** as backend framework
* **MongoDB** as database
* **Mongoose** as ODM
* **JWT** for authentication



## Run Locally

clone the project

```bash
git clone https://github.com/KyawZayarLinn007/conFusion.git
```

add the following environment variable to your ./client/.env file

```bash
REACT_APP_SERVER_URI="http://localhost:5000"
```

add the following environment variables to your ./server/.env file

```bash
MONGO_URI="mongodb://localhost:27017/yourdbname"
JWT_SECRET="YOUR_JWT_SECRET"
BCRYPT_SALT_ROUNDS=10
```

run the following scripts from the root directory

```bash
  npm run build
```

```bash
  npm run start
```






## API Reference

You need to be authenticated to get access all the note related endpoints.

#### User Register

```bash
  POST /register
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | user email |
| `password` | `string` | user password |
| `confirm_password` | `string` | user confirm password |


#### User Login

```bash
  POST /login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | user email |
| `password` | `string` | user password |


#### User Logout

```bash
  POST /logout
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `N/A` | `N/A` | N/A |


#### Get all notes 

```bash
  GET /notes/userId/:userId
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `N/A` | `N/A` | N/A |

#### Create a new note

```bash
  POST /notes/userId/:userId
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | note title |
| `body` | `string` | note description |

#### Update a note

```bash
  PUT /notes/userId/:userId/noteId/:noteId
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | note title |
| `body` | `string` | note description |

#### Delete a note

```bash
  DELETE /notes/userId/:userId/noteId/:noteId
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `N/A` | `N/A` | N/A |




## Author

- [@Kyaw Zayar Linn](https://www.github.com/KyawZayarLinn007)

