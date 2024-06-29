// import { Router } from "react-router-dom";

// Router.post("/create-checkout-session", async (req, res) => {
//   const { products } = res.body;
//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: product.name,
//         images: [product.image],
//       },
//       unit_amount: product_price * 100,
//     },
//     quantity: product.quantity,
//   }));
//   const session = await Stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url: "",
//     cancel_url: "",
//   });
//   res.json({ id: session.id });
// });

// module.export = Router;

// const express = require("express");
// const router = express.Router();
// const Stripe = require("stripe")("your_stripe_secret_key"); // Replace with your Stripe secret key

// router.post("/create-checkout-session", async (req, res) => {
//   try {
//     const { products } = req.body;

//     const lineItems = products.map((product) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: product.name,
//           images: [product.image],
//         },
//         unit_amount: product.price * 100, // Assuming product.price is in dollars
//       },
//       quantity: product.quantity,
//     }));

//     const session = await Stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "https://yourdomain.com/success", // Replace with your success URL
//       cancel_url: "https://yourdomain.com/cancel",   // Replace with your cancel URL
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// module.exports = router;
