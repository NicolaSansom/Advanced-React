const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

// Create the GraphQl Yoga server

function createServer() {
  return new GraphQLServer({
    // the schema files cannot be empty
    typeDefs: 'src/schema.graphql',
    // for the server to run it requires a mutation & query within the schema file!
    resolvers: {
      Mutation,
      Query,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db }),
  });
}

module.exports = createServer;
