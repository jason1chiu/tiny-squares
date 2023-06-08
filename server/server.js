const express = require('express');
const path = require('path');
const db = require('./config/connection');
const cors = require('cors');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const { User } = require('./models');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

// Add JWT-based user extraction middleware
app.use((req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      // Invalid token, you may want to do additional logging or cleanup here
    }
  }
  next();
});

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.raw({type: 'application/json'}));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.post("/admin/store/checkout", async (req, res) => {
  const items = req.body.cart;
  let lineItems = [];
  let customer;

  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity
    })
  });
  
// no information about the user is being sent to the stripe
  if (!req.user.stripeCustomerId) {
    customer = await stripe.customers.create(); // create a new customer
    await User.findByIdAndUpdate(req.user._id, { stripeCustomerId: customer.id });
  } else {
    customer = await stripe.customers.retrieve(req.user.stripeCustomerId);
  }

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items: lineItems,
    mode: 'payment',
    // *** When deploying to heroku, change url to https://your-app-name.herokuapp.com/success
    success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/cancel"
  });

  res.send(JSON.stringify({
    url: session.url
  }));
});

app.post("/webhook", async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], 'whsec_0db255f79238fe5682986798cce1cfc3f7ceef2998f96797a6ac1e68a6a673ca');
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Here, you could check the session to see which items were purchased and then update your database accordingly. For example:
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    lineItems.data.forEach(async (item) => {
      if (item.price.id === 'price_1NGBiXCS0MFKcelVavX5doc2') {
        const user = await User.findOne({stripeCustomerId: session.customer});
        await User.findByIdAndUpdate(user._id, { hasUnlimitedPackage: true });
      }
    });
  }

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});