const cookieParser = require('cookie-parser');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());
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
