import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// SAMPLE DATA (temporary memory lang muna)
let products = [
  { id: 1, name: "Sample Product", stock: 10, shop: "Purple Heart" }
];

// GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ADD PRODUCT
app.post("/api/products", (req, res) => {
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    stock: req.body.stock,
    shop: req.body.shop
  };
  products.push(newProduct);
  res.json(newProduct);
});

// DELETE PRODUCT
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ message: "Deleted" });
});

// ROOT CHECK (para testing)
app.get("/", (req, res) => {
  res.send("API is running");
});

// START SERVER (IMPORTANT - Railway compatible)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on " + PORT));
