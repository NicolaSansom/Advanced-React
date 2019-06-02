const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

// decode the JWT to get user id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put user id onto the request for future requests to access
    req.userId = userId;
  }
  next();
});

// Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in.skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    {
      where: { id: req.userId },
    },
    '{id, permissions, email, name}'
  );
  req.user = user;
  next();
});

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
