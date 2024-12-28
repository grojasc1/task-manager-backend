const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'API for managing tasks',
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));