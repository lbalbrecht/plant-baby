const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const stripe = require("stripe")(
  "sk_test_51Iw9APBx39ZYuLbOsfOV0H2o3DQCMXae8hxk3DxpLeHGlCpjLINt5t5Pkd6TfaCA3G6OeUrSSJ5tqGAnzlV8pgZ400P6PWFuef"
);

router.post("/api/payment", async (req, res) => {
  const { item, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);

  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          reciept_email: token.email,
          description: product.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
