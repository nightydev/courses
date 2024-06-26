# API de Cursos

Este proyecto es una API para la gestión de cursos. Proporciona endpoints para crear, leer, actualizar y eliminar cursos de una base de datos.

## Características

- Obtener una lista de todos los cursos
- Agregar un nuevo curso
- Actualizar un curso existente
- Eliminar un curso

## Tecnologías

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Comenzando

### Requisitos Previos

- Node.js (v14 o posterior)
- Base de datos PostgreSQL

### Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/tuusuario/course-api.git
    cd course-api
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

3. Configura la base de datos:

    En el archivo `src/utils/db.ts` coloca las credenciales de tu base de datos:

    ```db.ts
      user:
      host:
      database:
      password:
      port:
    ```

    La base de datos debe estar estructurada de la siguiente forma:

    ```sql
        CREATE TABLE course (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            duration INT
        );

        CREATE TABLE student (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE
        );

        CREATE TABLE inscription (
            id SERIAL PRIMARY KEY,
            course_id INT REFERENCES course(id),
            student_id INT REFERENCES student(id),
            date DATE
        );

    ```

### Ejecutando el Proyecto

1. Inicia el servidor de desarrollo:

    ```sh
    npm run dev
    ```

2. Abre tu navegador y navega a `http://localhost:3000`