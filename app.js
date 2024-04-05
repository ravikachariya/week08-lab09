const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const paymentAPI = require("./controllers/paymentAPIController");
const paymentSSR = require("./controllers/paymentSSRController");

//Important: will be discussed next week
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride('_method'))

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// SSR
// Route to render index.html with payments using EJS
app.get("/", paymentSSR.renderPayments);
// Define a route to render the addpayment.ejs view
app.get("/addpayment", paymentSSR.renderForm);
// Route to add  payment using EJ
app.post("/addpayment", paymentSSR.addPayment);
// Define a route to render the singlepayment.ejs view
app.get("/single-payment/:id", paymentSSR.renderPayment);
// Define a route to delete singlepayment
app.delete("/single-payment/:id", paymentSSR.deletePayment);
// Define a route to update single payment.ejs
app.put("/single-payment/:id", paymentSSR.updatePayment);
// Define payment to update
app.get("/single-payment/update/:id", paymentSSR.renderUpdatePayment);

// API
// GET all Payments
app.get("/api/payments", paymentAPI.getPayments);
// POST a new Payment
app.post("/api/payments", paymentAPI.addPayment);
// GET a single Payment
app.get("/api/payments/:id", paymentAPI.getPayment);
// Update Payment using PUT
app.put("/api/payments/:id", paymentAPI.updatePayment);
// DELETE a Payment
app.delete("/api/payments/:id", paymentAPI.deletePayment);
// DELETE all Payment
app.delete("/api/payments", paymentAPI.deleteAllPayments);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});