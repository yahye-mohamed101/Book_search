import express from 'express';
import db from './config/connection.js';
import path from 'path';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { typeDefs, resolvers } from './schemas/index.js'
import { authenticateToken } from './services/auth.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
await db();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server, {
context: authenticateToken }));

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(),'client','dist')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(process.cwd(),'client','dist','index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`**API server running on port ${PORT}!**`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});