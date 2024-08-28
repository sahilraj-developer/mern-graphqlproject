const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const authMiddleware = require('./middleware/auth');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const cors = require('cors')

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(authMiddleware);
app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
