#  Employee Management System

This is a simple **Employee Management System** built using ** JAVA Spring Boot** running on `http://localhost:8080` for the backend and a **frontend application** (like React) running on `http://localhost:5173`.

## Features

- Add new employees
- View all employees
- Update employee details
- Delete employees
- CORS configured to allow frontend communication


## Tech Stack

- **Backend**: Spring Boot (REST API)
- **Frontend**: React / Vite 
- **Data Store**: In-memory (using `HashMap<Long, User>`)

## API Endpoints

| Method | Endpoint        | Description           |
|--------|------------------|-----------------------|
| `GET`  | `/api/users`     | Get all users         |
| `POST` | `/api/users`     | Add a new user        |
| `PUT`  | `/api/users/{id}`| Update a user by ID   |
| `DELETE`| `/api/users/{id}`| Delete a user by ID  |


## Prerequisites
- Java 17+
- Maven
- Node.js (for frontend)

## Backend Setup (Spring Boot)
```
# Navigate into the backend folder
cd Backend

# Build and run the backend
mvn clean install
mvn spring-boot:run
```
## Frontend Setup (React)

```
# Navigate into the frontend directory
cd Frontend

# Install dependencies
npm install

# Run the frontend app
npm run dev
```

## Output:

![Screenshot from 2025-06-08 08-58-42](https://github.com/user-attachments/assets/09f56c29-bdcf-4015-a2a0-03f704a02dd1)
![Screenshot from 2025-06-08 09-12-06](https://github.com/user-attachments/assets/6c076e16-27b9-44b2-b455-9bfaf950e709)


The ID 2 is missing as it has been deleted. similarly we can update and delete through edit and delete button
