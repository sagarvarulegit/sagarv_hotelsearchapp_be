const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hotel Search API',
      version: '1.0.0',
      description: 'API for searching hotels in different destinations',
      contact: {
        name: 'API Support',
        url: 'https://example.com/support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Destinations',
        description: 'Operations related to travel destinations',
      },
      {
        name: 'Hotels',
        description: 'Operations related to hotel search',
      },
    ],
  },
  apis: ['./api/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
