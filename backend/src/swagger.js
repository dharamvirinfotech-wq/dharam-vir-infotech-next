const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DVIT API',
      version: '1.0.0',
      description:
        'REST API for authentication (register/login/forgot-password/reset-password) and contact form submissions. Built with Express, MariaDB/MySQL, and JWT.',
    },
    servers: [
      { url: 'http://localhost:4000/api', description: 'Local' },
      { url: '/api', description: 'Same origin' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        AuthUser: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            full_name: { type: 'string', example: 'Jane Doe' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string', nullable: true },
            role: { type: 'string', example: 'user' },
            company_name: { type: 'string', nullable: true },
            status: { type: 'string', example: 'active' },
            two_factor_enabled: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'JWT bearer token' },
            user: { $ref: '#/components/schemas/AuthUser' },
          },
        },
        ContactInquiry: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string', nullable: true },
            subject: { type: 'string', nullable: true },
            service: { type: 'string', nullable: true },
            message: { type: 'string' },
            status: { type: 'string', enum: ['new', 'replied', 'closed'] },
            admin_notes: { type: 'string', nullable: true },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: { message: { type: 'string' } },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
