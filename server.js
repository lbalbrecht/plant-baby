const express = require('express');
// const session = require('express-session');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const stripe = require("stripe")("sk_test_51IsMthAJVOAaFk842SSuVfJMKc4aodNbzrQ71oapQB8xO0X6TUs4wceH7ND2LcAEILcRd71SyARteLE35rs3Ub500056QbXxYD");


const PORT = process.env.PORT || 3001;

require("dotenv").config();

const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

// const sess = {
//     secret: process.env.SECRET,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 2
//     },
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// };

// app.use(session(sess))
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ limit:'50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors())


//LOCAL

//deployed
app.use(cors({origin:["https://plantbaby.herokuapp.com"]}));


app.use(routes);

const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});
