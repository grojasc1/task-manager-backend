# Task Manager Backend

Este proyecto es el backend de una aplicación de gestión de tareas. Proporciona una API RESTful para crear, leer, actualizar y eliminar tareas. El proyecto utiliza Node.js, Express, y MongoDB.

## Características
- Crear tareas con un título, descripción opcional y estado de completado.
- Listar todas las tareas.
- Actualizar tareas existentes.
- Eliminar tareas.
- Documentación interactiva con Swagger.

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (generalmente incluido con Node.js)
- [MongoDB](https://www.mongodb.com/) (instalado localmente o acceso a una base de datos en la nube)

---

## Enlace al backend

[Despliegue en Railway](https://task-manager-backend-production-5cb8.up.railway.app/api/tasks)

---

## Pasos para instalar y ejecutar el proyecto localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/grojasc1/task-manager-backend.git
   cd task-manager-backend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega las siguientes variables de entorno:
     ```env
     PORT=5000
     MONGO_URI=<TU_CADENA_DE_CONEXION_MONGO>
     ```
     **Notas:**
     - Reemplaza `<TU_CADENA_DE_CONEXION_MONGO>` con la cadena de conexión de tu base de datos MongoDB.
     - Si usas MongoDB Atlas, la cadena debería tener el formato: `mongodb+srv://<usuario>:<password>@<cluster-url>/task-manager?retryWrites=true&w=majority`.

4. **Iniciar el servidor:**
   ```bash
   npm start
   ```
   Esto iniciará el servidor en el puerto configurado (por defecto, `5000`).

5. **Probar la API:**
   - Puedes usar herramientas como [Postman](https://www.postman.com/) o [cURL](https://curl.se/) para realizar solicitudes a los endpoints.
   - La documentación interactiva está disponible en: [http://localhost:5000/api-docs](http://localhost:5000/api-docs).

---

## Scripts disponibles

- **Iniciar el servidor en modo desarrollo:**
  ```bash
  npm run dev
  ```
  Usa [Nodemon](https://nodemon.io/) para reiniciar automáticamente el servidor al detectar cambios.

- **Ejecutar pruebas:**
  ```bash
  npm test
  ```

---

## Estructura del proyecto
```
|-- src/
|   |-- controllers/
|   |   |-- taskController.js
|   |-- models/
|   |   |-- task.js
|   |-- routes/
|   |   |-- taskRoutes.js
|   |-- utils/
|   |   |-- swagger.js
|   |-- app.js
|-- tests/
|   |-- taskRoutes.test.js
|-- .env
|-- README.md
|-- package.json
|-- package-lock.json
```

---

## API Endpoints

### Base URL
`http://localhost:5000/api/tasks`

### Endpoints principales

| Método | Endpoint       | Descripción                     |
|--------|----------------|---------------------------------|
| GET    | `/`            | Obtiene todas las tareas        |
| POST   | `/`            | Crea una nueva tarea            |
| GET    | `/:id`         | Obtiene una tarea por su ID     |
| PUT    | `/:id`         | Actualiza una tarea existente   |
| DELETE | `/:id`         | Elimina una tarea por su ID     |

---

## Configuración adicional

### Variables de entorno

Asegúrate de configurar las siguientes variables de entorno en tu archivo `.env`:

| Variable   | Descripción                                              |
|------------|----------------------------------------------------------|
| `PORT`     | Puerto donde se ejecutará el servidor                    |
| `MONGO_URI`| URI de conexión a la base de datos MongoDB               |


---

## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest (para pruebas)
- Swagger (para documentación interactiva)


---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

