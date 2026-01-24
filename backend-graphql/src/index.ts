import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import "dotenv/config";
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

interface ListenConfig {
  port: any,
  host: string
}

const listenConfig: ListenConfig = {
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
};

const { url } = await startStandaloneServer(server, {
  listen: listenConfig,
});

console.log(`Server ready at: ${url}`);