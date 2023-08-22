const express = require('express');
const path = require('path');
const db = require('./config/connection');
var cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
require("dotenv").config();

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// setup apollo server and use typeDefs, resolvers, and auth for context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// integrate apollo server with express app as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


app.post("/admin/store/checkout", async (req, res) => {

  const userId = req.body.requestData.userId
  const item = req.body.requestData.item;

  const session = await stripe.checkout.sessions.create({
    line_items: [item],
    mode: 'payment',

    // success_url: `https://tinysquares.herokuapp.com/success?userId=${userId}`,
    // cancel_url: "https://tinysquares.herokuapp.com/cancel"
    success_url: `http://localhost:3000/success?userId=${userId}`,
    cancel_url: "http://localhost:3000/cancel"
  });

  res.json({
    url: session.url
  })
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});