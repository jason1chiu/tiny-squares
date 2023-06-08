const router = require('express').Router();

app.post("/admin/store/checkout", async (req, res) => {

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
    success_url: "https://vast-refuge-16124.herokuapp.com/success",
    cancel_url: "https://vast-refuge-16124.herokuapp.com/cancel"
  });

  res.send(JSON.stringify({
    url: session.url
  }))
})

module.exports = router;