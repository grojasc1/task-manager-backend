const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/tasks', taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log('Documentations: http://localhost:5000/api-docs');

// Exportar la app para pruebas sin iniciar el servidor
module.exports = app;

// Conexión a MongoDB y servidor
if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('Error connecting to MongoDB', err));
}
