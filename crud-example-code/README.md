## Introduction
This repository contains example code that shows how you perform CRUD operations using Noode.js, Express.js and MongoDB in the backend and React in the frontend.

Below you can see the sequence diagrams that show how the frontend and backend communicate with each other to perform CRUD operations.

## HTTP GET Request

```mermaid
sequenceDiagram
    participant Browser
    participant Web Server
    participant Database Server

    Browser->>Web Server: 1. GET /api/resource
    Web Server->>Database Server: 2. Query for resource
    Database Server-->>Web Server: 3. Sending Resource data
    Web Server-->>Browser: 4. 200 OK (resource data)
```
1. The browser sends a GET request to the web server to retrieve a specific resource.  
2. The web server queries the database server to fetch the requested resource data.  
3. The database server responds to the web server with the requested resource data.  
4. The web server sends a 200 OK response along with the resource data back to the browser.  

## HTTP POST Request

```mermaid
sequenceDiagram
    participant Browser
    participant Web Server
    participant Database Server

    Browser->>Web Server: 1. POST /api/resource
    Web Server->>Database Server: 2. Insert resource into database
    Database Server-->>Web Server: 3. Resource inserted
    Web Server-->>Browser: 4. 201 Created (resource created)
```
1. The browser sends a POST request to the web server to create a new resource.
2. The web server inserts the resource into the database server.
3. The database server responds to the web server that the resource has been successfully inserted.
4. The web server sends a 201 Created response back to the browser indicating that the resource has been created.

## HTTP PUT Request

```mermaid 
sequenceDiagram
    participant Browser
    participant Web Server
    participant Database Server

    Browser->>Web Server: 1. PUT /api/resource/:id
    Web Server->>Database Server: 2. Update resource in database
    Database Server-->>Web Server: 3. Resource updated
    Web Server-->>Browser: 4. 200 OK (resource updated)
```
1. The browser sends a PUT request to the web server to update an existing resource.
2. The web server updates the resource in the database server.
3. The database server responds to the web server that the resource has been successfully updated.
4. The web server sends a 200 OK response back to the browser indicating that the resource has been updated.

## HTTP DELETE Request

```mermaid
sequenceDiagram
    participant Browser
    participant Web Server
    participant Database Server

    Browser->>Web Server: 1. DELETE /api/resource/:id
    Web Server->>Database Server: 2. Delete resource from database
    Database Server-->>Web Server: 3. Resource deleted
    Web Server-->>Browser: 4. 204 No Content (resource deleted)
```
1. The browser sends a DELETE request to the web server to delete an existing resource.
2. The web server deletes the resource from the database server.
3. The database server responds to the web server that the resource has been successfully deleted.
4. The web server sends a 204 No Content response back to the browser indicating that the resource has been deleted.

## How to run the example code
Before you run the example code, make sure you have the .env file in the backend directory.

1. Checkout to the branch crud-example-code and cd to the crud-example-code directory
```bash
git checkout crud-example-code
cd crud-example-code
```
2. Install the dependencies
```bash
cd backend
npm install
cd ..
cd frontend
npm install
```
3. Start the backend server
```bash
cd ../backend
npm run dev
```
4. Start the frontend server from a new terminal window and cd to the frontend directory
```bash
cd frontend
npm run dev
```
5. Open your browser and go to http://localhost:5173 to see the application running.
