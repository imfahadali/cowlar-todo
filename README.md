# Cowlar Todo App

A Todo app is a simple yet powerful application that helps individuals or teams manage their tasks and stay organized. It provides a user-friendly interface where maintain their todos log to help them remind what todo.

## Features

My Todo App offers the following key features:

1. **Create Todo:** Easily create new todos to organize and manage your todos.

2. **Delete Todo:** Delete the existing todo.

3. **Complete Todo:** Complete the Todo Task

4. **Edit Todo:** Edit the name of the todo.

5. **Get Todos based on timeFrame:** Get Todos based on the timeframe of day, week, month.

## Getting Started

To get started with the Todo app, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/imfahadali/cowlar-todo.git

   ```

2. Create env file in client directory:

```bash
   cd ./cowlar-todo/client
   touch .env
```

3. Create .env and add all the necessary configuration options, look at env.example (client directory):

4. Create env file in server directory:

```bash
   cd ../server
   touch .env
```

5. Create .env and add all the necessary configuration options, look at env.example (server directory):

6. Download Docker, refer this link https://www.docker.com/products/docker-desktop/

7. Run Docker Engine by running Docker Desktop App

8. Build Docker Container: Be In the root directory where docker-compose.yaml file exists and run

```bash
   docker-compose build
   docker-compose up
```

9. Wait for the both the container to be build and connect, look at the terminal if it says MongoDB is connected you are good to go.

10. To run test the docker-compose up should be running the services go to new terminal in root directory of app where docker-compose.yaml file exists do the following command

```bash
   docker-compose exec client npm run test
```
