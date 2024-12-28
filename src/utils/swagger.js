const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task API',
            version: '1.0.0',
            description: 'A simple Express API for managing tasks',
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? 'https://task-manager-backend-production-5cb8.up.railway.app'  // URL de producción
                    : 'http://localhost:5000',  // URL local para desarrollo
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
