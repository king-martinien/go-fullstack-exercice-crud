const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/Product");

// Connexion à la base de donnée
mongoose
  .connect(
    "mongodb+srv://dev-martinien:Arserom1@cluster0.jg7vj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connexion successss!!");
  })
  .catch(() => console.log("connexion failed !!"));
// Configuration pour l'accès au corps de la requête avec req.body
app.use(express.json());

// C.O.R.S
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

/* Methode POST */
app.post("/api/products", (req, res, next) => {
  const product = new Product({ ...req.body });
  product
    .save()
    .then(() => res.status(201).json({ product: product }))
    .catch((error) => res.status(400).json({ error: error }));
});

/* Methode PUT */
app.put("/api/products/:id", (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(res.status(200).json({ message: "Modified !" }))
    .catch((error) => res.status(400).json({ error: error }));
});

/* Methode DELETE */
app.delete("/api/products/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(res.status(200).json({ message: "Deleted !" }))
    .catch((error) => res.status(400).json({ error: error }));
});

/*
    Methodes GET : '/api/products' et '/api/products/:id'
*/
app.get("/api/products", (req, res, next) => {
  Product.find()
    .then((products) => res.status(200).json({ products: products }))
    .catch((error) => res.status(400).json({ error: error }));
});
app.get("/api/products/:id", (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json({ product: product }))
    .catch((error) => res.status(400).json({ error: error }));
});

module.exports = app;
