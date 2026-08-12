# 🚀 MiniBlog API

API REST desarrollada con **Node.js, Express y PostgreSQL** para gestionar autores, publicaciones y comentarios.

El proyecto implementa una arquitectura por capas y cuenta con validaciones, manejo centralizado de errores, pruebas automatizadas y despliegue en **Railway**.

---

## 📌 Descripción

**MiniBlog API** es el backend de una aplicación de blog donde los usuarios pueden registrarse como autores, crear publicaciones y recibir comentarios de otros autores.

La información se almacena de forma persistente en una base de datos **PostgreSQL**.

### Funcionalidades principales

* 👤 Crear, consultar, actualizar y eliminar autores.
* 📝 Crear, consultar, actualizar y eliminar publicaciones.
* 💬 Crear y consultar comentarios asociados a publicaciones.
* 🔎 Consultar publicaciones pertenecientes a un autor.
* 🔗 Relacionar autores, publicaciones y comentarios mediante claves foráneas.
* ✅ Validar los datos recibidos en las peticiones.
* ⚠️ Gestionar errores mediante middleware centralizado.
* 🧪 Ejecutar pruebas automatizadas con Jest y Supertest.
* ☁️ Desplegar la aplicación junto con PostgreSQL en Railway.

---

## 🛠️ Tecnologías

| Tecnología     | Uso                                   |
| -------------- | ------------------------------------- |
| **Node.js**    | Entorno de ejecución                  |
| **Express**    | Framework para la API HTTP            |
| **PostgreSQL** | Base de datos relacional              |
| **pg**         | Cliente PostgreSQL para Node.js       |
| **Jest**       | Framework de testing                  |
| **Supertest**  | Pruebas de endpoints HTTP             |
| **Railway**    | Deployment y base de datos en la nube |
| **OpenAPI**    | Documentación de la API               |

---

## 📁 Arquitectura del proyecto

El proyecto utiliza una **arquitectura por capas**, separando las responsabilidades de configuración, rutas, controladores, servicios, middleware y acceso a datos.

```text
MiniBlog/
│
├── docs/
│   └── openapi.yaml
│
├── src/
│   ├── config/
│   │   ├── ConstConfig.js
│   │   ├── appError.js
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authors.controller.js
│   │   ├── comments.controller.js
│   │   └── posts.controller.js
│   │
│   ├── db/
│   │   ├── seed.sql
│   │   └── setup.sql
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── router/
│   │   ├── authors.router.js
│   │   ├── comments.router.js
│   │   └── posts.router.js
│   │
│   ├── services/
│   │   ├── authors.service.js
│   │   ├── comments.service.js
│   │   └── posts.service.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── authors.test.js
│   └── posts.test.js
│
├── .env.example
├── .gitignore
├── README.md
├── index.js
├── jest.config.js
├── package.json
└── package-lock.json
```

### Responsabilidad de cada capa

| Capa           | Responsabilidad                                                                          |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Router**     | Define los endpoints disponibles y dirige las peticiones al controlador correspondiente. |
| **Controller** | Gestiona la petición HTTP y construye la respuesta.                                      |
| **Service**    | Contiene la lógica de negocio y las operaciones relacionadas con los datos.              |
| **Database**   | Almacena y consulta la información mediante PostgreSQL.                                  |
| **Middleware** | Gestiona aspectos transversales, como el manejo centralizado de errores.                 |
| **Config**     | Contiene la configuración de la aplicación y la conexión a la base de datos.             |

---

## 🔄 Flujo de una petición

La aplicación sigue el siguiente flujo:

```text
Cliente
   │
   ▼
Router
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
PostgreSQL
   │
   ▼
Service
   │
   ▼
Controller
   │
   ▼
Respuesta HTTP
```

Esta separación permite mantener el código organizado, facilitar su mantenimiento y mantener responsabilidades claramente definidas.

---

# 📡 API Endpoints

## Health Check

| Método | Endpoint | Descripción                           |
| ------ | -------- | ------------------------------------- |
| `GET`  | `/`      | Confirma que el servidor está activo. |

---

## 👤 Authors

| Método   | Endpoint       | Descripción                 |
| -------- | -------------- | --------------------------- |
| `GET`    | `/authors`     | Lista todos los autores.    |
| `POST`   | `/authors`     | Crea un nuevo autor.        |
| `GET`    | `/authors/:id` | Obtiene un autor por su ID. |
| `PUT`    | `/authors/:id` | Actualiza un autor.         |
| `DELETE` | `/authors/:id` | Elimina un autor.           |

---

## 📝 Posts

| Método   | Endpoint                  | Descripción                                        |
| -------- | ------------------------- | -------------------------------------------------- |
| `GET`    | `/posts`                  | Lista todas las publicaciones.                     |
| `POST`   | `/posts`                  | Crea una nueva publicación.                        |
| `GET`    | `/posts/:id`              | Obtiene una publicación junto con sus comentarios. |
| `GET`    | `/posts/author/:authorId` | Lista las publicaciones de un autor.               |
| `PUT`    | `/posts/:id`              | Actualiza una publicación.                         |
| `DELETE` | `/posts/:id`              | Elimina una publicación.                           |

---

## 💬 Comments

| Método | Endpoint                  | Descripción                               |
| ------ | ------------------------- | ----------------------------------------- |
| `POST` | `/posts/:postId/comments` | Crea un comentario en una publicación.    |
| `GET`  | `/posts/:postId/comments` | Lista los comentarios de una publicación. |

---

# ✅ Validaciones

## Authors

| Campo   | Reglas                                             |
| ------- | -------------------------------------------------- |
| `name`  | Obligatorio y no puede estar vacío.                |
| `email` | Obligatorio, único y debe tener un formato válido. |

## Posts

| Campo       | Reglas                                                |
| ----------- | ----------------------------------------------------- |
| `title`     | Obligatorio y no puede estar vacío.                   |
| `content`   | Obligatorio y no puede estar vacío.                   |
| `author_id` | Obligatorio y debe corresponder a un autor existente. |
| `published` | Booleano. Opcional, con valor `false` por defecto.    |

## Comments

| Campo       | Reglas                                                       |
| ----------- | ------------------------------------------------------------ |
| `content`   | Obligatorio y no puede estar vacío.                          |
| `post_id`   | Obligatorio y debe corresponder a una publicación existente. |
| `author_id` | Obligatorio y debe corresponder a un autor existente.        |

---

# 💻 Instalación y ejecución local

## 1. Clonar el proyecto

Puedes clonar el repositorio utilizando Git:

```bash
git clone https://github.com/moyanoerik1991-hue/ProyectoM2_MoyanoErik.git
cd ProyectoM2_MoyanoErik
```

También puedes descargar el proyecto desde GitHub utilizando el botón **Code → Download ZIP**.

---

## 2. Requisitos previos

Antes de ejecutar el proyecto debes tener instalado:

* [Node.js](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/)

Puedes comprobar las instalaciones con:

```bash
node --version
npm --version
psql --version
```

---

## 3. Crear la base de datos

Accede a PostgreSQL utilizando `psql` con una cuenta con permisos administrativos.

Crea la base de datos:

```sql
CREATE DATABASE nombre_proyecto;
```

Conéctate a la base de datos:

```sql
\c nombre_proyecto
```

Crea un usuario específico para la aplicación:

```sql
CREATE USER nombre_proyecto_user
WITH PASSWORD 'contraseña_fuerte';
```

Otorga los permisos necesarios:

```sql
GRANT ALL PRIVILEGES
ON DATABASE nombre_proyecto
TO nombre_proyecto_user;
```

Si las tablas ya fueron creadas, asigna permisos sobre ellas:

```sql
GRANT ALL PRIVILEGES
ON ALL TABLES IN SCHEMA public
TO nombre_proyecto_user;

GRANT ALL PRIVILEGES
ON ALL SEQUENCES IN SCHEMA public
TO nombre_proyecto_user;
```

Para que las futuras tablas y secuencias también reciban los permisos:

```sql
ALTER DEFAULT PRIVILEGES
IN SCHEMA public
GRANT ALL ON TABLES
TO nombre_proyecto_user;

ALTER DEFAULT PRIVILEGES
IN SCHEMA public
GRANT ALL ON SEQUENCES
TO nombre_proyecto_user;
```

> **⚠️ Importante:** no utilices una cuenta de PostgreSQL con privilegios de superusuario para ejecutar la aplicación durante el desarrollo.

---

## 4. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto.

Puedes utilizar `.env.example` como plantilla:
```env
DB_HOST=host_url
DB_PORT=a_number
DB_NAME=db_name
DB_USER=db_user
DB_PASSWORD=a_password
PORT=a_number
DB_MAX=a_number
DB_IDLETIMEOUTMILLIS=a_number
DB_CONNECTIONTIMEOUTMILLIS=a_number
```
Luego configura los valores correspondientes a tu instalación local.

> **🔐 Seguridad:** el archivo `.env` está incluido en `.gitignore` para evitar subir credenciales y datos sensibles al repositorio.

---

## 5. Instalar dependencias

Desde la raíz del proyecto ejecuta:

```bash
npm install
```

---

## 6. Iniciar la aplicación

### Producción

```bash
npm start
```

### Desarrollo

```bash
npm run dev
```

Al iniciar la aplicación se ejecutará la configuración de la base de datos y se cargarán los datos de ejemplo definidos en el proyecto.

---

# 🧪 Testing

El proyecto utiliza **Jest** y **Supertest** para realizar pruebas automatizadas sobre los endpoints de la API.

Para ejecutar las pruebas:

```bash
npm test
```

La carpeta de pruebas contiene actualmente:

```text
tests/
├── authors.test.js
└── posts.test.js
```

---

# 📖 Documentación OpenAPI

La especificación de la API se encuentra disponible en:

```text
docs/openapi.yaml
```

Este archivo contiene la definición de los endpoints, parámetros, respuestas y estructuras utilizadas por la API.

---

# ☁️ Deployment en Railway

## URL del Deploy de mi Proyecto.

Public Url: https://proyectom2moyanoerik-production.up.railway.app/api-docs/

## La aplicación puede desplegarse en **Railway** junto con una instancia de PostgreSQL.

### 1. Crear el proyecto

Accede a Railway y crea un nuevo proyecto.

### 2. Agregar PostgreSQL

Dentro del proyecto:

```text
+ New Service
      ↓
Database
      ↓
PostgreSQL
```

Railway creará automáticamente una instancia de PostgreSQL.

### 3. Conectar el repositorio

Sube el proyecto a GitHub y, desde Railway, selecciona:

```text
Deploy from GitHub
```

Selecciona el repositorio correspondiente.

### 4. Configurar variables de entorno

En el servicio correspondiente a la aplicación configura las variables necesarias.

Por ejemplo:

```env
DATABASE_URL=...
NODE_ENV=production
```

La variable `DATABASE_URL` debe contener la cadena de conexión proporcionada por PostgreSQL en Railway.

> **⚠️ Importante:** las credenciales y variables privadas deben configurarse mediante las variables de entorno de Railway y nunca almacenarse directamente en el repositorio.

### 5. Generar el dominio

Desde el servicio de la aplicación:

```text
Settings
   ↓
Networking
   ↓
Generate Domain
```

Railway generará una URL pública para acceder a la API.

### 6. Deployment

Railway ejecutará automáticamente el comando definido para iniciar la aplicación:

```bash
npm start
```

Una vez completado el deployment, la aplicación estará disponible mediante el dominio generado.

Las tablas y los datos iniciales se crearán automáticamente según la configuración incluida en el proyecto.

---

# 📂 Scripts disponibles

Los principales comandos disponibles son:

| Comando       | Descripción                              |
| ------------- | ---------------------------------------- |
| `npm install` | Instala las dependencias del proyecto.   |
| `npm start`   | Inicia la aplicación.                    |
| `npm run dev` | Inicia la aplicación en modo desarrollo. |
| `npm test`    | Ejecuta las pruebas automatizadas.       |

---

## Aportes de la IA en el desarrollo de mi proyecto

Aunque gran parte del proyecto fue desarrollado por mí, el uso de herramientas de Inteligencia Artificial (IA) representó un apoyo importante para afrontar el desafío de una manera más profesional y, al mismo tiempo, fortalecer mis conocimientos como programador junior.

Las herramientas de IA fueron utilizadas principalmente como asistentes para **comprender conceptos, analizar errores, revisar código y encontrar soluciones**, procurando siempre comprender el funcionamiento de las soluciones implementadas.

| IA utilizada                 | Mis observaciones                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **ChatGPT**                  | Lo utilicé principalmente para plantear y organizar el proyecto desde una perspectiva profesional, teniendo en cuenta mi nivel como programador junior. También recurrí a esta herramienta para analizar y solucionar errores que fueron apareciendo durante el desarrollo, tanto en la terminal, como en **psql** y **Railway**.                                                                                                     |
| **Claude**                   | Lo utilicé para profundizar en la comprensión de los códigos y conceptos obtenidos a partir de las lecturas y recursos de estudio. Mi objetivo fue entender para qué servía cada parte del código y cómo funcionaba. Si bien también me ayudó a comprender y construir algunas soluciones, en la mayoría de los casos le solicité que revisara y corrigiera posibles errores en código que previamente había escrito. |
| **GitHub Copilot (VS Code)** | Lo utilicé como apoyo durante la programación para detectar y solucionar problemas más específicos relacionados con la interacción entre los diferentes archivos del proyecto. Fue especialmente útil para identificar errores de integración y realizar ajustes puntuales en el código.                                                                                                                              |

### Consideración final

El uso de estas herramientas no tuvo como objetivo reemplazar el proceso de desarrollo, sino utilizar la IA como un **recurso de apoyo y aprendizaje**. En cada caso, procuré comprender las soluciones propuestas, adaptarlas a las necesidades del proyecto y mantener el control sobre el código desarrollado.


Link con imagenes: https://docs.google.com/document/d/1yCs778kCRazO7fjl3jDKl2KmEXU8aBBT/edit?usp=drive_link&ouid=100773324323073949176&rtpof=true&sd=true

