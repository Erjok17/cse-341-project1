const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API Documentation',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
  basePath: '/',
  tags: [
    { 
      name: 'Hello World',  // New tag for root endpoint
      description: 'Welcome message' 
    },
    { 
      name: 'Contacts', 
      description: 'Contact-related endpoints' 
    }
  ],
  paths: {  // Manually add the root endpoint
    '/': {
      get: {
        tags: ['Hello World'],
        summary: 'Root endpoint',
        responses: {
          200: {
            description: 'Returns Hello World message',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                  example: 'Hello World! - The Contacts API is running'
                }
              }
            }
          }
        }
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/contacts.js'];  // Keep only contacts.js

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});