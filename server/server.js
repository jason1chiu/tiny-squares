const express = require('express');
const path = require('path');
const db = require('./config/connection');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51NDy0wCS0MFKcelVOYJzMX076RMDSxkjUo5fH8HXBdGJSGzFJLgPk2wuEwQ0XAkxLQuKg0o6zrxfpkLbziLQO1eE00I4cf7i1K')

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

app.post("/store/checkout", async (req, res) => {
  
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push(
      {
        price: item.id,
        quantity: item.quantity
      }
    )
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: "http://localhost:3000/store/success",
    cancel_url: "http://localhost:3000/store/cancel"
  });

  res.send(JSON.stringify({
    url: session.url
  }))
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