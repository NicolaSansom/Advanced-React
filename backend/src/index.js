// Start up are node server

// Get env variables
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO Use express middleware to handle cookies (JWT)
// TODO Use express middleware to populate the current user

server.start(
  {
    // cors only allows the frontend to access the prisma endpoint and stop others from using this
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  details => {
    console.log(`Server is now running on port http:/localhost${details.port}`);
  }
);
