const Product = require("../models/Product");

exports.list = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch {
    res.status(400).json({ message: "Invalid product id" });
  }
};
