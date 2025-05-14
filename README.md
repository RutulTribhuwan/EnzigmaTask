# TaskBridge - Todo-List

This is a full-stack task management application built with **Spring Boot** for the backend and **Angular** for the frontend. The application allows users to add, update, delete, and view tasks in a simple UI.

The backend is developed using **Spring Boot**, exposing RESTful APIs and connecting to a **MySQL database** managed via **MySQL Workbench**. The frontend is created with **Angular**, which communicates with the backend using HTTP requests.

To run the application:
- Start the Spring Boot backend using STS.
- Run the Angular frontend using `ng serve`.
- Ensure MySQL is running and the database is correctly configured.

This project demonstrates a typical CRUD operation flow with API integration and component-based frontend architecture.


# TodoFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

