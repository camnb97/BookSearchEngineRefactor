// Implement the Apollo Server and apply it to the Express server as middleware

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// mongoose.connect(
//   process.env.MONGODB_URI || 'mongodb://localhost:27017/bookSearchDB',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
// );

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/"));
});



// Call the async function to start the server
startApolloServer = async (typeDefs, resolvers) => {
  await server.start()
  server.applyMiddleware({ app });
  db.once("open", () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
}
startApolloServer(typeDefs, resolvers)