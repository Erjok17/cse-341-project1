const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts Api',
    description: 'Contacts API Documentation',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
  basePath: '/',
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [  // (Optional) Group endpoints by tags
    { name: 'Contacts', description: 'Contact-related endpoints' }
  ],
  securityDefinitions: {  // (Optional) Define auth methods
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT Token'
    }
  }
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/contacts.js'];  // Path to my route files

// Generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});